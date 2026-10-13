import { useEffect, useState } from "react";
import { getContent } from "../services/auth.service";

// Consulta /api/test/<path> y muestra la respuesta del backend
export default function Board({ title, path }) {
  const [content, setContent] = useState("Cargando...");
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    getContent(path)
      .then((res) => setContent(res.data))
      .catch((err) => {
        setFailed(true);
        setContent(err.response?.data?.message || err.message);
      });
  }, [path]);

  return (
    <div className="card">
      <h1 className="mb-3 text-2xl font-bold">{title}</h1>
      <p className={failed ? "text-red-600" : "text-slate-700"}>{String(content)}</p>
    </div>
  );
}
