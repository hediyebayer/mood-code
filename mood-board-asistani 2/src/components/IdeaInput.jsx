import { useState } from "react";

export default function IdeaInput({ onSubmit }) {
  const [text, setText] = useState("");
  const [hint, setHint] = useState(null);

  const submit = () => {
    if (!text.trim()) {
      setHint({
        type: "warn",
        message: "Önce ne tasarlamak istediğini birkaç kelimeyle yaz.",
      });
      return;
    }
    const result = onSubmit(text);
    if (result?.reason) {
      setHint({ type: "ok", message: "İpucu: " + result.reason });
    } else {
      setHint({
        type: "warn",
        message:
          "Açıklamadan stil çıkaramadım. 'minimal', 'lüks', 'retro', 'neon', 'kurumsal', 'eğlenceli' gibi kelimeler dene. Yine de yeni paletler ürettim.",
      });
    }
  };

  return (
    <section className="panel idea">
      <h2 className="panel__title">Ne tasarlamak istiyorsun?</h2>
      <textarea
        className="idea__input"
        placeholder="Örn: Doğal kozmetik markası için minimal bir logo · Çocuklar için renkli kitap kapağı · Lüks bir kuyumcu için marka kimliği"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={3}
      />
      <div className="idea__footer">
        <button className="btn btn--primary" onClick={submit}>
          Bana Fikir Ver
        </button>
        {hint && (
          <p className={`idea__hint idea__hint--${hint.type}`}>{hint.message}</p>
        )}
      </div>
    </section>
  );
}
