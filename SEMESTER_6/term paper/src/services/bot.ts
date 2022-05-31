import 'dotenv/config'
import Telebot from "telebot";

const token = process.env.TELEGRAM_BOT_TOKEN || ''
const bot = new Telebot({
  token,
      webhook: { 
        url: 'https://damp-bastion-26170.herokuapp.com', // HTTPS url to send updates to.
        host: '0.0.0.0', // Webhook server host.
        port: Number(process.env.PORT as string) || 5000, // Server port.
    },
})
bot.start()

export { bot }