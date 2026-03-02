import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import { NOMINATIONS, EMPLOYEES, ACTIVE_NOMINATION_INDEX } from '../lib/constants';
import { useAuth } from '../context/AuthContext';
import { useVotes } from '../hooks/useVotes';
import EmployeeCard from '../components/EmployeeCard';
import Sidebar from '../components/Sidebar';

export default function VotingPage() {
    const { user, logout } = useAuth();
    const nomination = NOMINATIONS[ACTIVE_NOMINATION_INDEX];
    const theme = nomination.theme;

    const {
        voteCounts,
        loading,
        totalVoters,
        voterList,
        completedVoters,
        fullyBackedEmployees,
        getRemainingVotes,
        canVote,
        castVote,
        getMyVoteCountForEmployee,
    } = useVotes(nomination.id, user);

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

    // Sort employees by vote count descending
    const sortedEmployees = [...EMPLOYEES].sort((a, b) =>
        (voteCounts[b.id] || 0) - (voteCounts[a.id] || 0)
    );

    // Build rank map: employeeId → rank (1-based)
    const rankMap = {};
    sortedEmployees.forEach((emp, i) => { rankMap[emp.id] = i + 1; });

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
                        <h1 className="header-title">ITC AWARDS 2025</h1>
                        <p className="header-sub">Хамгийн шилдэг хүмүүсийг сонго!</p>
                    </div>
                </div>
                <button className="logout-btn" onClick={logout}>
                    Гарах ↩
                </button>
            </motion.header>

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
                            {sortedEmployees.map((emp, i) => (
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
                    completedVoters={completedVoters}
                    fullyBackedEmployees={fullyBackedEmployees}
                    nominationName={nomination.name}
                    user={user}
                />
            </div>
        </motion.div>
    );
}
