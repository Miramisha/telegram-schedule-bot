// bot/commands/view.js

const { getSchedule } = require('../../services/scheduleService');

module.exports = (bot) => {
  bot.command('view', async (ctx) => {
    const userId = String(ctx.from.id);

    try {
      const schedule = await getSchedule(userId);

      if (!schedule || Object.keys(schedule).length === 0) {
        return ctx.reply('😴 У вас пока нет запланированных дней.');
      }

      // Сортировка по датам
      const sortedDates = Object.keys(schedule).sort();

      let message = '📅 Ваше расписание:\n\n';

      for (const date of sortedDates) {
        message += `${date} — ${schedule[date]}\n`;
      }

      ctx.reply(message);
    } catch (error) {
      console.error('Ошибка при получении расписания:', error);
      ctx.reply('❌ Не удалось получить расписание. Попробуйте позже.');
    }
  });
};

