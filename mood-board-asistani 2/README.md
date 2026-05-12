# Mood Board Asistanı

Tasarımcılar için renk paleti, font kombinasyonu ve stil önerisi üreten Vite + React tabanlı bir MVP.

## Özellikler

- **Proje türü + stil seçimi**: logo / social / poster / brand × minimal / retro / luxury / neon / kurumsal / eğlenceli
- **Doğal dil tarifi**: "Ne tasarlamak istiyorsun?" textarea'sına Türkçe açıklama yaz, sistem anahtar kelimeleri eşleştirsin (lüks, retro, kozmetik, gaming vb.)
- **6 palet + 3 font kombinasyonu** önerisi, kart tıklanarak seçim
- **HSL tabanlı dinamik palet üretimi** — her stilin kendi scheme'i (mono / analogous / luxury / triadic / corporate / rainbow)
- **JSON / PNG export** (`html-to-image` ile)
- **Dark mode** toggle
- **Paylaşılabilir link** (URL hash üzerinden)
- **localStorage**'da kaydet / yükle / sil

## Kurulum

```bash
npm install
npm run dev
```

Tarayıcıda `http://localhost:5173/` adresinde açılır.

## Build

```bash
npm run build
npm run preview
```

## Teknolojiler

- Vite + React
- `html-to-image` (PNG export)
