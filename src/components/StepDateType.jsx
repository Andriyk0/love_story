import { motion } from 'framer-motion'
import { DATE_TYPES } from '../data/options'

export default function StepDateType({ onSelect }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(32px, 6vw, 64px) clamp(16px, 5vw, 40px)' }}>
      <motion.div
        style={{ textAlign: 'center', maxWidth: '680px', width: '100%', margin: '0 auto' }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div style={{ fontSize: 'clamp(44px, 12vw, 64px)', marginBottom: '16px' }}>🎯</div>
        <h2 className="font-playfair" style={{ fontSize: 'clamp(26px, 7vw, 44px)', fontWeight: 700, color: 'white', marginBottom: '10px', lineHeight: 1.2 }}>
          Яке побачення тобі до душі?
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: 'clamp(24px, 5vw, 40px)', fontSize: 'clamp(14px, 3.5vw, 18px)' }}>
          Обери і я все влаштую ✨
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'clamp(10px, 2.5vw, 16px)' }}>
          {DATE_TYPES.map((type, i) => (
            <motion.button
              key={type.id}
              onClick={() => onSelect(type)}
              className="group"
              style={{
                position: 'relative',
                padding: 'clamp(20px, 4vw, 28px) clamp(16px, 3vw, 24px)',
                borderRadius: '20px',
                border: '1px solid rgba(255,255,255,0.12)',
                background: 'rgba(255,255,255,0.06)',
                textAlign: 'left',
                cursor: 'pointer',
                overflow: 'hidden',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.03, borderColor: 'rgba(255,255,255,0.3)' }}
              whileTap={{ scale: 0.97 }}
            >
              <motion.div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: `radial-gradient(circle at 50% 50%, ${type.bg.accent}22, transparent 70%)`,
                  opacity: 0,
                }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ fontSize: 'clamp(32px, 8vw, 44px)', marginBottom: '12px' }}>{type.emoji}</div>
                <h3 className="font-playfair" style={{ fontSize: 'clamp(16px, 4vw, 22px)', fontWeight: 600, color: 'white', marginBottom: '6px' }}>
                  {type.label}
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 'clamp(12px, 3vw, 15px)' }}>{type.description}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
