========================================================================

JWT REACT APP (React + Vite + Tailwind)

========================================================================

Cliente Frontend conectado a Backend Node.js en Render y MySQL en Aiven.
--------------------------------------------------------------

1. VARIABLE DE ENTORNO (.env)

------------------------------------------------------------------------

VITE_API_URL=https://login-users-es8h.onrender.com/api

------------------------------------------------------------------------

2. COMANDOS

------------------------------------------------------------------------

- Instalar dependencias:  npm install

- Ejecutar en local:      npm run dev

- Compilar produccion:    npm run build

------------------------------------------------------------------------

3. RUTAS Y ROLES

------------------------------------------------------------------------

/                -> Publico

/login           -> Publico

/register        -> Publico

/profile         -> Autenticado

/user            -> Rol: USER

/mod             -> Rol: MODERATOR

/admin           -> Rol: ADMIN

------------------------------------------------------------------------

4. DESPLIEGUE (Render Static Site / Vercel)

------------------------------------------------------------------------

- Build Command:     npm run build

- Publish Directory: dist

- Environment Var:   VITE_API_URL=https://login-users-es8h.onrender.com/api

========================================================================