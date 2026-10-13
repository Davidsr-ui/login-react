import api from "./api";

export const register = (data) => api.post("/auth/signup", data);

export const login = async (username, password) => {
  const { data } = await api.post("/auth/signin", { username, password });
  if (data.accessToken) localStorage.setItem("user", JSON.stringify(data));
  return data;
};

export const logout = () => localStorage.removeItem("user");

export const getCurrentUser = () => JSON.parse(localStorage.getItem("user") || "null");

export const getContent = (path) => api.get(`/test/${path}`);
