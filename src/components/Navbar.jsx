import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const link = ({ isActive }) =>
  `rounded-md px-3 py-2 text-sm font-medium ${
    isActive ? "bg-indigo-800 text-white" : "text-indigo-100 hover:bg-indigo-600"
  }`;

export default function Navbar() {
  const { user, logout, hasRole } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-indigo-700">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-1">
          <span className="mr-4 text-lg font-bold text-white">JWT App</span>
          <NavLink to="/" end className={link}>Inicio</NavLink>
          {user && <NavLink to="/user" className={link}>Usuario</NavLink>}
          {hasRole("moderator") && <NavLink to="/mod" className={link}>Moderador</NavLink>}
          {hasRole("admin") && <NavLink to="/admin" className={link}>Administrador</NavLink>}
        </div>

        <div className="flex items-center gap-1">
          {user ? (
            <>
              <NavLink to="/profile" className={link}>{user.username}</NavLink>
              <button onClick={handleLogout} className="rounded-md px-3 py-2 text-sm font-medium text-indigo-100 hover:bg-indigo-600">
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={link}>Iniciar sesión</NavLink>
              <NavLink to="/register" className={link}>Registrarse</NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
