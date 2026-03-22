import { useState, useEffect } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import uk from "date-fns/locale/uk";
import "./BookingModal.css";

registerLocale("uk", uk);

function BookingModal({ service, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: new Date(),
    time: "",
  });

  const [availableSlots, setAvailableSlots] = useState([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);

  useEffect(() => {
    setIsLoadingSlots(true);
    // Імітація запиту до бази даних
    setTimeout(() => {
      const mockSlots = ["10:00", "11:00", "13:00", "15:00", "17:00"];
      setAvailableSlots(mockSlots);
      setIsLoadingSlots(false);
    }, 500);
  }, [formData.date, service]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Дані для збереження:", {
      service: typeof service === "object" ? service.title : service,
      ...formData,
    });
    alert("Запис успішно створено!");
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-button" onClick={onClose}>
          ✕
        </button>

        <header className="modal-header">
          {/* Динамічний запис назви послуги */}
          <h2>
            Запис на: {typeof service === "object" ? service.title : service}
          </h2>
          <p>Оберіть зручний час для візиту на СТО</p>
        </header>

        <form onSubmit={handleSubmit} className="booking-form">
          {/* Повнорозмірний календар */}
          <div className="calendar-container">
            <DatePicker
              selected={formData.date}
              onChange={(date) => setFormData({ ...formData, date, time: "" })}
              inline // Робить календар відкритим постійно
              locale="uk"
              minDate={new Date()}
              dateFormat="dd/MM/yyyy"
            />
          </div>

          <div className="time-section">
            <h4>
              Вільні години на {formData.date.toLocaleDateString("uk-UA")}:
            </h4>
            <div className="time-slots">
              {isLoadingSlots ? (
                <p>Завантаження годин...</p>
              ) : (
                availableSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    className={`time-chip ${formData.time === slot ? "active" : ""}`}
                    onClick={() => setFormData({ ...formData, time: slot })}
                  >
                    {slot}
                  </button>
                ))
              )}
            </div>
          </div>

          <div className="input-group">
            <input
              required
              type="text"
              placeholder="Ваше ім'я"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <input
              required
              type="email"
              placeholder="Ваш Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <input
              required
              type="tel"
              placeholder="+380 (__) ___-__-__"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
          </div>

          <button
            type="submit"
            className="submit-btn"
            disabled={!formData.time || !formData.name}
          >
            Підтвердити запис
          </button>
        </form>
      </div>
    </div>
  );
}

export default BookingModal;
