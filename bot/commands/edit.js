const { editSchedule } = require('../../services/scheduleService');

module.exports = (bot) => {
  bot.command('edit', async (ctx) => {
    const userId = String(ctx.from.id);
    const parts = ctx.message.text.split(' ');

    if (parts.length < 3) {
      ctx.reply('Используй формат: /edit YYYY-MM-DD новое описание');
      return;
    }

    const date = parts[1];
    const newText = parts.slice(2).join(' ');

    await editSchedule(userId, date, newText);
    ctx.reply(`Обновлено расписание на ${date}: ${newText}`);
  });
};
