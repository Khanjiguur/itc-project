import { motion, AnimatePresence } from 'framer-motion';

export default function Sidebar({ theme, remainingVotes, totalVoters, voterList, completedVoters = [], fullyBackedEmployees = [], nominationName, user }) {
    const votesUsed = 3 - remainingVotes;

    return (
        <motion.aside
            className="sidebar"
            initial={{ x: 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
        >
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
                <div className="stat-item">
                    <span className="stat-label">Гүйцэд өгсөн</span>
                    <motion.span
                        key={completedVoters.length}
                        className="stat-value"
                        style={{ color: theme.secondary }}
                        initial={{ scale: 1.5 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring' }}
                    >
                        {completedVoters.length} хүн
                    </motion.span>
                </div>
            </div>

            {/* ✅ Completed voters (all 3 votes used) */}
            <div className="sidebar-section completed-section">
                <h3 className="sidebar-title" style={{ color: theme.primary }}>
                    🏅 Гүйцэд санал өгсөн
                </h3>
                <div className="voter-list">
                    <AnimatePresence>
                        {completedVoters.length === 0 ? (
                            <motion.p className="no-voters" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                Одоохондоо гүйцэд өгсөн хүн байхгүй
                            </motion.p>
                        ) : (
                            [...completedVoters]
                                .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                                .map((voter, i) => (
                                    <motion.div
                                        key={voter.email || voter.name + i}
                                        className="completed-voter-item"
                                        style={{ borderLeftColor: theme.primary, background: `${theme.badgeBg}` }}
                                        initial={{ opacity: 0, x: 20, scale: 0.9 }}
                                        animate={{ opacity: 1, x: 0, scale: 1 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ delay: Math.min(i * 0.04, 0.6), type: 'spring', stiffness: 300 }}
                                    >
                                        <span
                                            className="voter-avatar"
                                            style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})` }}
                                        >
                                            {voter.name.charAt(0)}
                                        </span>
                                        <span className="voter-name" style={{ color: theme.accent }}>{voter.name}</span>
                                        <span className="completed-checkmark">✅</span>
                                    </motion.div>
                                ))
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* 🎯 Fully backed employees — received all 3 votes from one single voter */}
            <div className="sidebar-section completed-section">
                <h3 className="sidebar-title" style={{ color: theme.primary }}>
                    🎯 Гүйцэд үнэлэгдсэн
                </h3>
                <p className="sidebar-section-hint" style={{ color: theme.accent }}>
                    Нэг хүн 3 саналаа нэгэнд нь өгсөн
                </p>
                <div className="voter-list">
                    <AnimatePresence>
                        {fullyBackedEmployees.length === 0 ? (
                            <motion.p className="no-voters" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                Одоохондоо байхгүй байна
                            </motion.p>
                        ) : (
                            [...fullyBackedEmployees]
                                .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                                .map((entry, i) => (
                                    <motion.div
                                        key={entry.employeeId + i}
                                        className="completed-voter-item fully-backed-item"
                                        style={{
                                            borderLeftColor: theme.secondary,
                                            background: `linear-gradient(135deg, ${theme.badgeBg}, #fffde7)`,
                                            boxShadow: `0 2px 12px ${theme.glow}`,
                                        }}
                                        initial={{ opacity: 0, x: 20, scale: 0.9 }}
                                        animate={{ opacity: 1, x: 0, scale: 1 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ delay: Math.min(i * 0.05, 0.6), type: 'spring', stiffness: 300 }}
                                    >
                                        <motion.span
                                            className="voter-avatar"
                                            style={{ background: `linear-gradient(135deg, #f59e0b, #d97706)`, fontSize: '14px' }}
                                            animate={{ scale: [1, 1.12, 1] }}
                                            transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
                                        >
                                            ⭐
                                        </motion.span>
                                        <span className="voter-name" style={{ color: theme.textDark, fontWeight: 700 }}>
                                            {entry.employeeName}
                                        </span>
                                        <span className="completed-checkmark">🏆</span>
                                    </motion.div>
                                ))
                        )}
                    </AnimatePresence>
                </div>
            </div>


            <div className="sidebar-section voters-section">
                <h3 className="sidebar-title" style={{ color: theme.primary }}>
                    👥 Санал өгсөн хүмүүс
                </h3>
                <div className="voter-list">
                    <AnimatePresence>
                        {voterList.length === 0 ? (
                            <motion.p className="no-voters" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                Одоохондоо санал өгсөн хүн байхгүй
                            </motion.p>
                        ) : (
                            [...voterList]
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
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* User info */}
            <div className="sidebar-user">
                <span className="sidebar-user-dot" style={{ background: theme.primary }} />
                <span className="sidebar-user-name">{user?.name}</span>
            </div>
        </motion.aside>
    );
}
