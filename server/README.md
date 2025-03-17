# MERN CSV App - Server

Серверна частина застосунка для роботи з CSV файлами.

## Технології

- Node.js
- Express
- TypeScript
- MongoDB
- JWT аутентифікація

## Налаштування

1. Встановіть залежності:
```bash
npm install
```

2. Створіть файл `.env` в корені серверного проекту:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/mern-csv-app
JWT_SECRET=your_jwt_secret
```

3. Переконайтесь що MongoDB запущена локально або вкажіть правильний MONGO_URI

## Запуск

Для розробки:
```bash
npm run dev
```

Для production:
```bash
npm run build
npm start
```

## API Endpoints

### Авторизація
- `POST /api/auth/login` - авторизація користувача
- `GET /api/auth/user` - отримання даних користувача

### Дані
- `GET /api/data` - отримання всіх записів
- `POST /api/data/upload` - завантаження CSV файлу

## Структура проекту

```
src/
  ├── middleware/    # Express middleware
  ├── models/       # Mongoose моделі
  ├── routes/       # API маршрути
  ├── types/        # TypeScript типи
  └── index.ts      # Точка входу
```

## Обмеження

- Максимальний розмір CSV файлу: 10MB
- Підтримуються роздільники: кома (,), крапка з комою (;), табуляція (\t)

## База даних

Застосунок використовує MongoDB для зберігання:
- Даних користувачів
- Даних з CSV файлів

При завантаженні нового CSV файлу старі дані видаляються.
