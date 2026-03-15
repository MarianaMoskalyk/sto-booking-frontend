import "./Navbar.css";

function Navbar() {
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

      <button className="service-btn">ОБРАТИ ПОСЛУГУ</button>
    </header>
  );
}

export default Navbar;
