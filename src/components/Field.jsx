export default function Field({ label, error, ...props }) {
  return (
    <div>
      <label htmlFor={props.name} className="mb-1 block text-sm font-medium">{label}</label>
      <input id={props.name} className={`input ${error ? "input-error" : ""}`} {...props} />
      {error && <p className="error-text">{error}</p>}
    </div>
  );
}
