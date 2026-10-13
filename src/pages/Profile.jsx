import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();
  return (
    <div className="card">
      <h1 className="mb-4 text-2xl font-bold">Perfil</h1>
      <dl className="grid grid-cols-[8rem_1fr] gap-y-2 text-sm">
        <dt className="font-semibold">Usuario</dt><dd>{user.username}</dd>
        <dt className="font-semibold">Correo</dt><dd>{user.email}</dd>
        <dt className="font-semibold">Roles</dt>
        <dd className="flex gap-2">
          {user.roles.map((r) => (
            <span key={r} className="rounded bg-indigo-100 px-2 py-0.5 text-xs font-semibold text-indigo-800">{r}</span>
          ))}
        </dd>
        <dt className="font-semibold">Token</dt>
        <dd className="break-all text-xs text-slate-500">{user.accessToken.slice(0, 60)}...</dd>
      </dl>
    </div>
  );
}
