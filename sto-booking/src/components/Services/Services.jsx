import { useState } from "react";
import "./Services.css";
import BookingModal from "../BookingModal/BookingModal";

import img1 from "../../assets/img/1.png";
import img2 from "../../assets/img/2.png";
import img3 from "../../assets/img/3.png";
import img4 from "../../assets/img/4.png";
import img5 from "../../assets/img/5.png";
import img6 from "../../assets/img/6.png";
import img7 from "../../assets/img/7.png";
import img8 from "../../assets/img/8.png";

const services = [
  { id: 1, title: "Діагностика ходової", img: img1 },
  { id: 2, title: "Заміна масла та фільтрів", img: img2 },
  { id: 3, title: "Ремонт гальм. системи", img: img3 },
  { id: 4, title: "Комп'ютерна діагностика", img: img4 },
  { id: 5, title: "Заміна ременів ГРМ", img: img5 },
  { id: 6, title: "Ремонт двигунів", img: img6 },
  { id: 7, title: "Шиномонтаж і балансування", img: img7 },
  { id: 8, title: "Обслуговування кондиціонера", img: img8 },
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
