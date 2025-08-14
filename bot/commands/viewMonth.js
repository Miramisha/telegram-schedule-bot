const { Telegraf } = require('telegraf');
const { getScheduleByRange } = require('../../services/scheduleService');
const dayjs = require('dayjs');

module.exports = (bot) => {
  bot.command('viewweek', async (ctx) => {
    const userId = String(ctx.from.id);
    const start = dayjs().format('YYYY-MM-DD');
    const end = dayjs().add(30, 'day').format('YYYY-MM-DD');

    const schedule = await getScheduleByRange(userId, start, end);

    if (Object.keys(schedule).length === 0) {
      ctx.reply('Нет расписания на ближайший месяц.');
      return;
    }

    let msg = `📅 Расписание на ближайшую неделю:\n\n`;
    for (const date in schedule) {
      msg += `${date}: ${schedule[date]}\n`;
    }
    ctx.reply(msg);
  });
};
