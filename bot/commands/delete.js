const { deleteSchedule } = require('../../services/scheduleService');

module.exports = (bot) => {
  bot.command('delete', async (ctx) => {
    const userId = String(ctx.from.id);
    const parts = ctx.message.text.split(' ');

    if (parts.length !== 2) {
      ctx.reply('Используй формат: /delete YYYY-MM-DD');
      return;
    }

    const date = parts[1];
    await deleteSchedule(userId, date);
    ctx.reply(`Удалено расписание на ${date}.`);
  });
};
