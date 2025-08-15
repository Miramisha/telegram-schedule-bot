require('dotenv').config();
const { Telegraf, Markup } = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN);

const {
  showFullSchedule,
  showScheduleWeek,
  showScheduleMonth,
  showScheduleYear
} = require('./services/displaySchedule');

const {
  addDay,
  deleteSchedule,
  editSchedule
} = require('./services/scheduleService');


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

bot.start((ctx) => {
  ctx.reply('👋 Добро пожаловать! Выберите действие:', {
    reply_markup: {
      keyboard: [
        ['📋 Посмотреть всё расписание'],
        ['➕ Добавить', '❌ Удалить', '✏️ Редактировать'],
        ['📅 Расписание на неделю', '🗓 Расписание на месяц', '📆 Расписание на год']
      ],
      resize_keyboard: true,
      one_time_keyboard: false
    }
  });
});

bot.hears('📋 Посмотреть всё расписание', (ctx) => showFullSchedule(ctx));

bot.hears('📅 Расписание на неделю', (ctx) => showScheduleWeek(ctx));
bot.hears('🗓 Расписание на месяц', (ctx) => showScheduleMonth(ctx));
bot.hears('📆 Расписание на год', (ctx) => showScheduleYear(ctx));

bot.hears('➕ Добавить', (ctx) => {
  const userId = String(ctx.from.id);
  userStates[userId] = 'adding';
  ctx.reply('Введите дату и событие:\n📅 Пример: `2025-08-15 Встреча с клиентом`', { parse_mode: 'Markdown' });
});

bot.hears('❌ Удалить', (ctx) => {
  const userId = String(ctx.from.id);
  userStates[userId] = 'deleting';
  ctx.reply('Введите дату события, которое хотите удалить:\n📅 Пример: `2025-08-15`', { parse_mode: 'Markdown' });
});

bot.hears('✏️ Редактировать', (ctx) => {
  const userId = String(ctx.from.id);
  userStates[userId] = 'editing';
  ctx.reply('Введите дату и новое описание:\n📅 Пример: `2025-08-15 Новая встреча`', { parse_mode: 'Markdown' });
});

bot.on('text', async (ctx) => {
  const userId = String(ctx.from.id);
  const state = userStates[userId];

  if (!state) return; // Если пользователь не в режиме ожидания — ничего не делаем

  const message = ctx.message.text;

  try {
    if (state === 'adding') {
      const match = message.match(/^(\d{4}-\d{2}-\d{2}) (.+)$/);
      if (!match) {
        return ctx.reply('❗ Формат неверный. Введите так:\n`YYYY-MM-DD Текст события`', { parse_mode: 'Markdown' });
      }

      const [, date, event] = match;
      await addDay(userId, date, event);
      ctx.reply(`✅ Добавлено: ${date} — ${event}`);

    } else if (state === 'deleting') {
      const dateMatch = message.match(/^\d{4}-\d{2}-\d{2}$/);
      if (!dateMatch) {
        return ctx.reply('❗ Введите только дату: `YYYY-MM-DD`', { parse_mode: 'Markdown' });
      }

      await deleteSchedule(userId, message);
      ctx.reply(`🗑 Удалено событие на ${message}`);

    } else if (state === 'editing') {
      const match = message.match(/^(\d{4}-\d{2}-\d{2}) (.+)$/);
      if (!match) {
        return ctx.reply('❗ Формат неверный. Введите так:\n`YYYY-MM-DD Новый текст`', { parse_mode: 'Markdown' });
      }

      const [, date, newText] = match;
      await editSchedule(userId, date, newText);
      ctx.reply(`✏️ Обновлено: ${date} — ${newText}`);
    }
  } catch (error) {
    console.error('Ошибка при обработке действия:', error);
    ctx.reply('❌ Произошла ошибка. Попробуйте снова.');
  }

  delete userStates[userId]; // Сбросить состояние
});

const userStates = {}; // Для хранения текущего действия пользователя

bot.launch();
console.log('🤖 Бот запущен');


