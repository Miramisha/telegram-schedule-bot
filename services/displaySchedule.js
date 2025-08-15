// services/displaySchedule.js
const { getSchedule, getScheduleByRange } = require('./scheduleService');
const dayjs = require('dayjs');

async function showFullSchedule(ctx) {
  const userId = String(ctx.from.id);
  const schedule = await getSchedule(userId);
  if (!schedule || Object.keys(schedule).length === 0) {
    ctx.reply('Расписание пустое.');
    return;
  }
  let msg = '📋 Ваше полное расписание:\n\n';
  for (const date in schedule) {
    msg += `${date}: ${schedule[date]}\n`;
  }
  ctx.reply(msg);
}

async function showScheduleWeek(ctx) {
  const userId = String(ctx.from.id);
  const start = dayjs().format('YYYY-MM-DD');
  const end = dayjs().add(7, 'day').format('YYYY-MM-DD');
  const schedule = await getScheduleByRange(userId, start, end);
  if (!schedule || Object.keys(schedule).length === 0) {
    ctx.reply('Нет расписания на ближайшую неделю.');
    return;
  }
  let msg = '📅 Расписание на ближайшую неделю:\n\n';
  for (const date in schedule) {
    msg += `${date}: ${schedule[date]}\n`;
  }
  ctx.reply(msg);
}

// Вот добавляем новую функцию на месяц
async function showScheduleMonth(ctx) {
  const userId = String(ctx.from.id);
  const start = dayjs().format('YYYY-MM-DD');
  const end = dayjs().add(30, 'day').format('YYYY-MM-DD');
  const schedule = await getScheduleByRange(userId, start, end);
  if (!schedule || Object.keys(schedule).length === 0) {
    ctx.reply('Нет расписания на ближайший месяц.');
    return;
  }
  let msg = '🗓 Расписание на ближайший месяц:\n\n';
  for (const date in schedule) {
    msg += `${date}: ${schedule[date]}\n`;
  }
  ctx.reply(msg);
}

// И функция на год
async function showScheduleYear(ctx) {
  const userId = String(ctx.from.id);
  const start = dayjs().format('YYYY-MM-DD');
  const end = dayjs().add(1, 'year').format('YYYY-MM-DD');
  const schedule = await getScheduleByRange(userId, start, end);
  if (!schedule || Object.keys(schedule).length === 0) {
    ctx.reply('Нет расписания на ближайший год.');
    return;
  }
  let msg = '📆 Расписание на ближайший год:\n\n';
  for (const date in schedule) {
    msg += `${date}: ${schedule[date]}\n`;
  }
  ctx.reply(msg);
}

module.exports = {
  showFullSchedule,
  showScheduleWeek,
  showScheduleMonth,
  showScheduleYear,
};
