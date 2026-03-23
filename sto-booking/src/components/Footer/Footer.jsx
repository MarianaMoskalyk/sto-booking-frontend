import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-col brand-col">
          <h2 className="footer-logo">
            <img src="/logo.svg" alt="Тутка Тамка" />
          </h2>
          <p className="slogan">
            Зремонтували тутка — <br />
            <span>газуєш тамка</span>
          </p>
        </div>

        <div className="footer-col">
          <h3>Навігація</h3>
          <ul className="footer-links">
            <li>
              <a href="#home">Головна</a>
            </li>
            <li>
              <a href="#services">Послуги</a>
            </li>
            <li>
              <a href="#contacts">Контакти</a>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Зв'язок</h3>
          <div className="contact-info">
            <p>📍 м. Тернопіль</p>
            <p>
              📞 <a href="tel:+380000000000">+380 00 000 00 00</a>
            </p>
            <p>
              ✉️ <a href="mailto:TutkaTamka@gmail.com">TutkaTamka@gmail.com</a>
            </p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="bottom-content">
          <p>© {new Date().getFullYear()} Tutka Tamka. Всі права захищені.</p>
          <div className="developer-tag">Developed by the CoreFive team</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
