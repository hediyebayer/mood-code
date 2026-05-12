export default function SavedBoards({ items, onDelete, onLoad }) {
  if (!items.length) return null;
  return (
    <section className="saved">
      <h3 className="section-title">Kaydedilenler ({items.length})</h3>
      <div className="saved__grid">
        {items.map((b) => (
          <div className="saved__card" key={b.id}>
            <button
              className="saved__strip"
              onClick={() => onLoad(b)}
              title="Yükle"
            >
              <span style={{ background: b.palette.primary }} />
              {b.palette.colors.map((c, i) => (
                <span key={i} style={{ background: c }} />
              ))}
            </button>
            <div className="saved__info">
              <strong>{b.styleLabel}</strong>
              <small>{b.projectLabel}</small>
              <small style={{ fontFamily: b.fonts.heading }}>
                {b.fonts.heading}
              </small>
            </div>
            <div className="saved__actions">
              <button
                className="btn btn--ghost btn--sm"
                onClick={() => onLoad(b)}
              >
                Yükle
              </button>
              <button
                className="btn btn--ghost btn--sm"
                onClick={() => onDelete(b.id)}
              >
                Sil
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
