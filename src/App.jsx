import { useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import StepWelcome from './components/StepWelcome'
import StepDateType from './components/StepDateType'
import StepMultiChoice from './components/StepMultiChoice'
import StepTransport from './components/StepTransport'
import StepDateTime from './components/StepDateTime'
import StepLocation from './components/StepLocation'
import StepFinalCard from './components/StepFinalCard'
import StepReaction from './components/StepReaction'
import { FOOD_OPTIONS, DRINK_OPTIONS, DEFAULT_BG } from './data/options'
import { generateReaction } from './utils/groq'

const pageVariants = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -60 },
}

export default function App() {
  const [step, setStep] = useState('welcome')
  const [bg, setBg] = useState(DEFAULT_BG)
  const [reaction, setReaction] = useState({ show: false, message: '', step: '', nextStep: '', emoji: '' })
  const [data, setData] = useState({
    dateType: '',
    food: [],
    drinks: [],
    transport: '',
    date: '',
    time: '',
    location: '',
  })

  // витягує emoji з кінця рядка: "Суші 🍣" → "🍣"
  function extractEmoji(label) {
    return label.trim().split(' ').pop()
  }

  async function showReaction(reactionStep, value, nextStep, emoji) {
    const msg = await generateReaction(reactionStep, Array.isArray(value) ? value.join(', ') : value)
    setReaction({ show: true, message: msg, step: reactionStep, nextStep, emoji })
  }

  const handleReactionDone = useCallback(() => {
    setReaction(r => ({ ...r, show: false }))
    setStep(reaction.nextStep)
  }, [reaction.nextStep])

  async function handleDateType(type) {
    setBg(type.bg)
    setData(d => ({ ...d, dateType: type.label }))
    await showReaction('dateType', type.label, 'food', type.emoji)
  }

  async function handleFood(food) {
    setData(d => ({ ...d, food }))
    const emojis = food.slice(0, 3).map(extractEmoji).join(' ')
    await showReaction('food', food, 'drinks', emojis)
  }

  async function handleDrinks(drinks) {
    setData(d => ({ ...d, drinks }))
    const emojis = drinks.slice(0, 3).map(extractEmoji).join(' ')
    await showReaction('drinks', drinks, 'transport', emojis)
  }

  async function handleTransport(transport) {
    setData(d => ({ ...d, transport }))
    const emoji = transport.split(' ')[0]
    await showReaction('transport', transport, 'datetime', emoji)
  }

  function handleDateTime({ date, time }) {
    setData(d => ({ ...d, date, time }))
    setStep('location')
  }

  function handleLocation(location) {
    setData(d => ({ ...d, location }))
    setStep('final')
  }

  const currentStep = reaction.show ? `reaction-${reaction.step}` : step

  return (
    <div
      style={{ background: `linear-gradient(135deg, ${bg.from} 0%, ${bg.to} 100%)` }}
      className="min-h-screen w-full relative transition-all duration-1000"
    >
      <div
        className="fixed top-0 left-1/4 w-96 h-96 rounded-full pointer-events-none opacity-20 blur-3xl transition-colors duration-1000"
        style={{ background: bg.accent }}
      />
      <div
        className="fixed bottom-0 right-1/4 w-64 h-64 rounded-full pointer-events-none opacity-10 blur-3xl transition-colors duration-1000"
        style={{ background: bg.accent }}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          className="w-full"
        >
          {reaction.show ? (
            <StepReaction
              emoji={reaction.emoji}
              message={reaction.message}
              accent={bg.accent}
              onDone={handleReactionDone}
            />
          ) : (
            <>
              {step === 'welcome' && <StepWelcome onYes={() => setStep('dateType')} />}
              {step === 'dateType' && <StepDateType onSelect={handleDateType} />}
              {step === 'food' && (
                <StepMultiChoice
                  title="Що будемо їсти?"
                  emoji="🍽"
                  subtitle="Можеш обрати кілька варіантів"
                  options={FOOD_OPTIONS}
                  onNext={handleFood}
                  accent={bg.accent}
                />
              )}
              {step === 'drinks' && (
                <StepMultiChoice
                  title="Що будемо пити?"
                  emoji="🥂"
                  subtitle="Обери що тобі до смаку"
                  options={DRINK_OPTIONS}
                  onNext={handleDrinks}
                  accent={bg.accent}
                />
              )}
              {step === 'transport' && <StepTransport onSelect={handleTransport} accent={bg.accent} />}
              {step === 'datetime' && <StepDateTime onNext={handleDateTime} accent={bg.accent} />}
              {step === 'location' && <StepLocation onNext={handleLocation} accent={bg.accent} />}
              {step === 'final' && <StepFinalCard data={data} accent={bg.accent} />}
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
