import { STYLES } from "../data/presets";

export default function StyleSelector({ value, onChange }) {
  return (
    <section className="panel">
      <h2 className="panel__title">2. Stil</h2>
      <div className="chips">
        {Object.entries(STYLES).map(([id, s]) => (
          <button
            key={id}
            className={`chip ${value === id ? "chip--active" : ""}`}
            onClick={() => onChange(id)}
          >
            {s.label}
          </button>
        ))}
      </div>
    </section>
  );
}
