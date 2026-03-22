import { useState } from "react";
import "./Services.css";
import BookingModal from "../BookingModal/BookingModal";

import imgService from "../../assets/img/service.png";

const services = [
  { id: 1, title: "Діагностика ходової", img: imgService },
  { id: 2, title: "Заміна масла та фільтрів", img: imgService },
  { id: 3, title: "Ремонт гальм. системи", img: imgService },
  { id: 4, title: "Комп'ютерна діагностика", img: imgService },
  { id: 5, title: "Заміна ременів ГРМ", img: imgService },
  { id: 6, title: "Ремонт двигунів", img: imgService },
  { id: 7, title: "Шиномонтаж і балансування", img: imgService },
  { id: 8, title: "Обслуговування кондиціонера", img: imgService },
];

function Services() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const handleOpen = (serviceObj) => {
    setSelectedService(serviceObj);
    setIsOpen(true);
  };
  return (
    <section id="services" className="services">
      <div className="services-grid">
        {services.map((item) => (
          <div key={item.id} className="service-card">
            <div className="card-image">
              <img src={item.img} alt={item.title} />
            </div>
            <div className="card-content">
              <h3>{item.title}</h3>
              <button className="select-btn" onClick={() => handleOpen(item)}>
                ОБРАТИ
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* МОДАЛКА */}
      {isOpen && (
        <BookingModal
          service={selectedService}
          onClose={() => setIsOpen(false)}
        />
      )}
    </section>
  );
}

export default Services;
