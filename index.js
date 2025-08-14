require('dotenv').config();
const { Telegraf } = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN);

require('./bot/commands/start')(bot);
require('./bot/commands/add')(bot);
require('./bot/commands/view')(bot);
require('./bot/commands/viewWeek')(bot);
require('./bot/commands/viewMonth')(bot);
require('./bot/commands/viewYear')(bot);
require('./bot/commands/delete')(bot);
require('./bot/commands/edit')(bot);


bot.launch();
console.log('🤖 Бот запущен');

