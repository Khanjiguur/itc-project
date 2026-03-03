import { motion, AnimatePresence } from 'framer-motion';

export default function Sidebar({ theme, remainingVotes, totalVoters, voterList, nominationName, user }) {
    const votesUsed = 3 - remainingVotes;

    return (
        <motion.aside
            className="sidebar"
            initial={{ x: 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
        >
            {/* User info */}
            <div className="sidebar-user">
                <span className="sidebar-user-dot" style={{ background: theme.primary }} />
                <span className="sidebar-user-name">{user?.name}</span>
            </div>
            {/* My votes status */}
            <div className="sidebar-section">
                <h3 className="sidebar-title" style={{ color: theme.primary }}>
                    🗳️ Миний санал
                </h3>
                <div className="vote-dots-row">
                    {[0, 1, 2].map(i => (
                        <motion.div
                            key={i}
                            className="vote-dot-large"
                            style={{
                                background: i < votesUsed ? theme.primary : 'transparent',
                                borderColor: theme.primary,
                                boxShadow: i < votesUsed ? `0 0 14px ${theme.glow}` : 'none',
                            }}
                            animate={i < votesUsed ? { scale: [1, 1.18, 1] } : {}}
                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                        />
                    ))}
                </div>
                <p className="vote-remaining-text" style={{ color: theme.accent }}>
                    {remainingVotes > 0
                        ? `${remainingVotes} санал үлдсэн`
                        : '✅ Бүх санал өгсөн!'}
                </p>
            </div>

            {/* Stats */}
            <div className="sidebar-section">
                <h3 className="sidebar-title" style={{ color: theme.primary }}>
                    📊 Статистик
                </h3>
                <div className="stat-item">
                    <span className="stat-label">Санал өгсөн хүн</span>
                    <motion.span
                        key={totalVoters}
                        className="stat-value"
                        style={{ color: theme.primary }}
                        initial={{ scale: 1.5 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring' }}
                    >
                        {totalVoters} хүн
                    </motion.span>
                </div>
            </div>
            {/* Voter list — only shown when > 20 voters */}
            {voterList.length > 5 && (
                <div className="sidebar-section voters-section">
                    <h3 className="sidebar-title" style={{ color: theme.primary }}>
                        👥 Санал өгсөн хүмүүс
                    </h3>
                    <div className="voter-list">
                        <AnimatePresence>
                            {[...voterList]
                                .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                                .map((voter, i) => (
                                    <motion.div
                                        key={voter.email || voter.name + i}
                                        className="voter-item"
                                        style={{ borderLeftColor: theme.primary }}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ delay: Math.min(i * 0.03, 0.5) }}
                                    >
                                        <span
                                            className="voter-avatar"
                                            style={{ background: theme.primary }}
                                        >
                                            {voter.name.charAt(0)}
                                        </span>
                                        <span className="voter-name">{voter.name}</span>
                                    </motion.div>
                                ))
                            }
                        </AnimatePresence>
                    </div>
                </div>
            )}
        </motion.aside>
    );
}
