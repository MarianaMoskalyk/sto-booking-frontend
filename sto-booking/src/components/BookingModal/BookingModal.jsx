import { useState, useEffect } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import uk from "date-fns/locale/uk";
import "./BookingModal.css";

registerLocale("uk", uk);

const ALL_SLOTS = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];
const formatPhone = (value) => {
  const cleaned = value.replace(/\D/g, "").slice(0, 9);

  const part1 = cleaned.slice(0, 2) || "__";
  const part2 = cleaned.slice(2, 5) || "___";
  const part3 = cleaned.slice(5, 7) || "__";
  const part4 = cleaned.slice(7, 9) || "__";

  return `+380 (${part1}) ${part2}-${part3}-${part4}`;
};
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ✅ Отримання зайнятих годин з API
  useEffect(() => {
    const fetchBookedSlots = async () => {
      setIsLoadingSlots(true);

      try {
        const selectedDate = formData.date.toISOString().split("T")[0];

        const response = await fetch(
          `https://nondramatic-absolvable-karter.ngrok-free.dev/api/booked-slots?date=${selectedDate}`,
        );

        const bookedSlots = await response.json();

        const slotsWithStatus = ALL_SLOTS.map((slot) => ({
          time: slot,
          booked: bookedSlots.includes(slot),
        }));

        setAvailableSlots(slotsWithStatus);
      } catch (error) {
        console.error("API ще не готове, використовуємо mock");

        // ✅ Поки БД нема — всі години вільні
        const mockSlots = ALL_SLOTS.map((slot) => ({
          time: slot,
          booked: false,
        }));

        setAvailableSlots(mockSlots);
      } finally {
        setIsLoadingSlots(false);
      }
    };

    fetchBookedSlots();
  }, [formData.date]);
  /*useEffect(() => {
    const fetchBookedSlots = async () => {
      setIsLoadingSlots(true);

      try {
        const selectedDate = formData.date.toISOString().split("T")[0];

        const response = await fetch(
          `https://nondramatic-absolvable-karter.ngrok-free.dev/api/booked-slots?date=${selectedDate}`,
        );

        const bookedSlots = await response.json();

        const slotsWithStatus = ALL_SLOTS.map((slot) => ({
          time: slot,
          booked: bookedSlots.includes(slot),
        }));

        setAvailableSlots(slotsWithStatus);
      } catch (error) {
        console.error("Помилка отримання слотів:", error);

        // fallback якщо API недоступне
        const fallbackSlots = ALL_SLOTS.map((slot) => ({
          time: slot,
          booked: false,
        }));

        setAvailableSlots(fallbackSlots);
      } finally {
        setIsLoadingSlots(false);
      }
    };

    fetchBookedSlots();
  }, [formData.date]);*/

  // ✅ Створення запису через API
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.time) {
      alert("Оберіть вільний час");
      return;
    }

    setIsSubmitting(true);

    const payload = {
      ...formData,
      service: typeof service === "object" ? service.title : service,
      date: formData.date.toISOString().split("T")[0],
    };

    try {
      const response = await fetch("https://nondramatic-absolvable-karter.ngrok-free.dev/api/createOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Помилка створення запису");
      }

      alert("Запис успішно створено!");
      onClose();
    } catch (error) {
      console.error("Помилка запису:", error);
      alert("Не вдалося створити запис");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-button" onClick={onClose}>
          ✕
        </button>

        <header className="modal-header">
          <h2>
            Запис на: {typeof service === "object" ? service.title : service}
          </h2>
          <p>Оберіть зручний час для візиту на СТО</p>
        </header>

        <form onSubmit={handleSubmit} className="booking-form">
          <div className="calendar-container">
            <DatePicker
              selected={formData.date}
              onChange={(date) => setFormData({ ...formData, date, time: "" })}
              inline
              locale="uk"
              minDate={new Date()}
              dateFormat="dd/MM/yyyy"
            />
          </div>

          <div className="time-section">
            <h4>Години на {formData.date.toLocaleDateString("uk-UA")}:</h4>

            <div className="time-slots">
              {isLoadingSlots ? (
                <p>Завантаження годин...</p>
              ) : (
                availableSlots.map((slot) => (
                  <button
                    key={slot.time}
                    type="button"
                    disabled={slot.booked}
                    className={`time-chip ${
                      slot.booked ? "disabled" : ""
                    } ${formData.time === slot.time ? "active" : ""}`}
                    onClick={() =>
                      !slot.booked &&
                      setFormData({ ...formData, time: slot.time })
                    }
                  >
                    {slot.time}
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
              type="tel"
              placeholder="+380 (__) ___-__-__"
              value={formData.phone ? formatPhone(formData.phone) : ""}
              onChange={(e) => {
                let value = e.target.value;

                value = value.replace(/\D/g, "");

                if (value.startsWith("380")) value = value.slice(3);

                if (value.length > 9) value = value.slice(0, 9);

                setFormData({ ...formData, phone: value });
              }}
            />
          </div>

          <button
            type="submit"
            className="submit-btn"
            disabled={!formData.time || !formData.name || isSubmitting}
          >
            {isSubmitting ? "Створення..." : "Підтвердити запис"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default BookingModal;
