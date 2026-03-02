import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import {
    collection, doc, onSnapshot, runTransaction, getDoc, setDoc, query, orderBy, limit
} from 'firebase/firestore';
import { NOMINATIONS, VOTES_PER_PERSON, EMPLOYEES } from '../lib/constants';

export function useVotes(nominationId, currentUser) {
    const [voteCounts, setVoteCounts] = useState({});       // { employeeId: number }
    const [myVotes, setMyVotes] = useState({});             // { employeeId: number } this nomination
    const [totalVoters, setTotalVoters] = useState(0);
    const [voterList, setVoterList] = useState([]);         // [{ name, timestamp }]
    const [completedVoters, setCompletedVoters] = useState([]); // who used all 3 votes
    const [fullyBackedEmployees, setFullyBackedEmployees] = useState([]); // employees who got all 3 votes from one person
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!nominationId) return;

        // Listen to public vote counts
        const countsRef = doc(db, 'nominations', nominationId, 'public', 'counts');
        const unsubCounts = onSnapshot(countsRef, (snap) => {
            setVoteCounts(snap.exists() ? snap.data() : {});
            setLoading(false);
        });

        // Listen to voter list (anonymized - names only)
        const voterListRef = doc(db, 'nominations', nominationId, 'public', 'voterList');
        const unsubVoters = onSnapshot(voterListRef, (snap) => {
            if (snap.exists()) {
                const data = snap.data();
                const voters = data.voters || [];
                setVoterList(voters);
                const uniqueVoters = new Set(voters.map(v => v.name)).size;
                setTotalVoters(uniqueVoters);
                setCompletedVoters(data.completedVoters || []);
                setFullyBackedEmployees(data.fullyBackedEmployees || []);
            } else {
                setVoterList([]);
                setTotalVoters(0);
                setCompletedVoters([]);
                setFullyBackedEmployees([]);
            }
        });

        return () => {
            unsubCounts();
            unsubVoters();
        };
    }, [nominationId]);

    // Load current user's votes for this nomination
    useEffect(() => {
        if (!nominationId || !currentUser?.email) return;
        const myVoteRef = doc(db, 'nominations', nominationId, 'myVotes', currentUser.email.replace(/[@.]/g, '_'));
        const unsub = onSnapshot(myVoteRef, (snap) => {
            setMyVotes(snap.exists() ? (snap.data().votes || {}) : {});
        });
        return () => unsub();
    }, [nominationId, currentUser?.email]);

    const getMyVoteCountForEmployee = (employeeId) => myVotes[employeeId] || 0;
    const getTotalMyVotes = () => Object.values(myVotes).reduce((a, b) => a + b, 0);
    const getRemainingVotes = () => VOTES_PER_PERSON - getTotalMyVotes();
    const canVote = (employeeId) => {
        if (getRemainingVotes() <= 0) return false;
        return true;
    };

    const castVote = async (employeeId, voterName) => {
        if (!canVote(employeeId)) return { success: false, error: 'Санал өгөх боломжгүй' };

        const safeEmail = currentUser.email.replace(/[@.]/g, '_');
        const myVoteRef = doc(db, 'nominations', nominationId, 'myVotes', safeEmail);
        const countsRef = doc(db, 'nominations', nominationId, 'public', 'counts');
        const voterListRef = doc(db, 'nominations', nominationId, 'public', 'voterList');
        const logRef = doc(collection(db, 'nominations', nominationId, 'voteLog'));

        try {
            await runTransaction(db, async (tx) => {
                const myVoteSnap = await tx.get(myVoteRef);
                const currentMyVotes = myVoteSnap.exists() ? (myVoteSnap.data().votes || {}) : {};
                const totalUsed = Object.values(currentMyVotes).reduce((a, b) => a + b, 0);

                if (totalUsed >= VOTES_PER_PERSON) throw new Error('Санал дуусгавар боллоо');

                const newMyVotes = { ...currentMyVotes, [employeeId]: (currentMyVotes[employeeId] || 0) + 1 };
                tx.set(myVoteRef, { votes: newMyVotes, email: currentUser.email });

                const countsSnap = await tx.get(countsRef);
                const currentCounts = countsSnap.exists() ? countsSnap.data() : {};
                tx.set(countsRef, { ...currentCounts, [employeeId]: (currentCounts[employeeId] || 0) + 1 });

                const voterSnap = await tx.get(voterListRef);
                const existingVoters = voterSnap.exists() ? (voterSnap.data().voters || []) : [];
                const existingCompleted = voterSnap.exists() ? (voterSnap.data().completedVoters || []) : [];
                const existingFullyBacked = voterSnap.exists() ? (voterSnap.data().fullyBackedEmployees || []) : [];

                const alreadyInList = existingVoters.some(v => v.email === currentUser.email);
                const updatedVoters = alreadyInList ? existingVoters : [
                    ...existingVoters,
                    { name: voterName, email: currentUser.email, timestamp: new Date().toISOString() }
                ];

                // Check if this vote completes all 3
                const newTotal = totalUsed + 1;
                const alreadyCompleted = existingCompleted.some(v => v.email === currentUser.email);
                const updatedCompleted = (!alreadyCompleted && newTotal >= VOTES_PER_PERSON)
                    ? [...existingCompleted, { name: voterName, email: currentUser.email, timestamp: new Date().toISOString() }]
                    : existingCompleted;

                // Check if all 3 votes went to ONE single employee
                let updatedFullyBacked = existingFullyBacked;
                if (newTotal >= VOTES_PER_PERSON) {
                    const empEntries = Object.entries(newMyVotes);
                    const singleRecipient = empEntries.length === 1 && empEntries[0][1] >= VOTES_PER_PERSON;
                    if (singleRecipient) {
                        const recipientId = empEntries[0][0];
                        const recipientEmp = EMPLOYEES.find(e => e.id === recipientId);
                        const alreadyInBacked = existingFullyBacked.some(e => e.employeeId === recipientId);
                        if (!alreadyInBacked && recipientEmp) {
                            updatedFullyBacked = [
                                ...existingFullyBacked,
                                {
                                    employeeId: recipientId,
                                    employeeName: recipientEmp.name,
                                    voterName,
                                    timestamp: new Date().toISOString(),
                                }
                            ];
                        }
                    }
                }

                tx.set(voterListRef, {
                    voters: updatedVoters,
                    completedVoters: updatedCompleted,
                    fullyBackedEmployees: updatedFullyBacked,
                });

                // Write to secret log
                tx.set(logRef, {
                    voterId: currentUser.email,
                    voterName,
                    employeeId,
                    nominationId,
                    timestamp: new Date().toISOString(),
                });
            });
            return { success: true };
        } catch (err) {
            return { success: false, error: err.message };
        }
    };

    return {
        voteCounts,
        myVotes,
        loading,
        totalVoters,
        voterList,
        completedVoters,
        fullyBackedEmployees,
        getRemainingVotes,
        canVote,
        castVote,
        getMyVoteCountForEmployee,
    };
}
