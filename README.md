# Telegram Schedule Bot

Telegram-бот для ведения и управления расписанием на месяц с возможностью добавления пометок, просмотра расписания и получения оповещений.  
Проект написан на JavaScript с использованием библиотеки [Telegraf](https://telegraf.js.org/) и базы данных `lowdb`.

---

## Возможности

- Добавление событий в расписание с помощью команды `/add`
- Просмотр всех событий с помощью команды `/view`
- Сохранение расписания в локальный JSON-файл
- Простое редактирование и расширение функционала

---

## Установка и запуск

### 1. Клонировать репозиторий

```bash
git clone https://github.com/ТВОЙ_ЮЗЕР/telegram-schedule-bot.git
cd telegram-schedule-bot

### 2. Установить зависимости

npm install


### 3. Создать .env файл и добавить токен бота

Создай файл .env в корне проекта и добавь:

BOT_TOKEN=твой_токен_от_Telegram_BotFather


### 4. Создать папку data и файл базы

mkdir data
echo "{}" > data/schedules.json


### 5. Запустить бота

node index.js

---

Использование команд

    /start — начать работу с ботом

    /add YYYY-MM-DD описание — добавить событие в расписание

    /view — посмотреть все свои события

---

telegram-schedule-bot/
├── bot/
│   └── commands/
│       ├── add.js
│       ├── view.js
│       └── start.js
├── data/
│   └── schedules.json
├── services/
│   └── scheduleService.js
├── .env
├── .gitignore
├── index.js
├── package.json
└── README.md

---

Требования:
    Node.js >= 14
    npm