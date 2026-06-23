import { motion } from 'framer-motion'
import { useState } from 'react'

export default function StepLocation({ onNext, accent = '#ff6b9d' }) {
  const [location, setLocation] = useState('')

  const canProceed = location.trim().length > 0

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(32px, 6vw, 64px) clamp(16px, 5vw, 40px)' }}>
      <motion.div
        style={{ textAlign: 'center', maxWidth: '500px', width: '100%', margin: '0 auto' }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          style={{ fontSize: 'clamp(44px, 12vw, 72px)', marginBottom: '16px' }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          📍
        </motion.div>

        <h2 className="font-playfair" style={{ fontSize: 'clamp(26px, 7vw, 42px)', fontWeight: 700, color: 'white', marginBottom: '10px', lineHeight: 1.2 }}>
          Де тебе забрати?
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: 'clamp(28px, 6vw, 44px)', fontSize: 'clamp(14px, 3.5vw, 18px)' }}>
          Напиши адресу або місце — я знайду 🗺️
        </p>

        <motion.div
          style={{ marginBottom: '28px' }}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <input
            type="text"
            value={location}
            onChange={e => setLocation(e.target.value)}
            placeholder="вул. Хрещатик, 1 / біля кафе..."
            autoFocus
            style={{
              width: '100%',
              padding: 'clamp(14px, 3vw, 18px) clamp(18px, 4vw, 24px)',
              borderRadius: '18px',
              border: `2px solid ${canProceed ? accent : 'rgba(255,255,255,0.2)'}`,
              background: 'rgba(255,255,255,0.07)',
              color: 'white',
              fontSize: 'clamp(15px, 3.5vw, 18px)',
              outline: 'none',
              textAlign: 'center',
              transition: 'border-color 0.3s',
              boxSizing: 'border-box',
            }}
            onKeyDown={e => e.key === 'Enter' && canProceed && onNext(location.trim())}
          />
        </motion.div>

        <motion.button
          onClick={() => canProceed && onNext(location.trim())}
          disabled={!canProceed}
          style={{
            padding: 'clamp(14px, 3vw, 18px) clamp(40px, 10vw, 64px)',
            borderRadius: '9999px',
            border: 'none',
            background: canProceed ? `linear-gradient(135deg, ${accent}, #c44dff)` : 'rgba(255,255,255,0.1)',
            color: 'white',
            fontSize: 'clamp(16px, 4vw, 20px)',
            fontWeight: 600,
            cursor: canProceed ? 'pointer' : 'not-allowed',
            opacity: canProceed ? 1 : 0.35,
          }}
          whileHover={canProceed ? { scale: 1.05 } : {}}
          whileTap={canProceed ? { scale: 0.95 } : {}}
        >
          Готово! ✨
        </motion.button>
      </motion.div>
    </div>
  )
}
