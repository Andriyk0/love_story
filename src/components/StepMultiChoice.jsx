import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

export default function StepMultiChoice({ title, emoji, subtitle, options, onNext, accent = '#ff6b9d' }) {
  const [selected, setSelected] = useState([])
  const [custom, setCustom] = useState('')
  const [showCustom, setShowCustom] = useState(false)

  function toggle(id) {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }

  function handleNext() {
    const all = [...selected.map(id => options.find(o => o.id === id)?.label || id)]
    if (custom.trim()) all.push(custom.trim())
    if (all.length === 0) return
    onNext(all)
  }

  const canProceed = selected.length > 0 || custom.trim()

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(32px, 6vw, 64px) clamp(16px, 5vw, 40px)' }}>
      <motion.div
        style={{ textAlign: 'center', maxWidth: '700px', width: '100%', margin: '0 auto' }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div style={{ fontSize: 'clamp(44px, 12vw, 64px)', marginBottom: '16px' }}>{emoji}</div>
        <h2 className="font-playfair" style={{ fontSize: 'clamp(26px, 7vw, 44px)', fontWeight: 700, color: 'white', marginBottom: '10px', lineHeight: 1.2 }}>{title}</h2>
        <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: 'clamp(24px, 5vw, 40px)', fontSize: 'clamp(14px, 3.5vw, 18px)' }}>{subtitle}</p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(8px, 2vw, 14px)', justifyContent: 'center', marginBottom: 'clamp(20px, 4vw, 32px)' }}>
          {options.map((opt, i) => {
            const isSelected = selected.includes(opt.id)
            return (
              <motion.button
                key={opt.id}
                onClick={() => toggle(opt.id)}
                style={{
                  padding: 'clamp(10px, 2.5vw, 14px) clamp(16px, 4vw, 28px)',
                  borderRadius: '9999px',
                  border: `2px solid ${isSelected ? accent : 'rgba(255,255,255,0.2)'}`,
                  background: isSelected ? `${accent}35` : 'rgba(255,255,255,0.07)',
                  color: isSelected ? 'white' : 'rgba(255,255,255,0.7)',
                  fontSize: 'clamp(13px, 3.2vw, 16px)',
                  fontWeight: 500,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  whiteSpace: 'nowrap',
                }}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.93 }}
              >
                {isSelected && <span>✓</span>}
                {opt.label}
              </motion.button>
            )
          })}

          <motion.button
            onClick={() => setShowCustom(v => !v)}
            style={{
              padding: 'clamp(10px, 2.5vw, 14px) clamp(16px, 4vw, 28px)',
              borderRadius: '9999px',
              border: '2px dashed rgba(255,255,255,0.2)',
              background: 'transparent',
              color: 'rgba(255,255,255,0.4)',
              fontSize: 'clamp(13px, 3.2vw, 16px)',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
            whileTap={{ scale: 0.93 }}
          >
            {showCustom ? '✕ Закрити' : '+ Свій варіант'}
          </motion.button>
        </div>

        <AnimatePresence>
          {showCustom && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{ marginBottom: '24px', overflow: 'hidden' }}
            >
              <input
                type="text"
                value={custom}
                onChange={e => setCustom(e.target.value)}
                placeholder="Введи свій варіант..."
                style={{
                  width: '100%',
                  padding: 'clamp(12px, 3vw, 16px) clamp(16px, 4vw, 24px)',
                  borderRadius: '16px',
                  border: '2px solid rgba(255,255,255,0.2)',
                  background: 'rgba(255,255,255,0.06)',
                  color: 'white',
                  fontSize: 'clamp(14px, 3.5vw, 17px)',
                  textAlign: 'center',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
                onKeyDown={e => e.key === 'Enter' && canProceed && handleNext()}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={handleNext}
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
          Далі →
        </motion.button>
      </motion.div>
    </div>
  )
}
