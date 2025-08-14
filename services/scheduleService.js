const { Low } = require('lowdb');
const { JSONFile } = require('lowdb/node');
const path = require('path');

// Путь к файлу базы данных
const file = path.join(__dirname, '../data/schedules.json');
const adapter = new JSONFile(file);

// 💡 Передаём defaultData при создании базы — это обязательно с lowdb v5+
const db = new Low(adapter, { schedules: {} });

// Инициализация базы данных
async function init() {
  await db.read();

  // Если база пустая — создаём начальные данные
  if (!db.data) {
    db.data = { schedules: {} };
    await db.write();
  }

  // Дополнительная проверка: если schedules отсутствует
  if (!db.data.schedules) {
    db.data.schedules = {};
    await db.write();
  }
}



// Добавить расписание
async function addDay(userId, date, text) {
  await init();

  if (!db.data.schedules[userId]) {
    db.data.schedules[userId] = {};
  }

  db.data.schedules[userId][date] = text;
  await db.write();
}

async function getSchedule(userId) {
  await init();

  // Безопасная проверка
  if (!db.data.schedules) {
    db.data.schedules = {};
  }

  return db.data.schedules[userId] || {};
}


// Получить всех пользователей
async function getAllUsers() {
  await init();
  return Object.keys(db.data.schedules);
}

module.exports = {
  addDay,
  getSchedule,
  getAllUsers,
};

