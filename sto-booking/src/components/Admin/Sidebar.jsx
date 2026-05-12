import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="logo" style={{ padding: "20px" }}>
        <span>ТУТКА ТАМКА</span>
        <img
          src={`${import.meta.env.BASE_URL}logo-admin.svg`}
          alt="Тутка Тамка"
        />
      </div>
      <nav>
        <NavLink to="/admin/dashboard">Панель</NavLink>
        <NavLink to="/admin/services">Послуги</NavLink>
        <NavLink to="/admin/bookings">Записи</NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
