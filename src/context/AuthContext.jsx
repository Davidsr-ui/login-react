import { createContext, useContext, useState } from "react";
import * as AuthService from "../services/auth.service";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(AuthService.getCurrentUser());

  const login = async (username, password) => {
    const data = await AuthService.login(username, password);
    setUser(data);
    return data;
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
  };

  const hasRole = (role) => !!user?.roles?.includes(`ROLE_${role.toUpperCase()}`);

  return (
    <AuthContext.Provider value={{ user, login, logout, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
