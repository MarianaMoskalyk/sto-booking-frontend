import { useEffect, useState } from "react";
import Table from "../../components/Admin/Table";

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3030/api/services")
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch((err) => console.error("Помилка завантаження послуг:", err));
  }, []);

  const headers = ["ID", "Назва послуги", "Ціна", "Опис"];

  return (
    <div>
      <h1>Управління послугами</h1>

      <div className="table-header">
        <div className="search-container">
          <input
            type="text"
            placeholder="🔍 Пошук послуги"
            className="search-input"
          />
        </div>
        <button className="action-btn">Додати послугу</button>
      </div>

      <div className="table-container">
        <h2>Список послуг</h2>
        <Table
          headers={headers}
          data={services}
          renderRow={(service) => (
            <tr key={service.id}>
              <td>{service.id}</td>
              <td>{service.name}</td>
              <td>{service.price} грн</td>
              <td>{service.description}</td>
            </tr>
          )}
        />
      </div>
    </div>
  );
};

export default Services;
