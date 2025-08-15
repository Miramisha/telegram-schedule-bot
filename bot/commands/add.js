// bot/commands/add.js
const { addDay } = require('../../services/scheduleService');

module.exports = (bot) => {
  bot.command('add', async (ctx) => {
    const text = ctx.message.text;
    const match = text.match(/^\/add (\d{4}-\d{2}-\d{2}) (.+)$/);

    if (!match) {
      return ctx.reply('Пожалуйста, используйте формат:\n/add YYYY-MM-DD Текст события');
    }

    const [, date, eventText] = match;
    const userId = String(ctx.from.id);

    try {
      await addDay(userId, date, eventText);
      ctx.reply(`✅ Событие добавлено: ${date} — ${eventText}`);
    } catch (error) {
      console.error('Ошибка при добавлении события:', error);
      ctx.reply('❌ Не удалось сохранить событие. Попробуйте еще раз.');
    }
  });
};

