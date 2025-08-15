require('dotenv').config();
const { Telegraf, Markup } = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN);

const {
  showFullSchedule,
  showScheduleWeek,
  showScheduleMonth,
  showScheduleYear,
} = require('./services/displaySchedule');

require('./bot/commands/start')(bot);
require('./bot/commands/add')(bot);
require('./bot/commands/view')(bot);
require('./bot/commands/viewWeek')(bot);
require('./bot/commands/viewMonth')(bot);
require('./bot/commands/viewYear')(bot);
require('./bot/commands/delete')(bot);
require('./bot/commands/edit')(bot);

bot.start((ctx) => {
  return ctx.reply(
    'Выберите действие:',
    Markup.keyboard([
      ['📋 Посмотреть всё расписание', '📅 Расписание на неделю'],
      ['🗓 Расписание на месяц', '📆 Расписание на год'],
      ['➕ Добавить', '❌ Удалить', '✏️ Редактировать']
    ])
    .resize()
    .oneTime()
  );
});

bot.hears('📋 Посмотреть всё расписание', async (ctx) => {
  await showFullSchedule(ctx);
});

bot.hears('➕ Добавить', (ctx) => {
  ctx.reply('Напишите дату и описание в формате:\nYYYY-MM-DD Текст события');
});

bot.hears('❌ Удалить', (ctx) => {
  ctx.reply('Напишите дату для удаления в формате:\nYYYY-MM-DD');
});

bot.hears('✏️ Редактировать', (ctx) => {
  ctx.reply('Напишите дату и новое описание в формате:\nYYYY-MM-DD Новый текст');
});

bot.hears('📅 Расписание на неделю', async (ctx) => {
  await showScheduleWeek(ctx);
});

bot.hears('🗓 Расписание на месяц', async (ctx) => {
  await showScheduleMonth(ctx);
});

bot.hears('📆 Расписание на год', async (ctx) => {
  await showScheduleYear(ctx);
});

bot.launch();
console.log('🤖 Бот запущен');


