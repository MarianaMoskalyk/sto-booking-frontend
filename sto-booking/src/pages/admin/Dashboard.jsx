import { useEffect, useState } from "react";
import StatCard from "../../components/Admin/StatCard";
import Table from "../../components/Admin/Table";

const Dashboard = () => {
  const [stats, setStats] = useState({
    today: 0,
    done: 0,
    pending: 0,
    canceled: 0,
  });
  const [recentBookings, setRecentBookings] = useState([]);

  useEffect(() => {
    // Отримуємо статистику (створіть такий ендпоінт на бекенді)
    fetch("http://localhost:3030/api/stats")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error("Помилка статистики:", err));

    // Отримуємо тільки останні 5 записів
    fetch("http://localhost:3030/api/bookings?limit=5")
      .then((res) => res.json())
      .then((data) => setRecentBookings(data))
      .catch((err) => console.error("Помилка записів:", err));
  }, []);

  const headers = ["Номер", "Клієнт", "Послуга", "Дата", "Час", "Статус"];

  return (
    <div>
      <h1>Адмін Панель</h1>

      <div className="stats-grid">
        <StatCard title="Записів сьогодні" value={stats.today} variant="blue" />
        <StatCard title="Виконано" value={stats.done} variant="green" />
        <StatCard title="Очікує" value={stats.pending} variant="yellow" />
        <StatCard title="Скасовано" value={stats.canceled} variant="red" />
      </div>

      <div className="table-container">
        <h2>Останні записи</h2>
        <Table
          headers={headers}
          data={recentBookings}
          renderRow={(item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.client}</td>
              <td>{item.service}</td>
              <td>{item.date}</td>
              <td>{item.time}</td>
              <td>{item.status}</td>
            </tr>
          )}
        />
        <div className="view-all-link">Переглянути всі</div>
      </div>
    </div>
  );
};

export default Dashboard;
