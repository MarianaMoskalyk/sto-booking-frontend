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

  // ПЕРЕМИКАЧ: встановіть false, коли бекенд запрацює
  const isDevMode = true;

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    const savedToken = localStorage.getItem("adminToken");
    const savedUser = localStorage.getItem("adminUser");

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
    setLoading(false);
  };

  const login = async (login, password) => {
    try {
      // --- РЕЖИМ РОЗРОБКИ (MOCK) ---
      if (isDevMode) {
        console.log("Вхід у режимі розробки...");
        await new Promise((resolve) => setTimeout(resolve, 500)); // імітація затримки

        // Будь-які дані підійдуть, наприклад: admin / admin
        if (login === "admin" && password === "admin") {
          const mockData = {
            token: "fake-jwt-token-for-dev",
            user: { id: 1, login: "admin", name: "Головний Адмін" },
          };

          localStorage.setItem("adminToken", mockData.token);
          localStorage.setItem("adminUser", JSON.stringify(mockData.user));

          setToken(mockData.token);
          setUser(mockData.user);
          setIsAuthenticated(true);

          return { success: true };
        } else {
          throw new Error("Невірний логін або пароль (режим розробки)");
        }
      }

      // --- РЕАЛЬНИЙ ЗАПИТ (Буде проігноровано, якщо isDevMode === true) ---
      const response = await fetch(
        "https://nondramatic-absolvable-karter.ngrok-free.dev/api/adminLogin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
          },
          body: JSON.stringify({ login, password }),
        },
      );

      if (!response.ok) {
        throw new Error("Невірний логін або пароль");
      }

      const data = await response.json();
      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("adminUser", JSON.stringify(data.user));
      setToken(data.token);
      setUser(data.user);
      setIsAuthenticated(true);

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
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
