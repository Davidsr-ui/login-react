import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// El backend permite CORS solo desde http://localhost:8080
export default defineConfig({
  plugins: [react()],
  server: { port: 8080, strictPort: true },
});
