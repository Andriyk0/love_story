const BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN
const CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID

export async function sendToTelegram(data) {
  if (!BOT_TOKEN || !CHAT_ID) return

  const msg = `
💌 *Іринка відповіла на запрошення!*

🎯 *Тип побачення:* ${data.dateType}
🍽 *Їжа:* ${data.food.join(', ')}
🥂 *Напої:* ${data.drinks.join(', ')}
🚗 *Транспорт:* ${data.transport}
📅 *Дата:* ${data.date}
⏰ *Час:* ${data.time}
📍 *Місце зустрічі:* ${data.location}

_Готуйся! 🌹_
`.trim()

  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: msg,
      parse_mode: 'Markdown',
    }),
  })
}
