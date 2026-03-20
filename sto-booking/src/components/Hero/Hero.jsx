import "./Hero.css";
function Hero() {
  const scrollToServices = () => {
    const servicesSection = document.getElementById("services");
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <h1>
            Швидкий онлайн запис на <span>сервісне обслуговування</span>
          </h1>
          <p>
            Врятуємо ваше авто від невідомого <span>(хрусь)</span> та
            незрозумілих вібрацій!
          </p>
          <button
            className="main-btn"
            onClick={scrollToServices}
            style={{ cursor: "pointer" }}
          >
            ЗАПИСАТИСЬ
          </button>
        </div>
      </div>
      <div
        className="scroll-indicator"
        onClick={scrollToServices}
        style={{ cursor: "pointer" }}
      >
        <span className="arrow-down">︾</span>
        <span className="scroll-text">НАШІ ПОСЛУГИ</span>
        <span className="arrow-down">︾</span>
      </div>
    </section>
  );
}

export default Hero;
