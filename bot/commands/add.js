// bot/commands/add.js

const { addDay } = require('../../services/scheduleService');

module.exports = (bot) => {
  bot.command('add', async (ctx) => {
    const userId = String(ctx.from.id);
    const message = ctx.message.text;

    // Удалим "/add" из текста, чтобы осталась только дата и описание
    const [, ...params] = message.split(' ');
    const [date, ...textParts] = params;

    if (!date || textParts.length === 0) {
      return ctx.reply('❗ Использование: /add ГГГГ-ММ-ДД описание события');
    }

    const text = textParts.join(' ');

    try {
      await addDay(userId, date, text);
      ctx.reply(`✅ Событие добавлено на ${date}: ${text}`);
    } catch (error) {
      console.error('Ошибка при добавлении события:', error);
      ctx.reply('❌ Не удалось сохранить событие. Попробуйте ещё раз.');
    }
  });
};
