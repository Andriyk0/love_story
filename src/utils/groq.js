const API_KEY = import.meta.env.VITE_GROQ_API_KEY

const SYSTEM_PROMPT = `Ти — автор романтичних повідомлень українською мовою.
Правила:
- Пиши виключно грамотною літературною українською мовою
- Жодних граматичних або орфографічних помилок
- Не використовуй суржик, русизми чи кальки з російської
- Відповідай лише текстом — без лапок, без пояснень, без заголовків`

async function ask(userPrompt, maxTokens = 120) {
  if (!API_KEY) return null
  try {
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userPrompt },
        ],
        max_tokens: maxTokens,
        temperature: 0.7,
      }),
    })
    const json = await res.json()
    return json.choices?.[0]?.message?.content?.trim() || null
  } catch {
    return null
  }
}

export async function generateReaction(step, value) {
  const prompts = {
    dateType: `Дівчина Іринка обрала тип побачення: "${value}". Напиши одне речення — ніжну, трохи грайливу реакцію від закоханого хлопця. Максимум 12 слів.`,
    food: `Іринка обрала їжу: ${value}. Напиши одне речення — коротку, тепло-грайливу реакцію хлопця. Максимум 12 слів.`,
    drinks: `Іринка обрала напої: ${value}. Напиши одне речення — ніжну реакцію хлопця. Максимум 12 слів.`,
    transport: `Іринка обрала транспорт: "${value}". Напиши одне речення — захоплену або романтичну реакцію хлопця. Максимум 12 слів.`,
  }

  const fallbacks = {
    dateType: 'Ідеальний вибір — саме такою я тебе і уявляв ✨',
    food: 'Мій смак збігається з твоїм — це знак 😏',
    drinks: 'Чудовий вибір, будемо смакувати разом 🥂',
    transport: 'Тоді чекай — заберу з вітерцем! 🌪',
  }

  const result = await ask(prompts[step], 80)
  return result || fallbacks[step]
}

export async function generateScenario(data) {
  const prompt = `Напиши романтичний міні-сценарій побачення (3 речення) для дівчини Іринки від імені хлопця.
Деталі побачення: тип — ${data.dateType}, їжа — ${data.food?.join(', ')}, напої — ${data.drinks?.join(', ')}, транспорт — ${data.transport}, дата — ${data.date}, час — ${data.time}.
Вимоги: ніжний та щирий тон, конкретні деталі з переліку вище, від першої особи однини. Лише текст сценарію.`

  const fallback = `Рівно о ${data.time} я вже буду чекати на тебе — і ми разом вирушимо в цей особливий вечір. Кожна деталь продумана для тебе: ${data.dateType?.toLowerCase()} побачення, де тобі буде затишно й радісно. Ти заслуговуєш на найкраще, Іринко 🌹`

  const result = await ask(prompt, 220)
  return result || fallback
}
