import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // НАЙВАЖЛИВІШИЙ РЯДОК:
  base: "/sto-booking-frontend/",
  plugins: [react()],
});
