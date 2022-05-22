import 'dotenv/config'
import Telebot from "telebot";

const token = process.env.TELEGRAM_BOT_TOKEN || ''
const bot = new Telebot(token)
bot.start()

export { bot }