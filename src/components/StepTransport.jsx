import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { TRANSPORT_OPTIONS } from '../data/options'

export default function StepTransport({ onSelect, accent = '#ff6b9d' }) {
  const [chosen, setChosen] = useState(null)

  function handleClick(opt) {
    setChosen(opt)
    setTimeout(() => onSelect(`${opt.emoji} ${opt.label}`), 900)
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(32px, 6vw, 64px) clamp(16px, 5vw, 40px)', position: 'relative', overflow: 'hidden' }}>

      <AnimatePresence>
        {chosen && (
          <motion.div
            key="flying"
            style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', zIndex: 50 }}
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.span
              style={{ fontSize: 'clamp(64px, 20vw, 96px)' }}
              initial={{ y: 0, scale: 1, rotate: 0 }}
              animate={{ y: -400, scale: 2.5, rotate: -20 }}
              transition={{ duration: 0.9, ease: [0.2, 0, 0.5, 1] }}
            >
              {chosen.emoji}
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        style={{ textAlign: 'center', maxWidth: '600px', width: '100%', margin: '0 auto' }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div style={{ fontSize: 'clamp(44px, 12vw, 64px)', marginBottom: '16px' }}>🚗</div>
        <h2 className="font-playfair" style={{ fontSize: 'clamp(26px, 7vw, 44px)', fontWeight: 700, color: 'white', marginBottom: '10px', lineHeight: 1.2 }}>
          На чому заберу?
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: 'clamp(24px, 5vw, 40px)', fontSize: 'clamp(14px, 3.5vw, 18px)' }}>
          Як добиратимемось на побачення?
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'clamp(8px, 2.5vw, 16px)' }}>
          {TRANSPORT_OPTIONS.map((opt, i) => (
            <motion.button
              key={opt.id}
              onClick={() => handleClick(opt)}
              disabled={!!chosen}
              style={{
                padding: 'clamp(16px, 4vw, 28px) clamp(8px, 2vw, 16px)',
                borderRadius: '20px',
                border: `2px solid ${chosen?.id === opt.id ? accent : 'rgba(255,255,255,0.1)'}`,
                background: chosen?.id === opt.id ? `${accent}25` : 'rgba(255,255,255,0.06)',
                cursor: chosen ? 'default' : 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px',
              }}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08 }}
              whileHover={!chosen ? { scale: 1.06, borderColor: accent } : {}}
              whileTap={!chosen ? { scale: 0.92 } : {}}
            >
              <motion.span
                style={{ fontSize: 'clamp(32px, 9vw, 48px)' }}
                whileHover={{ rotate: [0, -12, 12, 0] }}
                transition={{ duration: 0.4 }}
              >
                {opt.emoji}
              </motion.span>
              <span style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 500, fontSize: 'clamp(12px, 3vw, 16px)' }}>
                {opt.label}
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
