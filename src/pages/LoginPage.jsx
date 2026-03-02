import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const floatingEmojis = ['👑', '⭐', '🏆', '💫', '✨', '🎯', '🌟', '💎', '🤝', '💡'];

export default function LoginPage() {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [shake, setShake] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        const result = login(email);
        if (!result.success) {
            setError(result.error);
            setShake(true);
            setTimeout(() => setShake(false), 600);
        }
        setLoading(false);
    };

    return (
        <div className="login-page">
            {/* Floating background emojis */}
            {floatingEmojis.map((emoji, i) => (
                <motion.div
                    key={i}
                    className="floating-emoji"
                    style={{
                        left: `${5 + (i * 9.5)}%`,
                        animationDelay: `${i * 0.4}s`,
                    }}
                    initial={{ y: '110vh', opacity: 0 }}
                    animate={{ y: '-10vh', opacity: [0, 0.6, 0.6, 0] }}
                    transition={{
                        duration: 6 + (i % 3),
                        delay: i * 0.5,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                >
                    {emoji}
                </motion.div>
            ))}

            {/* Main login card */}
            <motion.div
                className="login-card"
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            >
                {/* Trophy animation */}
                <motion.div
                    className="login-trophy"
                    animate={{ rotateY: [0, 15, -15, 0], scale: [1, 1.05, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                    🏆
                </motion.div>

                <motion.h1
                    className="login-title"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    ITC AWARDS
                </motion.h1>
                <motion.p
                    className="login-subtitle"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    Хамгийн шилдэг хүмүүсийг сонго!
                </motion.p>

                <motion.form
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <motion.div
                        animate={shake ? { x: [-8, 8, -8, 8, 0] } : {}}
                        transition={{ duration: 0.4 }}
                    >
                        <input
                            className="login-input"
                            type="email"
                            placeholder="Имэйл хаягаа оруулна уу..."
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoFocus
                        />
                    </motion.div>

                    <AnimatePresence>
                        {error && (
                            <motion.p
                                className="login-error"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                            >
                                ⚠️ {error}
                            </motion.p>
                        )}
                    </AnimatePresence>

                    <motion.button
                        className="login-btn"
                        type="submit"
                        disabled={loading}
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                    >
                        {loading ? (
                            <span className="spinner" />
                        ) : (
                            <>✨ Нэвтрэх</>
                        )}
                    </motion.button>
                </motion.form>

                <motion.p
                    className="login-hint"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    Зөвхөн ITC имэйлтэй ажилчид нэвтрэх боломжтой
                </motion.p>
            </motion.div>
        </div>
    );
}
