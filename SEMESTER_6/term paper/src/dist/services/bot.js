"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bot = void 0;
require("dotenv/config");
const telebot_1 = __importDefault(require("telebot"));
const token = process.env.TELEGRAM_BOT_TOKEN || '';
const bot = new telebot_1.default(token);
exports.bot = bot;
bot.start();
