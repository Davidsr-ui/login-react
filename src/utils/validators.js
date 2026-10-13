const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateLogin({ username, password }) {
  const errors = {};
  if (!username.trim()) errors.username = "El usuario es obligatorio.";
  if (!password) errors.password = "La contraseña es obligatoria.";
  return errors;
}

export function validateRegister({ username, email, password, confirm }) {
  const errors = {};
  if (!username.trim()) errors.username = "El usuario es obligatorio.";
  else if (username.trim().length < 3 || username.trim().length > 20)
    errors.username = "Debe tener entre 3 y 20 caracteres.";

  if (!email.trim()) errors.email = "El correo es obligatorio.";
  else if (!EMAIL_RE.test(email)) errors.email = "Ingresa un correo válido.";

  if (!password) errors.password = "La contraseña es obligatoria.";
  else if (password.length < 6 || password.length > 40)
    errors.password = "Debe tener entre 6 y 40 caracteres.";

  if (confirm !== password) errors.confirm = "Las contraseñas no coinciden.";
  return errors;
}
