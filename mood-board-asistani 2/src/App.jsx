import { useEffect, useMemo, useState } from "react";
import IdeaInput from "./components/IdeaInput";
import ProjectTypeSelector from "./components/ProjectTypeSelector";
import StyleSelector from "./components/StyleSelector";
import ResultBoard from "./components/ResultBoard";
import SavedBoards from "./components/SavedBoards";
import Toast from "./components/Toast";
import ThemeToggle from "./components/ThemeToggle";
import { PROJECT_TYPES, STYLES } from "./data/presets";
import { generatePalette } from "./utils/palette";
import { readFromUrl, writeToUrl, buildShareUrl } from "./utils/share";
import { analyzeIdea } from "./utils/suggest";
import { useTheme } from "./hooks/useTheme";
import { useToast } from "./hooks/useToast";

const STORAGE_KEY = "mood-boards";
const PALETTE_COUNT = 6;

const buildOptions = (styleId, seed) => {
  const fresh = Array.from({ length: seed ? PALETTE_COUNT - 1 : PALETTE_COUNT }, () =>
    generatePalette(STYLES[styleId].params)
  );
  return seed ? [seed, ...fresh] : fresh;
};

export default function App() {
  const fromUrl = readFromUrl();
  const initStyle = fromUrl?.styleId || "minimal";

  const [projectType, setProjectType] = useState(fromUrl?.projectType || "logo");
  const [styleId, setStyleId] = useState(initStyle);
  const [paletteOptions, setPaletteOptions] = useState(() =>
    buildOptions(initStyle, fromUrl?.palette)
  );
  const [paletteIdx, setPaletteIdx] = useState(0);
  const [fontIdx, setFontIdx] = useState(fromUrl?.fontIdx ?? 0);
  const [saved, setSaved] = useState([]);
  const [theme, toggleTheme] = useTheme();
  const [toast, showToast] = useToast();

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setSaved(JSON.parse(raw));
      } catch {}
    }
  }, []);

  useEffect(() => {
    writeToUrl({
      projectType,
      styleId,
      palette: paletteOptions[paletteIdx],
      fontIdx,
    });
  }, [projectType, styleId, paletteOptions, paletteIdx, fontIdx]);

  const board = useMemo(
    () => ({
      projectType,
      projectLabel: PROJECT_TYPES.find((p) => p.id === projectType)?.label,
      styleId,
      styleLabel: STYLES[styleId].label,
      palette: paletteOptions[paletteIdx],
      fonts: STYLES[styleId].fonts[fontIdx],
    }),
    [projectType, styleId, paletteOptions, paletteIdx, fontIdx]
  );

  const changeStyle = (id) => {
    setStyleId(id);
    setPaletteOptions(buildOptions(id));
    setPaletteIdx(0);
    setFontIdx(0);
  };

  const regenerate = () => {
    setPaletteOptions(buildOptions(styleId));
    setPaletteIdx(0);
    showToast("Yeni paletler üretildi");
  };

  const handleIdea = (text) => {
    const result = analyzeIdea(text);
    if (!result) {
      regenerate();
      return null;
    }
    if (result.styleId) changeStyle(result.styleId);
    if (result.projectType) setProjectType(result.projectType);
    return result;
  };

  const handleSave = () => {
    const item = { ...board, id: Date.now() };
    const next = [item, ...saved];
    setSaved(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    showToast("Mood board kaydedildi");
  };

  const handleDelete = (id) => {
    const next = saved.filter((b) => b.id !== id);
    setSaved(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    showToast("Silindi");
  };

  const handleLoad = (b) => {
    setProjectType(b.projectType);
    setStyleId(b.styleId);
    setPaletteOptions(buildOptions(b.styleId, b.palette));
    setPaletteIdx(0);
    const idx = STYLES[b.styleId].fonts.findIndex(
      (f) => f.heading === b.fonts.heading && f.body === b.fonts.body
    );
    setFontIdx(idx >= 0 ? idx : 0);
    showToast("Mood board yüklendi");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleShare = async () => {
    const url = buildShareUrl({
      projectType,
      styleId,
      palette: paletteOptions[paletteIdx],
      fontIdx,
    });
    try {
      await navigator.clipboard.writeText(url);
      showToast("Link panoya kopyalandı");
    } catch {
      showToast("Link kopyalanamadı");
    }
  };

  return (
    <div className="app">
      <header className="app__header">
        <div>
          <h1>Mood Board Asistanı</h1>
          <p>Açıklamanı yaz, stili seç, paletini ve fontunu kendin belirle.</p>
        </div>
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
      </header>

      <main className="app__main">
        <IdeaInput onSubmit={handleIdea} />
        <ProjectTypeSelector value={projectType} onChange={setProjectType} />
        <StyleSelector value={styleId} onChange={changeStyle} />
        <ResultBoard
          board={board}
          paletteOptions={paletteOptions}
          paletteIdx={paletteIdx}
          onPaletteSelect={setPaletteIdx}
          fontOptions={STYLES[styleId].fonts}
          fontIdx={fontIdx}
          onFontSelect={setFontIdx}
          onRegenerate={regenerate}
          onSave={handleSave}
          onShare={handleShare}
          onToast={showToast}
        />
        <SavedBoards items={saved} onDelete={handleDelete} onLoad={handleLoad} />
      </main>

      <footer className="app__footer">
        <small>© Mood Board Asistanı</small>
      </footer>
      <Toast toast={toast} />
    </div>
  );
}
