require('dotenv').config();
const { Telegraf } = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN);

require('./bot/commands/start')(bot);
require('./bot/commands/add')(bot);
require('./bot/commands/view')(bot);

bot.launch();
console.log('🤖 Бот запущен');

