import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
      components: `${path.resolve(__dirname, "./src/components/")}`,
      public: `${path.resolve(__dirname, "./public/")}`,
      pages: path.resolve(__dirname, "./src/pages"),
      api: path.resolve(__dirname, "./src/api"),
      assets: path.resolve(__dirname, "./src/assets"),
      layout: path.resolve(__dirname, "./src/layout"),
      features: path.resolve(__dirname, "./src/features"),
      types: `${path.resolve(__dirname, "./src/@types")}`,
      utils: path.resolve(__dirname, "./src/utils"),
    },
  },
  server: {
    port: 3000,
    open: "http://localhost:3000/login",
  },
  build: {
    sourcemap: false,
    chunkSizeWarningLimit: 1000
  },
});
