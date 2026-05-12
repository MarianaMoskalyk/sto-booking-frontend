import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import AdminLogin from "./pages/AdminLogin";
import Footer from "./components/Footer/Footer";

import ProtectedRoute from "./components/Admin/ProtectedRoute";
import AdminLayout from "./components/Admin/AdminLayout";

import Dashboard from "./pages/admin/Dashboard";
import Services from "./pages/admin/Services";
import Bookings from "./pages/admin/Bookings";

function App() {
  return (
    <Routes>
      {/* Головна */}
      <Route
        path="/"
        element={
          <>
            <Home />
            <Footer />
          </>
        }
      />

      {/* Логін */}
      <Route path="/admin-login" element={<AdminLogin />} />

      {/* Адмінка */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="services" element={<Services />} />
        <Route path="bookings" element={<Bookings />} />
      </Route>
    </Routes>
  );
}

export default App;
