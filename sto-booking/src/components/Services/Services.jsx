import "./Services.css";
// Імпортуйте свої картинки тут (якщо вони в assets/img)
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
  return (
    <section className="services">
      <div className="services-grid">
        {services.map((item) => (
          <div key={item.id} className="service-card">
            <div className="card-image">
              <img src={item.img} alt={item.title} />
            </div>
            <div className="card-content">
              <h3>{item.title}</h3>
              <button className="select-btn">ОБРАТИ</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Services;
