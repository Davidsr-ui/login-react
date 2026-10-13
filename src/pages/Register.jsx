import { useState } from "react";
import { Link } from "react-router-dom";
import Field from "../components/Field";
import { register } from "../services/auth.service";
import { validateRegister } from "../utils/validators";

const ROLES = [
  { value: "user", label: "Usuario" },
  { value: "moderator", label: "Moderador" },
  { value: "admin", label: "Administrador" },
];

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "", confirm: "" });
  const [roles, setRoles] = useState(["user"]);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const toggleRole = (r) =>
    setRoles(roles.includes(r) ? roles.filter((x) => x !== r) : [...roles, r]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });
    const found = validateRegister(form);
    if (roles.length === 0) found.roles = "Selecciona al menos un rol.";
    setErrors(found);
    if (Object.keys(found).length) return; // no se envía al backend

    setLoading(true);
    try {
      const { data } = await register({
        username: form.username.trim(),
        email: form.email.trim(),
        password: form.password,
        roles,
      });
      setMessage({ type: "ok", text: data.message });
      setForm({ username: "", email: "", password: "", confirm: "" });
    } catch (err) {
      setMessage({ type: "error", text: err.response?.data?.message || "No se pudo conectar con el servidor." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md card">
      <h1 className="mb-4 text-2xl font-bold">Crear cuenta</h1>
      <form onSubmit={onSubmit} noValidate className="space-y-4">
        <Field label="Usuario" name="username" value={form.username} onChange={onChange} error={errors.username} />
        <Field label="Correo" name="email" type="email" value={form.email} onChange={onChange} error={errors.email} />
        <Field label="Contraseña" name="password" type="password" value={form.password} onChange={onChange} error={errors.password} />
        <Field label="Confirmar contraseña" name="confirm" type="password" value={form.confirm} onChange={onChange} error={errors.confirm} />

        <fieldset>
          <legend className="mb-1 text-sm font-medium">Roles</legend>
          <div className="flex flex-wrap gap-4">
            {ROLES.map((r) => (
              <label key={r.value} className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={roles.includes(r.value)} onChange={() => toggleRole(r.value)} />
                {r.label}
              </label>
            ))}
          </div>
          {errors.roles && <p className="error-text">{errors.roles}</p>}
        </fieldset>

        {message.text && (
          <p className={`rounded-md p-2 text-sm ${message.type === "ok" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
            {message.text}
          </p>
        )}
        <button className="btn w-full" disabled={loading}>{loading ? "Registrando..." : "Registrarse"}</button>
      </form>
      <p className="mt-4 text-sm">¿Ya tienes cuenta? <Link to="/login" className="font-semibold text-indigo-700">Inicia sesión</Link></p>
    </div>
  );
}
