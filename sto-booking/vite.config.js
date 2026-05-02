import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  // Ваш базовий шлях для GitHub Pages або іншого хостингу
  base: "/sto-booking-frontend/",
  plugins: [react()],
  resolve: {
    alias: {
      // Цей рядок гарантує, що всі бібліотеки (наприклад, react-router-dom)
      // звертатимуться до тієї ж копії React, що і ваш основний проєкт.
      react: path.resolve("./node_modules/react"),
      "react-dom": path.resolve("./node_modules/react-dom"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "https://nondramatic-absolvable-karter.ngrok-free.dev",
        changeOrigin: true,
        secure: false,
        configure: (proxy) => {
          proxy.on("proxyReq", (proxyReq) => {
            proxyReq.setHeader("ngrok-skip-browser-warning", "true");
          });
        },
      },
    },
  },
});
