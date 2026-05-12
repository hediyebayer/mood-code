function Swatch({ hex, label, onCopy }) {
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(hex);
      onCopy?.(`${hex.toUpperCase()} kopyalandı`);
    } catch {}
  };
  return (
    <button
      className="swatch"
      style={{ background: hex }}
      onClick={copy}
      title="HEX kopyala"
    >
      <span className="swatch__label">{label}</span>
      <span className="swatch__hex">{hex.toUpperCase()}</span>
    </button>
  );
}

export default function ColorPalette({ palette, onCopy }) {
  if (!palette) return null;
  return (
    <div className="palette">
      <Swatch hex={palette.primary} label="Ana Renk" onCopy={onCopy} />
      {palette.colors.map((c, i) => (
        <Swatch key={c + i} hex={c} label={`Yardımcı ${i + 1}`} onCopy={onCopy} />
      ))}
    </div>
  );
}
