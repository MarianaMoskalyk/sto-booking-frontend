import "./Navbar.css";

function Navbar() {
  const scrollToServices = () => {
    const servicesSection = document.getElementById("services"); // ID секції, куди скролити
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <header className="navbar">
      <div className="logo">
        <span>ТУТКА ТАМКА</span>
        <img src="/logo.svg" alt="Тютка Тамка" />
      </div>

      <nav>
        <a href="#">Контакти</a>
        <a href="#">Служба підтримки</a>
      </nav>

      <button
        className="service-btn"
        onClick={scrollToServices}
        style={{ cursor: "pointer" }}
      >
        ОБРАТИ ПОСЛУГУ
      </button>
    </header>
  );
}

export default Navbar;
