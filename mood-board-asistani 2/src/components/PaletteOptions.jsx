export default function PaletteOptions({ options, selectedIdx, onSelect }) {
  return (
    <div className="palette-options">
      {options.map((p, i) => (
        <button
          key={i}
          className={`palette-option ${selectedIdx === i ? "is-selected" : ""}`}
          onClick={() => onSelect(i)}
          aria-label={`Palet ${i + 1}`}
          title={`Palet ${i + 1}`}
        >
          <span style={{ background: p.primary }} />
          {p.colors.map((c, j) => (
            <span key={j} style={{ background: c }} />
          ))}
        </button>
      ))}
    </div>
  );
}
