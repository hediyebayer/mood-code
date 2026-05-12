export default function FontOptions({ options, selectedIdx, onSelect }) {
  return (
    <div className="font-options">
      {options.map((f, i) => (
        <button
          key={i}
          className={`font-option ${selectedIdx === i ? "is-selected" : ""}`}
          onClick={() => onSelect(i)}
        >
          <strong style={{ fontFamily: f.heading }}>{f.heading}</strong>
          <span style={{ fontFamily: f.body }}>{f.body}</span>
        </button>
      ))}
    </div>
  );
}
