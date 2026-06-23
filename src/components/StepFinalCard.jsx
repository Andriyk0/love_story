import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { generateScenario } from '../utils/groq'
import { sendToTelegram } from '../utils/telegram'

function formatDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('uk-UA', { day: 'numeric', month: 'long', year: 'numeric' })
}

const CONFETTI = ['🌹', '✨', '💖', '🦋', '🌸', '💫', '🎉', '💝']

export default function StepFinalCard({ data, accent = '#ff6b9d' }) {
  const [scenario, setScenario] = useState('')
  const [loading, setLoading] = useState(true)
  const hasSent = useRef(false)

  useEffect(() => {
    if (hasSent.current) return
    hasSent.current = true

    async function init() {
      const [text] = await Promise.all([
        generateScenario(data),
        sendToTelegram(data).catch(() => {}),
      ])
      setScenario(text)
      setLoading(false)
    }
    init()
  }, [])

  const details = [
    { icon: '🎯', label: 'Тип', value: data.dateType },
    { icon: '🍽', label: 'Їжа', value: data.food?.join(', ') },
    { icon: '🥂', label: 'Напої', value: data.drinks?.join(', ') },
    { icon: '🚗', label: 'Транспорт', value: data.transport },
    { icon: '📅', label: 'Дата', value: formatDate(data.date) },
    { icon: '⏰', label: 'Час', value: data.time },
    { icon: '📍', label: 'Місце зустрічі', value: data.location },
  ]

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '60px 24px', position: 'relative', overflow: 'hidden' }}>
      {CONFETTI.map((c, i) => (
        <motion.span
          key={i}
          style={{ position: 'fixed', left: `${5 + i * 12}%`, top: '-5%', fontSize: '24px', pointerEvents: 'none', userSelect: 'none' }}
          animate={{ y: ['0vh', '110vh'], rotate: [0, 360], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 4 + i * 0.5, repeat: Infinity, delay: i * 0.4, ease: 'linear' }}
        >
          {c}
        </motion.span>
      ))}

      <motion.div
        style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '520px', margin: '0 auto' }}
        initial={{ opacity: 0, scale: 0.85, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
      >
        {/* Card */}
        <div style={{
          borderRadius: '28px',
          border: '1px solid rgba(255,255,255,0.2)',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.11), rgba(255,255,255,0.04))',
          backdropFilter: 'blur(20px)',
          position: 'relative',
          padding: '48px 40px',
        }}>
          {/* Top glow */}
          <div style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '28px',
            opacity: 0.18,
            pointerEvents: 'none',
            background: `radial-gradient(circle at 50% 0%, ${accent}, transparent 60%)`,
          }} />

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '32px', position: 'relative', zIndex: 1 }}>
            <motion.div
              style={{ fontSize: '72px', marginBottom: '20px' }}
              animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              💌
            </motion.div>
            <h2 className="font-playfair" style={{ fontSize: '36px', fontWeight: 700, color: 'white', marginBottom: '8px' }}>
              Іринко, чекаю тебе!
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '16px' }}>Будь готова о {data.time} 🌹</p>
          </div>

          {/* Divider */}
          <div style={{ width: '64px', height: '1px', background: accent, margin: '0 auto 32px' }} />

          {/* Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '32px', position: 'relative', zIndex: 1 }}>
            {details.map((row, i) => (
              <motion.div
                key={row.label}
                style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
              >
                <span style={{ fontSize: '24px', flexShrink: 0, marginTop: '2px' }}>{row.icon}</span>
                <div>
                  <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', display: 'block' }}>{row.label}</span>
                  <p style={{ color: 'rgba(255,255,255,0.92)', fontWeight: 500, fontSize: '17px', marginTop: '3px', lineHeight: 1.4 }}>{row.value}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Divider */}
          <div style={{ width: '100%', height: '1px', background: `${accent}35`, marginBottom: '28px', position: 'relative', zIndex: 1 }} />

          {/* AI Scenario */}
          <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
            {loading ? (
              <motion.div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {[0, 1, 2].map(i => (
                    <motion.span
                      key={i}
                      style={{ width: '8px', height: '8px', borderRadius: '50%', background: accent, display: 'inline-block' }}
                      animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.3, 0.8] }}
                      transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                    />
                  ))}
                </div>
                <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '14px', fontStyle: 'italic' }}>складаю твій сценарій вечора...</p>
              </motion.div>
            ) : (
              <motion.p
                className="font-playfair"
                style={{ color: accent, fontSize: '18px', fontStyle: 'italic', lineHeight: 1.7 }}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.0 }}
              >
                {scenario}
              </motion.p>
            )}
          </div>
        </div>

        <motion.p
          style={{ textAlign: 'center', color: 'rgba(255,255,255,0.25)', fontSize: '14px', marginTop: '24px' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          з нетерпінням чекаю 🌹
        </motion.p>
      </motion.div>
    </div>
  )
}
