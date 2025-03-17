# MERN CSV Viewer Application

Повнофункціональний веб-додаток для завантаження та перегляду CSV файлів з аутентифікацією користувачів.

## Функціональність

- Аутентифікація користувачів
- Завантаження CSV файлів
- Перегляд даних в табличному форматі
- Віртуалізований скролінг для оптимізації продуктивності
- REST API
- MongoDB для зберігання даних

## Технологічний стек

### Frontend
- React
- TypeScript
- Vite
- React Router
- Axios
- React Window (віртуалізація)

### Backend
- Node.js
- Express
- TypeScript
- MongoDB
- JWT
- Multer (для обробки файлів)
- CSV-to-JSON

## Початок роботи

### Передумови

- Node.js (версія 16 або вище)
- MongoDB (локально або віддалено)
- Git

### Встановлення

1. Клонуйте репозиторій:
```bash
git clone [url-репозиторію]
cd mern-csv-app
```

2. Встановіть залежності для серверної та клієнтської частин:
```bash
# Встановлення залежностей сервера
cd server
npm install

# Встановлення залежностей клієнта
cd ../client
npm install
```

3. Налаштування середовища:

Створіть файл `.env` в папці server:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/mern-csv-app
JWT_SECRET=your_jwt_secret
```

Створіть файл `.env` в папці client:
```
VITE_API_BASE_URL=http://localhost:5000
```

### Запуск

1. Запустіть MongoDB

2. Запустіть сервер (в папці server):
```bash
# Режим розробки
npm run dev

# АБО для production
npm run build
npm start
```

3. Запустіть клієнт (в папці client):
```bash
# Режим розробки
npm run "dev client"

# АБО для production
npm run build
npm run preview
```

## Доступ до додатку

Після запуску:
- Frontend: http://localhost:5173 (в режимі розробки)
- Backend: http://localhost:5000

Дані для входу за замовчуванням:
- Username: admin
- Password: password123

## Обмеження та специфікації

### CSV файли
- Максимальний розмір: 10MB
- Підтримувані роздільники: кома (,), крапка з комою (;), табуляція (\t)
- При завантаженні нового файлу попередні дані видаляються

### Аутентифікація
- JWT токени з терміном дії 1 година
- Необхідна аутентифікація для всіх операцій з даними

## Структура проекту

```
mern-csv-app/
├── client/                 # Frontend React додаток
│   ├── src/
│   │   ├── components/    # React компоненти
│   │   ├── context/      # React контексти
│   │   ├── types/        # TypeScript типи
│   │   └── utils/        # Утиліти
│   └── package.json
│
└── server/                # Backend Express додаток
    ├── src/
    │   ├── middleware/   # Express middleware
    │   ├── models/      # Mongoose моделі
    │   ├── routes/      # API маршрути
    │   ├── types/       # TypeScript типи
    │   └── index.ts     # Точка входу
    └── package.json
```

## API Endpoints

### Аутентифікація
- `POST /api/auth/login` - вхід користувача
- `GET /api/auth/user` - отримання даних користувача

### Дані
- `GET /api/data` - отримання всіх записів
- `POST /api/data/upload` - завантаження CSV файлу

## Ліцензія

[MIT](LICENSE)
