import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function StepReaction({ emoji, message, accent = '#ff6b9d', onDone }) {
  const [progress, setProgress] = useState(0)
  const DURATION = 5000

  useEffect(() => {
    const start = Date.now()
    const interval = setInterval(() => {
      const elapsed = Date.now() - start
      const p = Math.min((elapsed / DURATION) * 100, 100)
      setProgress(p)
      if (p >= 100) {
        clearInterval(interval)
        onDone()
      }
    }, 30)
    return () => clearInterval(interval)
  }, [onDone])

  return (
    <div style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 'clamp(32px, 6vw, 64px) clamp(24px, 6vw, 48px)' }}>
      <motion.div
        style={{ textAlign: 'center', maxWidth: '480px', width: '100%', margin: '0 auto' }}
        initial={{ opacity: 0, scale: 0.85, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
      >
        {/* Вибраний emoji — великий, з пульсацією */}
        <motion.div
          style={{ fontSize: 'clamp(64px, 18vw, 100px)', marginBottom: 'clamp(20px, 5vw, 36px)', lineHeight: 1 }}
          animate={{ scale: [1, 1.12, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2.2, repeat: Infinity }}
        >
          {emoji}
        </motion.div>

        <motion.p
          className="font-playfair"
          style={{ fontSize: 'clamp(18px, 5vw, 28px)', color: 'white', lineHeight: 1.6 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1.0 }}
        >
          {message}
        </motion.p>

        <div style={{ marginTop: 'clamp(32px, 8vw, 48px)', width: '140px', height: '2px', borderRadius: '9999px', background: 'rgba(255,255,255,0.1)', overflow: 'hidden', margin: 'clamp(32px, 8vw, 48px) auto 0' }}>
          <motion.div
            style={{ height: '100%', borderRadius: '9999px', background: accent, width: `${progress}%` }}
          />
        </div>

        <motion.p
          style={{ color: 'rgba(255,255,255,0.25)', fontSize: '14px', marginTop: '12px' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          далі...
        </motion.p>
      </motion.div>
    </div>
  )
}
