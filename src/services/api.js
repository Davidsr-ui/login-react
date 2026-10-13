import axios from "axios";

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL });

// Adjunta el token JWT en cada petición (header que espera authJwt.js)
api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  if (user?.accessToken) config.headers["x-access-token"] = user.accessToken;
  return config;
});

export default api;
