📅 Tutka Tamka – Frontend
Frontend частина веб-додатку для онлайн запису на послуги.

Користувач:

обирає послугу
вибирає дату та час
вводить email
отримує підтвердження на пошту
⚠️ Для повної роботи потрібен запущений backend сервер.

🚀 Технології
React
Fetch API
CSS / Tailwind
Vite / Create React App
🔌 API
Frontend працює з backend через REST API.

Приклад запитів:

GET /api/services — отримати список послуг
GET /api/slots?serviceId=1 — отримати вільні слоти
POST /api/appointments — створити запис
Backend повинен бути запущений на: http://localhost:5000

⚙️ Встановлення та запуск
1️⃣ Клонувати репозиторій
git clone https://github.com/username/appointment-frontend.git

cd appointment-frontend

2️⃣ Встановити залежності
npm install

3️⃣ Запустити проєкт
npm run dev

або (якщо CRA)

npm start

Додаток буде доступний на:

http://localhost:5173

📁 Структура
src/ ├── components/ ├── pages/ ├── services/ (API запити) ├── App.jsx └── main.jsx

👨‍💻 Автор
Frontend: [Mariana Moskalyk]
