import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Вимикаємо devMode для роботи з реальною апішкою
  const isDevMode = false;

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    const savedToken = localStorage.getItem("adminToken");
    const savedUser = localStorage.getItem("adminUser");

    // Якщо токен є, вважаємо користувача авторизованим (базова перевірка)
    if (savedToken) {
      setToken(savedToken);
      setIsAuthenticated(true);
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    }
    setLoading(false);
  };

  const login = async (loginName, password) => {
    try {
      // 1. ПЕРЕД ЛОГІНОМ ОБОВ'ЯЗКОВО ОЧИЩАЄМО СТАРІ ДАНІ
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminUser");

      // DEV MODE (для локальних тестів)
      if (isDevMode) {
        if (loginName === "admin" && password === "admin") {
          const mockData = {
            token: "fake-jwt-token",
            user: { id: 1, name: "Admin" },
          };
          saveAuthData(mockData.token, mockData.user);
          return { success: true };
        }
        throw new Error("Невірний логін або пароль");
      }

      // REAL API
      const response = await fetch(
        "https://nondramatic-absolvable-karter.ngrok-free.dev/api/adminLogin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // ОБОВ'ЯЗКОВО для ngrok, щоб fetch не отримував html-попередження замість json
            "ngrok-skip-browser-warning": "69420",
          },
          body: JSON.stringify({
            name: loginName,
            password: password,
          }),
        },
      );

      const data = await response.json();

      // 2. ПЕРЕВІРКА СТАТУСУ (якщо статус не 200-299)
      if (!response.ok) {
        // Використовуємо повідомлення з сервера (наприклад, "Користувач відсутній")
        throw new Error(data.message || "Помилка авторизації");
      }

      // 3. ЯКЩО ВСЕ ДОБРЕ - ЗБЕРІГАЄМО
      const userData = { name: loginName, role: "admin" };
      saveAuthData(data.token, userData);

      return { success: true };
    } catch (error) {
      console.error("Login error:", error.message);
      setIsAuthenticated(false);
      return {
        success: false,
        error: error.message,
      };
    }
  };

  // Допоміжна функція для збереження даних
  const saveAuthData = (receivedToken, receivedUser) => {
    localStorage.setItem("adminToken", receivedToken);
    localStorage.setItem("adminUser", JSON.stringify(receivedUser));
    setToken(receivedToken);
    setUser(receivedUser);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    isAuthenticated,
    user,
    token,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
