import "./Hero.css";
function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <h1>
            Швидкий онлайн запис на <span>сервісне обслуговування</span>
          </h1>
          <p>
            Врятуємо ваше авто від невідомого (хрусь) та незрозумілих вібрацій!
          </p>
          <button className="main-btn">ЗАПИСАТИСЬ</button>
        </div>
      </div>
      <div className="scroll-indicator">
        <span className="arrow-down">︾</span>
        <span className="scroll-text">НАШІ ПОСЛУГИ</span>
        <span className="arrow-down">︾</span>
      </div>
    </section>
  );
}

export default Hero;
