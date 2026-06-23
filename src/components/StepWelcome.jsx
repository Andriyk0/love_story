import { motion } from 'framer-motion'
import { useState, useRef } from 'react'

const HEARTS = ['💖', '🌹', '✨', '💫', '🦋', '🌸', '💝']

export default function StepWelcome({ onYes }) {
  const [noPos, setNoPos] = useState({ x: 0, y: 0 })
  const [noEmoji, setNoEmoji] = useState('😢')
  const [noVisible, setNoVisible] = useState(true)
  const [hoverCount, setHoverCount] = useState(0)
  const noRef = useRef(null)

  function runAway() {
    const btn = noRef.current?.getBoundingClientRect()
    if (!btn) return

    const margin = 24
    const vw = window.innerWidth
    const vh = window.innerHeight

    const safeMinX = btn.width / 2 + margin
    const safeMaxX = vw - btn.width / 2 - margin
    const safeMinY = btn.height / 2 + margin
    const safeMaxY = vh - btn.height / 2 - margin

    const targetCX = safeMinX + Math.random() * (safeMaxX - safeMinX)
    const targetCY = safeMinY + Math.random() * (safeMaxY - safeMinY)

    const originCX = btn.left + btn.width / 2 - noPos.x
    const originCY = btn.top + btn.height / 2 - noPos.y

    setNoPos({ x: targetCX - originCX, y: targetCY - originCY })

    const emojis = ['😅', '🙈', '😬', '🤭', '😂', '🫣', '🏃']
    setNoEmoji(emojis[Math.floor(Math.random() * emojis.length)])

    const newCount = hoverCount + 1
    setHoverCount(newCount)
    if (newCount >= 7 && Math.random() > 0.6) setNoVisible(false)
  }

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 'clamp(40px, 8vw, 80px) clamp(20px, 5vw, 48px)', overflow: 'hidden' }}>
      {HEARTS.map((h, i) => (
        <motion.span
          key={i}
          style={{ position: 'absolute', fontSize: 'clamp(20px, 4vw, 32px)', pointerEvents: 'none', userSelect: 'none', left: `${8 + i * 12}%`, top: '-5%' }}
          animate={{ y: ['0vh', '110vh'], opacity: [0, 1, 1, 0], rotate: [0, 20, -20, 0] }}
          transition={{ duration: 7 + i * 0.9, repeat: Infinity, delay: i * 1.1, ease: 'linear' }}
        >
          {h}
        </motion.span>
      ))}

      <motion.div
        style={{ textAlign: 'center', maxWidth: '560px', width: '100%', margin: '0 auto', position: 'relative', zIndex: 10 }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <motion.div
          style={{ fontSize: 'clamp(52px, 14vw, 80px)', marginBottom: 'clamp(16px, 4vw, 32px)' }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          🌹
        </motion.div>

        <motion.h1
          className="font-playfair"
          style={{ fontSize: 'clamp(32px, 9vw, 60px)', fontWeight: 700, color: 'white', marginBottom: 'clamp(12px, 3vw, 24px)', lineHeight: 1.2 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Привіт,{' '}
          <span className="font-playfair" style={{ fontStyle: 'italic', color: '#ff6b9d' }}>Іринко</span>{' '}✨
        </motion.h1>

        <motion.p
          style={{ color: 'rgba(255,255,255,0.7)', fontSize: 'clamp(15px, 4vw, 22px)', lineHeight: 1.7, marginBottom: 'clamp(16px, 5vw, 32px)', fontWeight: 300 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Я довго думав як запросити тебе на побачення...
          <br />
          <span style={{ color: 'rgba(255,255,255,0.9)' }}>і нарешті наважився 🦋</span>
          <br /><br />
          Хочу провести з тобою особливий вечір —
          такий, який ти запам'ятаєш надовго.
          <br /><br />
          <span style={{ fontWeight: 500, color: 'white', display: 'block', marginBottom: '4px' }}>
            Скажеш мені "так"? 💌
          </span>
        </motion.p>

        <motion.div
          style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 'clamp(12px, 3vw, 20px)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <motion.button
            onClick={onYes}
            style={{
              position: 'relative',
              padding: 'clamp(14px, 3vw, 22px) clamp(28px, 8vw, 56px)',
              borderRadius: '9999px',
              background: 'linear-gradient(135deg, #ff6b9d, #c44dff)',
              border: 'none',
              color: 'white',
              fontSize: 'clamp(16px, 4vw, 22px)',
              fontWeight: 700,
              cursor: 'pointer',
              minWidth: 'clamp(160px, 40vw, 240px)',
              overflow: 'hidden',
            }}
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #ff9d6b, #ff6bc4)', opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            <span style={{ position: 'relative', zIndex: 1 }}>Так, звісно! 💖</span>
          </motion.button>

          {noVisible && (
            <motion.button
              ref={noRef}
              onMouseEnter={runAway}
              onTouchStart={runAway}
              animate={{ x: noPos.x, y: noPos.y }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              style={{
                padding: 'clamp(14px, 3vw, 22px) clamp(24px, 6vw, 48px)',
                borderRadius: '9999px',
                border: '2px solid rgba(255,255,255,0.2)',
                background: 'rgba(255,255,255,0.05)',
                color: 'rgba(255,255,255,0.5)',
                fontSize: 'clamp(16px, 4vw, 22px)',
                cursor: 'pointer',
                userSelect: 'none',
                minWidth: 'clamp(130px, 32vw, 200px)',
              }}
            >
              {noEmoji} Ні...
            </motion.button>
          )}
        </motion.div>

        {!noVisible && (
          <motion.p
            style={{ marginTop: '24px', color: 'rgba(255,255,255,0.4)', fontSize: '15px' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Кнопка "ні" кудись зникла... 🤭
          </motion.p>
        )}
      </motion.div>
    </div>
  )
}
