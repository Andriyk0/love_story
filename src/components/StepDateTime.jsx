import { motion } from 'framer-motion'
import { useState } from 'react'

export default function StepDateTime({ onNext, accent = '#ff6b9d' }) {
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')

  const canProceed = date && time

  const fieldStyle = {
    display: 'block',
    width: '100%',
    boxSizing: 'border-box',
    padding: 'clamp(14px, 3.5vw, 18px) clamp(16px, 4vw, 22px)',
    borderRadius: '16px',
    border: `2px solid rgba(255,255,255,0.15)`,
    background: 'rgba(255,255,255,0.07)',
    color: 'white',
    fontSize: 'clamp(15px, 4vw, 18px)',
    outline: 'none',
    cursor: 'pointer',
    colorScheme: 'dark',
    WebkitAppearance: 'none',
    appearance: 'none',
    maxWidth: '100%',
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxSizing: 'border-box',
      padding: 'clamp(40px, 8vw, 64px) clamp(20px, 6vw, 40px)',
      overflow: 'hidden',
    }}>
      <motion.div
        style={{ textAlign: 'center', width: '100%', maxWidth: '460px', boxSizing: 'border-box' }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div style={{ fontSize: 'clamp(44px, 12vw, 64px)', marginBottom: '16px' }}>📅</div>
        <h2 className="font-playfair" style={{ fontSize: 'clamp(26px, 7vw, 44px)', fontWeight: 700, color: 'white', marginBottom: '10px', lineHeight: 1.2 }}>
          Коли зустрічаємось?
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: 'clamp(24px, 6vw, 40px)', fontSize: 'clamp(14px, 3.5vw, 18px)' }}>
          Обери зручну дату і час
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px', width: '100%', boxSizing: 'border-box' }}>
          <div style={{ textAlign: 'left', width: '100%', boxSizing: 'border-box' }}>
            <label style={{ display: 'block', color: 'rgba(255,255,255,0.5)', fontSize: '12px', marginBottom: '8px', marginLeft: '4px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Дата
            </label>
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              style={fieldStyle}
            />
          </div>

          <div style={{ textAlign: 'left', width: '100%', boxSizing: 'border-box' }}>
            <label style={{ display: 'block', color: 'rgba(255,255,255,0.5)', fontSize: '12px', marginBottom: '8px', marginLeft: '4px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Час
            </label>
            <input
              type="time"
              value={time}
              onChange={e => setTime(e.target.value)}
              style={fieldStyle}
            />
          </div>
        </div>

        <motion.button
          onClick={() => canProceed && onNext({ date, time })}
          disabled={!canProceed}
          style={{
            width: '100%',
            boxSizing: 'border-box',
            padding: 'clamp(14px, 3.5vw, 18px) clamp(24px, 6vw, 32px)',
            borderRadius: '9999px',
            border: 'none',
            background: canProceed ? `linear-gradient(135deg, ${accent}, #c44dff)` : 'rgba(255,255,255,0.1)',
            color: 'white',
            fontSize: 'clamp(16px, 4vw, 20px)',
            fontWeight: 600,
            cursor: canProceed ? 'pointer' : 'not-allowed',
            opacity: canProceed ? 1 : 0.35,
          }}
          whileHover={canProceed ? { scale: 1.03 } : {}}
          whileTap={canProceed ? { scale: 0.97 } : {}}
        >
          Готово! ✨
        </motion.button>
      </motion.div>
    </div>
  )
}
