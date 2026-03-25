import "./Navbar.css";
import logo from "../assets/logo.svg";

function Navbar() {
  const scrollToServices = () => {
    const servicesSection = document.getElementById("services");
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToFooter = () => {
    const footer = document.getElementById("footer");
    if (footer) {
      footer.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="navbar">
      <div className="logo">
        <span>ТУТКА ТАМКА</span>
        <img src={logo} alt="Тутка Тамка" />
      </div>

      <nav>
        <a onClick={scrollToFooter}>Контакти</a>
        <a onClick={scrollToFooter}>Служба підтримки</a>
      </nav>

      <button className="service-btn" onClick={scrollToServices}>
        ОБРАТИ ПОСЛУГУ
      </button>
    </header>
  );
}

export default Navbar;
