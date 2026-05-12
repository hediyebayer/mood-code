export const PROJECT_TYPES = [
  { id: "logo", label: "Logo" },
  { id: "social", label: "Sosyal Medya Postu" },
  { id: "poster", label: "Afiş" },
  { id: "brand", label: "Marka Kimliği" },
];

export const STYLES = {
  minimal: {
    label: "Minimal",
    params: { scheme: "mono", hue: [0, 360], sat: [6, 22], light: [18, 38] },
    fonts: [
      { heading: "Inter", body: "Inter" },
      { heading: "Montserrat", body: "Open Sans" },
      { heading: "Space Grotesk", body: "Inter" },
    ],
  },
  retro: {
    label: "Retro",
    params: { scheme: "analogous", hue: [5, 55], sat: [50, 82], light: [38, 58] },
    fonts: [
      { heading: "Abril Fatface", body: "Lora" },
      { heading: "Playfair Display", body: "Lora" },
      { heading: "Fredoka", body: "Lora" },
    ],
  },
  luxury: {
    label: "Luxury",
    params: { scheme: "luxury", hue: [0, 360], sat: [20, 55], light: [7, 18] },
    fonts: [
      { heading: "Playfair Display", body: "Cormorant Garamond" },
      { heading: "Cormorant Garamond", body: "Lora" },
      { heading: "Playfair Display", body: "Lora" },
    ],
  },
  neon: {
    label: "Neon",
    params: { scheme: "triadic", hue: [0, 360], sat: [85, 100], light: [50, 62] },
    fonts: [
      { heading: "Orbitron", body: "Space Grotesk" },
      { heading: "Orbitron", body: "Inter" },
      { heading: "Space Grotesk", body: "Inter" },
    ],
  },
  kurumsal: {
    label: "Kurumsal",
    params: { scheme: "corporate", hue: [180, 260], sat: [50, 85], light: [26, 48] },
    fonts: [
      { heading: "Montserrat", body: "Open Sans" },
      { heading: "Inter", body: "Open Sans" },
      { heading: "Montserrat", body: "Inter" },
    ],
  },
  eglenceli: {
    label: "Eğlenceli",
    params: { scheme: "rainbow", hue: [0, 360], sat: [65, 85], light: [55, 68] },
    fonts: [
      { heading: "Fredoka", body: "Quicksand" },
      { heading: "Fredoka", body: "Open Sans" },
      { heading: "Quicksand", body: "Quicksand" },
    ],
  },
};
