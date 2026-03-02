import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GENDER_EMOJI } from '../lib/constants';

// Particle burst on vote
function Particle({ x, y, onDone }) {
    const angle = Math.random() * 360;
    const dist = 65 + Math.random() * 80;
    const tx = Math.cos((angle * Math.PI) / 180) * dist;
    const ty = Math.sin((angle * Math.PI) / 180) * dist;
    const symbols = ['⭐', '✨', '💫', '🌟', '🎉', '⚡'];
    const sym = symbols[Math.floor(Math.random() * symbols.length)];
    return (
        <motion.div
            style={{
                position: 'fixed', left: x, top: y, fontSize: '18px',
                pointerEvents: 'none', zIndex: 9999, userSelect: 'none',
                transform: 'translate(-50%, -50%)',
            }}
            initial={{ scale: 0, opacity: 1, x: 0, y: 0 }}
            animate={{ scale: [0, 1.8, 0], opacity: [1, 1, 0], x: tx, y: ty }}
            transition={{ duration: 0.75, ease: 'easeOut' }}
            onAnimationComplete={onDone}
        >
            {sym}
        </motion.div>
    );
}

const RANK_BADGES = ['🥇', '🥈', '🥉'];

// Get initials from name (first chars of each word, max 2)
function getInitials(name) {
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
}

export default function EmployeeCard({ employee, voteCount, myVoteCount, canVote, onVote, theme, rank }) {
    const [isHovered, setIsHovered] = useState(false);
    const [particles, setParticles] = useState([]);
    const [voting, setVoting] = useState(false);
    const cardRef = useRef(null);

    const genderEmoji = GENDER_EMOJI[employee.gender] || '👤';
    const hasMyVotes = myVoteCount > 0;
    const initials = getInitials(employee.name);
    const rankBadge = rank <= 3 ? RANK_BADGES[rank - 1] : null;

    const floatDelay = (parseInt(employee.id.replace('emp', ''), 10) % 8) * 0.35;

    const handleVote = async (e) => {
        e.stopPropagation();
        if (!canVote || voting) return;
        const rect = cardRef.current?.getBoundingClientRect();
        if (rect) {
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 3;
            setParticles(prev => [
                ...prev,
                ...Array.from({ length: 10 }, (_, i) => ({ id: Date.now() + i, x: cx, y: cy }))
            ]);
        }
        setVoting(true);
        await onVote();
        setVoting(false);
    };

    return (
        <>
            {particles.map(p => (
                <Particle key={p.id} x={p.x} y={p.y} onDone={() => setParticles(prev => prev.filter(q => q.id !== p.id))} />
            ))}

            <motion.div
                ref={cardRef}
                className={`employee-card ${isHovered ? 'hovered' : ''} ${hasMyVotes ? 'voted' : ''}`}
                initial={{ opacity: 0, scale: 0.75, y: 28 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 220, damping: 20 }}
                whileHover={{ scale: 1.06, y: -8 }}
                whileTap={{ scale: 0.96 }}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                style={{
                    animationDelay: `${floatDelay}s`,
                    borderColor: isHovered ? theme.primary : (hasMyVotes ? theme.secondary : theme.cardBorder),
                    boxShadow: isHovered
                        ? `0 20px 60px ${theme.cardShadow}, 0 0 0 2px ${theme.primary}, 0 0 28px ${theme.glow}`
                        : hasMyVotes
                            ? `0 8px 28px ${theme.cardShadow}, 0 0 0 1.5px ${theme.secondary}`
                            : `0 6px 24px ${theme.cardShadow}`,
                    background: isHovered
                        ? `linear-gradient(160deg, #fff 0%, ${theme.badgeBg} 100%)`
                        : '#fff',
                }}
            >
                {/* Gradient top accent */}
                <div
                    className="card-accent-strip"
                    style={{ background: `linear-gradient(90deg, ${theme.cardBorder}, ${theme.primary}, ${theme.secondary})` }}
                />

                {/* Rank badge — top left */}
                {rankBadge && (
                    <motion.span
                        className="card-rank-badge"
                        animate={{ rotate: [0, -8, 8, 0], scale: [1, 1.1, 1] }}
                        transition={{ duration: 3, repeat: Infinity, delay: rank * 0.5 }}
                    >
                        {rankBadge}
                    </motion.span>
                )}

                {/* My-vote indicator — top right overlay */}
                {hasMyVotes && (
                    <motion.span
                        className="card-voted-badge"
                        style={{ background: theme.primary }}
                        initial={{ scale: 0, rotate: -20 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 500 }}
                    >
                        {'⭐'.repeat(myVoteCount)}
                    </motion.span>
                )}

                {/* Avatar circle */}
                <div
                    className="card-avatar"
                    style={{
                        background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
                        boxShadow: isHovered
                            ? `0 0 0 4px ${theme.badgeBg}, 0 0 20px ${theme.glow}`
                            : `0 0 0 3px ${theme.badgeBg}`,
                    }}
                >
                    <span className="card-avatar-initials">{initials}</span>
                    <span className="card-avatar-gender">{genderEmoji}</span>
                </div>

                {/* Name */}
                <div className="card-name" style={{ color: isHovered ? theme.primary : '#1e293b' }}>
                    {employee.name}
                </div>

                {/* Vote count */}
                <div className="card-vote-block">
                    <AnimatePresence mode="popLayout">
                        <motion.span
                            key={voteCount}
                            className="card-vote-num"
                            style={{ color: theme.primary }}
                            initial={{ opacity: 0, y: -14, scale: 1.6 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 14 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                        >
                            {voteCount}
                        </motion.span>
                    </AnimatePresence>
                    <span className="card-vote-unit" style={{ color: theme.accent }}>санал</span>
                </div>

                {/* Stars row */}
                {voteCount > 0 && (
                    <div className="card-stars">
                        {Array.from({ length: Math.min(voteCount, 5) }).map((_, i) => (
                            <motion.span
                                key={i}
                                initial={{ scale: 0, rotate: -40 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ delay: i * 0.06, type: 'spring', stiffness: 450 }}
                                style={{ fontSize: '12px' }}
                            >⭐</motion.span>
                        ))}
                        {voteCount > 5 && (
                            <span className="card-star-overflow" style={{ color: theme.primary }}>
                                +{voteCount - 5}
                            </span>
                        )}
                    </div>
                )}

                {/* Vote button — always visible */}
                <motion.button
                    className="vote-btn"
                    style={{
                        background: canVote ? theme.buttonBg : '#e2e8f0',
                        color: canVote ? '#fff' : '#94a3b8',
                        boxShadow: canVote && isHovered ? `0 6px 20px ${theme.glow}` : 'none',
                        opacity: voting ? 0.7 : 1,
                    }}
                    onClick={handleVote}
                    disabled={!canVote || voting}
                    whileHover={canVote ? { scale: 1.04 } : {}}
                    whileTap={canVote ? { scale: 0.93 } : {}}
                >
                    {voting ? (
                        <motion.span animate={{ rotate: 360 }} transition={{ duration: 0.6, repeat: Infinity, ease: 'linear' }}>⏳</motion.span>
                    ) : canVote ? (
                        '⭐ Санал өгөх'
                    ) : (
                        '✓ Өгсөн'
                    )}
                </motion.button>

                {/* Hover shimmer overlay */}
                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            className="card-shimmer"
                            style={{ background: `radial-gradient(circle at 50% 20%, ${theme.glow} 0%, transparent 65%)` }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        />
                    )}
                </AnimatePresence>
            </motion.div>
        </>
    );
}
