const cron = require('node-cron');
const { getAllUsers, getSchedule } = require('./scheduleService');

function startNotifications(bot) {
  cron.schedule('0 9 * * *', async () => {
    const today = new Date().toISOString().split('T')[0];
    const users = await getAllUsers();
    for (const userId of users) {
      const schedule = await getSchedule(userId);
      if (schedule[today]) {
        await bot.telegram.sendMessage(userId, `🔔 Напоминание на сегодня: ${schedule[today]}`);
      }
    }
  });
}

module.exports = { startNotifications };
