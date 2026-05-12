import { useEffect, useState } from "react";
import Table from "../../components/Admin/Table";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3030/api/bookings")
      .then((res) => res.json())
      .then((data) => setBookings(data))
      .catch((err) => console.error("Помилка завантаження:", err));
  }, []);

  const headers = ["Клієнт", "Послуга", "Дата", "Час", "Статус"];

  return (
    <div>
      <h1>Управління записами</h1>

      {/* Шапка з пошуком та кнопкою як на макеті */}
      <div className="table-header">
        <div className="search-container">
          <input
            type="text"
            placeholder="🔍 Пошук запису"
            className="search-input"
          />
        </div>
        <button className="action-btn">Редагувати записи</button>
      </div>

      {/* Контейнер таблиці з білим фоном */}
      <div className="table-container">
        <h2>Останні записи</h2>
        <Table
          headers={headers}
          data={bookings}
          renderRow={(booking) => (
            <tr key={booking.id}>
              <td>{booking.client}</td>
              <td>{booking.service}</td>
              <td>{booking.date}</td>
              <td>{booking.time}</td>
              <td>
                <span className={`status-${booking.status}`}>
                  {booking.status}
                </span>
              </td>
            </tr>
          )}
        />
        <div className="view-all-link">Переглянути всі</div>
      </div>
    </div>
  );
};

export default Bookings;
