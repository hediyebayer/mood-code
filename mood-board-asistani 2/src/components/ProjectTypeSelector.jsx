import { PROJECT_TYPES } from "../data/presets";

export default function ProjectTypeSelector({ value, onChange }) {
  return (
    <section className="panel">
      <h2 className="panel__title">1. Proje Türü</h2>
      <div className="chips">
        {PROJECT_TYPES.map((p) => (
          <button
            key={p.id}
            className={`chip ${value === p.id ? "chip--active" : ""}`}
            onClick={() => onChange(p.id)}
          >
            {p.label}
          </button>
        ))}
      </div>
    </section>
  );
}
