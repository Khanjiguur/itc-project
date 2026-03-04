import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import { NOMINATIONS, EMPLOYEES, ACTIVE_NOMINATION_INDEX } from '../lib/constants';
import { useAuth } from '../context/AuthContext';
import { useVotes } from '../hooks/useVotes';
import EmployeeCard from '../components/EmployeeCard';
import Sidebar from '../components/Sidebar';
import { db } from '../lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';

export default function VotingPage() {
    const { user, logout } = useAuth();
    const nomination = NOMINATIONS[ACTIVE_NOMINATION_INDEX];
    const theme = nomination.theme;

    const {
        voteCounts,
        loading,
        totalVoters,
        voterList,
        fullyBackedEmployees,
        getRemainingVotes,
        canVote,
        castVote,
        getMyVoteCountForEmployee,
    } = useVotes(nomination.id, user);

    // All previous nominations' winners
    const [prevWinners, setPrevWinners] = useState([]);

    useEffect(() => {
        if (ACTIVE_NOMINATION_INDEX < 1) return;

        const unsubs = [];
        // Initialize slots
        setPrevWinners(Array(ACTIVE_NOMINATION_INDEX).fill(null));

        for (let idx = 0; idx < ACTIVE_NOMINATION_INDEX; idx++) {
            const prevNom = NOMINATIONS[idx];
            const countsRef = doc(db, 'nominations', prevNom.id, 'public', 'counts');
            const unsub = onSnapshot(countsRef, (snap) => {
                if (!snap.exists()) return;
                const counts = snap.data();
                let maxVotes = 0;
                let winnerId = null;
                for (const [empId, cnt] of Object.entries(counts)) {
                    if (cnt > maxVotes) { maxVotes = cnt; winnerId = empId; }
                }
                if (winnerId) {
                    const emp = EMPLOYEES.find(e => e.id === winnerId);
                    if (emp) {
                        setPrevWinners(prev => {
                            const next = [...prev];
                            next[idx] = { employee: emp, votes: maxVotes, nomination: prevNom };
                            return next;
                        });
                    }
                }
            });
            unsubs.push(unsub);
        }
        return () => unsubs.forEach(u => u());
    }, []);

    const handleVote = async (employee) => {
        const remaining = getRemainingVotes();
        if (remaining <= 0) {
            toast.error('Санал дуусгавар боллоо!', {
                icon: '🚫',
                style: { background: '#fff', color: '#1e293b', border: '1.5px solid #fda4af' }
            });
            return;
        }
        const result = await castVote(employee.id, user.name);
        if (result.success) {
            toast.success(`${employee.name}-д санал өглөө!`, {
                style: {
                    background: '#fff',
                    color: theme.accent,
                    border: `1.5px solid ${theme.cardBorder}`,
                    fontWeight: '700',
                },
                icon: '⭐',
                duration: 2000,
            });
        } else {
            toast.error(result.error || 'Алдаа гарлаа', {
                icon: '⚠️',
                style: { background: '#fff', color: '#1e293b' }
            });
        }
    };

    // Sort employees by vote count descending (for ranks/medals only)
    const sortedEmployees = [...EMPLOYEES].sort((a, b) =>
        (voteCounts[b.id] || 0) - (voteCounts[a.id] || 0)
    );

    // Build rank map: employeeId → rank (1-based)
    const rankMap = {};
    sortedEmployees.forEach((emp, i) => { rankMap[emp.id] = i + 1; });

    // Medal shows only when strictly ahead of next rank
    // e.g. rank1 medal shows only if emp[0].votes > emp[1].votes
    const showMedalSet = new Set();
    [0, 1, 2].forEach(i => {
        const curr = voteCounts[sortedEmployees[i]?.id] || 0;
        const next = voteCounts[sortedEmployees[i + 1]?.id] || 0;
        if (curr > 0 && curr > next) showMedalSet.add(sortedEmployees[i]?.id);
    });

    // Randomize base display order of employees (stable during a session/mount)
    const baseShuffledEmployees = useMemo(() => {
        const arr = [...EMPLOYEES];
        // Fisher–Yates shuffle
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }, [nomination.id]);

    // Pin medalists from the current top 3 to the front (in rank order),
    // while keeping the rest in the stable random order
    const pinnedTop = sortedEmployees
        .slice(0, 3)
        .filter(emp => showMedalSet.has(emp.id));
    const pinnedIds = new Set(pinnedTop.map(e => e.id));
    const displayEmployees = useMemo(() => {
        return [
            ...pinnedTop,
            ...baseShuffledEmployees.filter(e => !pinnedIds.has(e.id)),
        ];
    }, [pinnedTop, baseShuffledEmployees]);

    // Employees who received all 3 votes from a single person
    const fullyBackedSet = new Set((fullyBackedEmployees || []).map(e => e.employeeId));

    const remaining = getRemainingVotes();

    return (
        <motion.div
            className="voting-page"
            style={{ background: theme.bg }}
            animate={{ background: theme.bg }}
            transition={{ duration: 0.6 }}
        >
            <Toaster position="top-center" />

            {/* Ambient glow */}
            <div
                className="ambient-glow"
                style={{ background: `radial-gradient(ellipse at 50% 0%, ${theme.glow} 0%, transparent 70%)` }}
            />

            {/* Header */}
            <motion.header
                className="voting-header"
                style={{ background: theme.headerBg }}
                initial={{ y: -60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="header-left">
                    <motion.div
                        className="header-trophy"
                        animate={{ rotate: [-5, 5, -5] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                    >
                        🏆
                    </motion.div>
                    <div>
                        <h1 className="header-title">ITC AWARDS 2026</h1>
                        <p className="header-sub">Хамгийн шилдэгүүдийг сонгоцгооё!</p>
                    </div>
                </div>
                <button className="logout-btn" onClick={logout}>
                    Гарах ↩
                </button>
            </motion.header>

            {/* Previous Nominations' Winners */}
            <AnimatePresence>
                {prevWinners.filter(Boolean).length > 0 && (
                    <div className="prev-winners-row">
                        {prevWinners.map((winner, idx) => winner && (
                            <motion.div
                                key={winner.nomination.id}
                                className="prev-winner-section"
                                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ delay: 0.25 + idx * 0.08, type: 'spring', stiffness: 280, damping: 22 }}
                            >
                                {/* Glow bg */}
                                <div
                                    className="prev-winner-glow"
                                    style={{ background: `radial-gradient(ellipse at 50% 0%, ${winner.nomination.theme.glow} 0%, transparent 80%)` }}
                                />

                                <div className="prev-winner-label">
                                    <motion.span
                                        className="prev-winner-crown"
                                        animate={{ rotate: [-8, 8, -8], scale: [1, 1.12, 1] }}
                                        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                                    >
                                        🏆
                                    </motion.span>
                                    <span className="prev-winner-title-text">
                                        «{winner.nomination.name}»
                                    </span>
                                    <motion.span
                                        className="prev-winner-crown"
                                        animate={{ rotate: [8, -8, 8], scale: [1, 1.12, 1] }}
                                        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                                    >
                                        🏆
                                    </motion.span>
                                </div>

                                <motion.div
                                    className="prev-winner-card"
                                    style={{
                                        borderColor: winner.nomination.theme.primary,
                                        boxShadow: `0 0 40px ${winner.nomination.theme.glow}, 0 8px 32px rgba(0,0,0,0.08)`,
                                    }}
                                    animate={{
                                        boxShadow: [
                                            `0 0 20px ${winner.nomination.theme.glow}, 0 8px 32px rgba(0,0,0,0.08)`,
                                            `0 0 50px ${winner.nomination.theme.glow}, 0 8px 32px rgba(0,0,0,0.12)`,
                                            `0 0 20px ${winner.nomination.theme.glow}, 0 8px 32px rgba(0,0,0,0.08)`,
                                        ]
                                    }}
                                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                                >
                                    <motion.div
                                        className="prev-winner-avatar"
                                        style={{ background: `linear-gradient(135deg, ${winner.nomination.theme.primary}, ${winner.nomination.theme.secondary})` }}
                                        animate={{ scale: [1, 1.05, 1] }}
                                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                                    >
                                        <span className="prev-winner-avatar-text">{winner.employee.name.charAt(0)}</span>
                                        <motion.span
                                            className="prev-winner-avatar-emoji"
                                            animate={{ rotate: [0, 20, -20, 0] }}
                                            transition={{ duration: 3, repeat: Infinity }}
                                        >
                                            {winner.nomination.emoji}
                                        </motion.span>
                                    </motion.div>

                                    <div className="prev-winner-info">
                                        <motion.div
                                            className="prev-winner-name"
                                            style={{ color: winner.nomination.theme.textDark }}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.4 + idx * 0.1 }}
                                        >
                                            {winner.employee.name}
                                        </motion.div>
                                        <div className="prev-winner-votes" style={{ color: winner.nomination.theme.primary }}>
                                            <motion.span
                                                key={winner.votes}
                                                initial={{ scale: 1.4, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                transition={{ type: 'spring', stiffness: 400 }}
                                                className="prev-winner-votes-num"
                                            >
                                                {winner.votes}
                                            </motion.span>
                                            <span className="prev-winner-votes-label"> санал авсан</span>
                                        </div>
                                    </div>

                                    <div className="prev-winner-right">
                                        <motion.div
                                            className="prev-winner-badge"
                                            style={{ background: `linear-gradient(135deg, ${winner.nomination.theme.primary}, ${winner.nomination.theme.secondary})` }}
                                            animate={{ scale: [1, 1.1, 1], rotate: [0, -5, 5, 0] }}
                                            transition={{ duration: 3, repeat: Infinity }}
                                        >
                                            🥇
                                        </motion.div>
                                        <div className="prev-winner-stars">
                                            {[...Array(Math.min(winner.votes, 5))].map((_, i) => (
                                                <motion.span
                                                    key={i}
                                                    initial={{ scale: 0, rotate: -40 }}
                                                    animate={{ scale: 1, rotate: 0 }}
                                                    transition={{ delay: 0.4 + i * 0.08, type: 'spring', stiffness: 450 }}
                                                    style={{ fontSize: '14px' }}
                                                >⭐</motion.span>
                                            ))}
                                            {winner.votes > 5 && (
                                                <span className="prev-winner-stars-overflow" style={{ color: winner.nomination.theme.primary }}>
                                                    +{winner.votes - 5}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>

                                <div className="prev-winner-confetti">
                                    {['🎉', '✨', '🌟', '💫', '🎊'].map((sym, i) => (
                                        <motion.span
                                            key={i}
                                            className="confetti-particle"
                                            style={{ left: `${10 + i * 18}%` }}
                                            animate={{ y: [0, -18, 0], opacity: [0.6, 1, 0.6], rotate: [0, 20, -20, 0] }}
                                            transition={{ duration: 2 + i * 0.3, repeat: Infinity, delay: i * 0.4, ease: 'easeInOut' }}
                                        >
                                            {sym}
                                        </motion.span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </AnimatePresence>

            {/* Nomination Banner */}
            <motion.div
                className="nomination-banner"
                style={{ borderColor: theme.cardBorder }}
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
            >
                <motion.span
                    className="nomination-emoji"
                    animate={{ scale: [1, 1.15, 1], rotate: [0, 8, -8, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                >
                    {nomination.emoji}
                </motion.span>
                <div>
                    <h2 className="nomination-name" style={{ color: theme.primary }}>
                        {nomination.name}
                    </h2>
                    <p className="nomination-desc" style={{ color: theme.textDark }}>
                        {nomination.description}
                    </p>
                </div>
                <div className="nomination-votes-left" style={{ color: theme.primary, borderColor: theme.cardBorder }}>
                    <motion.span
                        key={remaining}
                        className="votes-left-num"
                        initial={{ scale: 1.4 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 400 }}
                    >
                        {remaining}
                    </motion.span>
                    <span className="votes-left-label">санал үлдсэн</span>
                </div>
            </motion.div>




            {/* Main content */}
            <div className="voting-content">
                {/* Employee grid */}
                <div className="employee-grid-wrapper">
                    {loading ? (
                        <div className="loading-screen">
                            <motion.div
                                className="loading-spinner"
                                style={{ borderTopColor: theme.primary }}
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            />
                            <p style={{ color: theme.accent, fontWeight: 600 }}>Ачаалж байна...</p>
                        </div>
                    ) : (
                        <motion.div
                            className="employee-grid"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            {displayEmployees.map((emp, i) => (
                                <motion.div
                                    key={emp.id}
                                    initial={{ opacity: 0, scale: 0.7, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    transition={{ delay: i * 0.015, type: 'spring', stiffness: 220, damping: 18 }}
                                >
                                    <EmployeeCard
                                        employee={emp}
                                        voteCount={voteCounts[emp.id] || 0}
                                        myVoteCount={getMyVoteCountForEmployee(emp.id)}
                                        canVote={getRemainingVotes() > 0}
                                        onVote={() => handleVote(emp)}
                                        theme={theme}
                                        rank={rankMap[emp.id]}
                                        showMedal={showMedalSet.has(emp.id)}
                                        isFullyBacked={fullyBackedSet.has(emp.id)}
                                    />
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </div>

                {/* Sidebar */}
                <Sidebar
                    theme={theme}
                    remainingVotes={getRemainingVotes()}
                    totalVoters={totalVoters}
                    voterList={voterList}
                    nominationName={nomination.name}
                    user={user}
                />
            </div>
        </motion.div>
    );
}
