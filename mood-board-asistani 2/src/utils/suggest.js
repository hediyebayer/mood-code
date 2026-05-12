const STYLE_KEYWORDS = {
  retro: ["retro", "vintage", "eski", "70'", "80'", "90'", "nostalji", "nostaljik", "klasik"],
  luxury: ["lüks", "luxury", "premium", "altın", "gold", "şık", "elite", "mücevher", "kuyumcu", "vip", "butik"],
  neon: ["neon", "gece", "club", "kulüp", "oyun", "gaming", "cyber", "siber", "dj", "rave", "elektronik"],
  kurumsal: [
    "kurumsal", "finans", "banka", "teknoloji", "yazılım", "saas", "danışmanlık",
    "hukuk", "şirket", "ofis", "b2b", "muhasebe",
  ],
  eglenceli: [
    "çocuk", "oyuncak", "eğlence", "renkli", "parti", "doğum günü", "okul",
    "kreş", "anaokulu", "festival",
  ],
  minimal: [
    "minimal", "sade", "doğal", "organik", "modern", "temiz", "scandinavian",
    "kozmetik", "wellness", "yoga", "spa", "vegan",
  ],
};

const PROJECT_KEYWORDS = {
  logo: ["logo", "amblem", "marka işareti"],
  social: ["instagram", "sosyal medya", "post", "story", "twitter", "facebook", "tiktok", "reels"],
  poster: ["afiş", "poster", "billboard", "banner", "duyuru", "ilan"],
  brand: ["marka kimliği", "kurumsal kimlik", "brand", "kimlik", "rebrand"],
};

const STYLE_LABELS = {
  minimal: "Minimal",
  retro: "Retro",
  luxury: "Luxury",
  neon: "Neon",
  kurumsal: "Kurumsal",
  eglenceli: "Eğlenceli",
};

function scoreCategory(text, keywords) {
  const t = text.toLowerCase();
  let best = { key: null, score: 0, matched: [] };
  for (const [key, kws] of Object.entries(keywords)) {
    const matched = kws.filter((kw) => t.includes(kw));
    if (matched.length > best.score) {
      best = { key, score: matched.length, matched };
    }
  }
  return best.score > 0 ? best : null;
}

export function analyzeIdea(text) {
  if (!text || text.trim().length < 3) return null;

  const style = scoreCategory(text, STYLE_KEYWORDS);
  const project = scoreCategory(text, PROJECT_KEYWORDS);

  if (!style && !project) return null;

  const parts = [];
  if (style) {
    parts.push(
      `"${style.matched.join('", "')}" kelimelerinden ${STYLE_LABELS[style.key]} stilini öneriyorum`
    );
  }
  if (project) {
    const label =
      project.key === "logo" ? "Logo" :
      project.key === "social" ? "Sosyal Medya Postu" :
      project.key === "poster" ? "Afiş" : "Marka Kimliği";
    parts.push(`Proje türü olarak ${label} seçildi`);
  }

  return {
    styleId: style?.key || null,
    projectType: project?.key || null,
    reason: parts.join(" · "),
  };
}
