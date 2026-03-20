📅 Tutka Tamka – Frontend
Клієнтська частина системи онлайн-бронювання для СТО. Забезпечує швидкий та інтуїтивний інтерфейс для запису на послуги.

⚙️Функціонал
1.Перегляд списку послуг
2.Вибір дати та часу
3.Створення бронювання
4.Валідація форм на клієнті

🛠 Технології
React
Fetch API
CSS
Vite

📁 Структура проекту
src/
 ├── assets/        # Статичні файли (зображення, іконки)
 ├── components/    # UI-компоненти
 ├── pages/         # Сторінки додатку
 ├── services/      # API-запити
 ├── App.jsx        # Головний компонент
 └── main.jsx       # Точка входу

🚀Локальний запуск
Клонування репозиторію:
[git clone https://github.com/MarianaMoskalyk/sto-booking-frontend]
cd sto-booking

Встановлення залежностей:
npm install

Запуск:
npm run dev

Додаток буде доступний на http://localhost:5173.

📡Інтеграція з API
// Створення бронювання
const createBooking = async (data) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/appointments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return response.json();
};
Метод	Endpoint	Опис
GET	/api/services	Список послуг
GET	/api/slots?serviceId=1	Вільні слоти
POST	/api/appointments	Створення бронювання

👨‍💻 Автор
Frontend: [Mariana Moskalyk]
