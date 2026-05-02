import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./AdminLogin.css";

function AdminLogin() {
  const [formData, setFormData] = useState({
    login: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const result = await login(formData.login, formData.password);

    if (result.success) {
      navigate("/admin/dashboard");
    } else {
      setError(result.error || "Помилка авторизації");
    }

    setIsLoading(false);
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <h1>Адмін-панель</h1>
        <p className="admin-login-subtitle">Вхід для адміністраторів СТО</p>

        <form onSubmit={handleSubmit} className="admin-login-form">
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="login">Логін</label>
            <input
              id="login"
              type="text"
              required
              placeholder="admin"
              value={formData.login}
              onChange={(e) =>
                setFormData({ ...formData, login: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Пароль</label>
            <input
              id="password"
              type="password"
              required
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>

          <button
            type="submit"
            className="admin-login-btn"
            disabled={isLoading}
          >
            {isLoading ? "Вхід..." : "Увійти"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
