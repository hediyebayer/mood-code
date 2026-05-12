export default function FontSuggestion({ fonts }) {
  if (!fonts) return null;
  return (
    <div className="fonts">
      <div className="fonts__block">
        <span className="fonts__tag">Başlık · {fonts.heading}</span>
        <h2
          style={{
            fontFamily: fonts.heading,
            fontSize: "2.2rem",
            fontWeight: 800,
            margin: 0,
          }}
        >
          Yaratıcı bir başlık
        </h2>
        <h4
          style={{
            fontFamily: fonts.heading,
            fontSize: "1.15rem",
            fontWeight: 600,
            margin: 0,
            opacity: 0.75,
          }}
        >
          Destekleyici alt başlık
        </h4>
      </div>
      <div className="fonts__block">
        <span className="fonts__tag">Gövde · {fonts.body}</span>
        <p
          style={{
            fontFamily: fonts.body,
            fontSize: "1rem",
            lineHeight: 1.65,
            margin: 0,
          }}
        >
          Tasarım yalnızca nasıl göründüğüyle değil, nasıl çalıştığıyla da
          ilgilidir. Bu paragraf, seçilen gövde fontunun gerçek bir metin
          üzerindeki okunabilirliğini değerlendirmenizi sağlar.
        </p>
        <p
          style={{
            fontFamily: fonts.body,
            fontSize: "0.85rem",
            margin: 0,
            opacity: 0.65,
          }}
        >
          AaBbCc 0123456789 — küçük puntoda okunabilirlik kontrolü.
        </p>
      </div>
    </div>
  );
}
