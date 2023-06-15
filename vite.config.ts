import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  plugins: [react()],
  root: path.resolve("./"),
  server: {
    port: 3000,
  },
});
