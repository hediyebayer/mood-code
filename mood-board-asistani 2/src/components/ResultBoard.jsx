import { useRef } from "react";
import { toPng } from "html-to-image";
import ColorPalette from "./ColorPalette";
import FontSuggestion from "./FontSuggestion";
import PaletteOptions from "./PaletteOptions";
import FontOptions from "./FontOptions";

export default function ResultBoard({
  board,
  paletteOptions,
  paletteIdx,
  onPaletteSelect,
  fontOptions,
  fontIdx,
  onFontSelect,
  onRegenerate,
  onSave,
  onShare,
  onToast,
}) {
  const ref = useRef(null);

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(board, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `moodboard-${board.styleId}-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    onToast?.("JSON indirildi");
  };

  const exportPng = async () => {
    if (!ref.current) return;
    try {
      const dataUrl = await toPng(ref.current, { pixelRatio: 2, cacheBust: true });
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `moodboard-${board.styleId}-${Date.now()}.png`;
      a.click();
      onToast?.("PNG indirildi");
    } catch {
      onToast?.("PNG oluşturulamadı");
    }
  };

  return (
    <section className="result" ref={ref}>
      <div className="result__header">
        <div>
          <h2 className="result__title">Mood Board</h2>
          <p className="result__meta">
            {board.projectLabel} · {board.styleLabel}
          </p>
        </div>
        <div className="result__actions">
          <button className="btn btn--ghost" onClick={onRegenerate}>
            Yeni Paletler
          </button>
          <button className="btn btn--ghost" onClick={onShare}>
            Link
          </button>
          <button className="btn btn--ghost" onClick={exportJson}>
            JSON
          </button>
          <button className="btn btn--ghost" onClick={exportPng}>
            PNG
          </button>
          <button className="btn btn--primary" onClick={onSave}>
            Kaydet
          </button>
        </div>
      </div>

      <h3 className="section-title">Seçili Renk Paleti · HEX kopyalamak için tıkla</h3>
      <ColorPalette palette={board.palette} onCopy={onToast} />

      <h3 className="section-title">Diğer Palet Seçenekleri · Beğen ve tıkla</h3>
      <PaletteOptions
        options={paletteOptions}
        selectedIdx={paletteIdx}
        onSelect={onPaletteSelect}
      />

      <h3 className="section-title">Seçili Font Kombinasyonu</h3>
      <FontSuggestion fonts={board.fonts} />

      <h3 className="section-title">Diğer Font Kombinasyonları</h3>
      <FontOptions
        options={fontOptions}
        selectedIdx={fontIdx}
        onSelect={onFontSelect}
      />
    </section>
  );
}
