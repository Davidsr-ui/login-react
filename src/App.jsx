import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Board from "./components/Board";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/user" element={<ProtectedRoute><Board title="Contenido de usuario" path="user" /></ProtectedRoute>} />
          <Route path="/mod" element={<ProtectedRoute role="moderator"><Board title="Contenido de moderador" path="mod" /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute role="admin"><Board title="Contenido de administrador" path="admin" /></ProtectedRoute>} />
          <Route path="*" element={<p className="text-center">Página no encontrada.</p>} />
        </Routes>
      </main>
    </>
  );
}
