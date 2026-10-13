import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Field from "../components/Field";
import { useAuth } from "../context/AuthContext";
import { validateLogin } from "../utils/validators";

export default function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  if (user) return <Navigate to="/profile" replace />;

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    const found = validateLogin(form);
    setErrors(found);
    if (Object.keys(found).length) return; // no se envía al backend

    setLoading(true);
    try {
      await login(form.username, form.password);
      navigate("/profile");
    } catch (err) {
      setServerError(err.response?.data?.message || "No se pudo conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md card">
      <h1 className="mb-4 text-2xl font-bold">Iniciar sesión</h1>
      <form onSubmit={onSubmit} noValidate className="space-y-4">
        <Field label="Usuario" name="username" value={form.username} onChange={onChange} error={errors.username} />
        <Field label="Contraseña" name="password" type="password" value={form.password} onChange={onChange} error={errors.password} />
        {serverError && <p className="rounded-md bg-red-50 p-2 text-sm text-red-700">{serverError}</p>}
        <button className="btn w-full" disabled={loading}>{loading ? "Ingresando..." : "Ingresar"}</button>
      </form>
      <p className="mt-4 text-sm">¿No tienes cuenta? <Link to="/register" className="font-semibold text-indigo-700">Regístrate</Link></p>
    </div>
  );
}
