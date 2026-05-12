const rand = (min, max) => Math.random() * (max - min) + min;
const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

const hslToHex = (h, s, l) => {
  s /= 100;
  l /= 100;
  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => {
    const v = l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return Math.round(v * 255).toString(16).padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
};

const hsl = (h, s, l) =>
  hslToHex(((h % 360) + 360) % 360, clamp(s, 0, 100), clamp(l, 0, 100));

export function generatePalette(params) {
  const h = rand(params.hue[0], params.hue[1]);
  const s = rand(params.sat[0], params.sat[1]);
  const l = rand(params.light[0], params.light[1]);

  switch (params.scheme) {
    case "mono":
      return {
        primary: hsl(h, s, l),
        colors: [
          hsl(h, clamp(s, 0, 8), 96 + rand(-2, 2)),
          hsl(h, s + rand(2, 8), 78 + rand(-4, 4)),
          hsl(h + rand(-15, 15), s + rand(15, 30), 45 + rand(-5, 10)),
        ],
      };

    case "analogous":
      return {
        primary: hsl(h, s, l),
        colors: [
          hsl(h + rand(20, 45), s - rand(5, 15), l + rand(10, 22)),
          hsl(h - rand(15, 35), s, l - rand(5, 15)),
          hsl(h + 180 + rand(-15, 15), s - rand(10, 25), 22 + rand(-5, 8)),
        ],
      };

    case "luxury":
      return {
        primary: hsl(h, s, l),
        colors: [
          hsl(40 + rand(-8, 12), 45 + rand(5, 25), 55 + rand(-8, 12)),
          hsl(h, s + rand(0, 15), l + rand(8, 20)),
          hsl(35 + rand(-15, 15), 18 + rand(0, 18), 88 + rand(-4, 6)),
        ],
      };

    case "triadic":
      return {
        primary: hsl(h, s, l),
        colors: [
          hsl(h + 120 + rand(-10, 10), s, l + rand(-5, 5)),
          hsl(h + 240 + rand(-10, 10), s, l + rand(-5, 5)),
          hsl(h + 60 + rand(-10, 10), s - rand(0, 15), l + rand(5, 15)),
        ],
      };

    case "corporate":
      return {
        primary: hsl(h, s, l),
        colors: [
          hsl(h + rand(-20, 20), s + rand(5, 20), 14 + rand(-3, 6)),
          hsl(h, 15 + rand(0, 15), 45 + rand(-5, 12)),
          hsl(h, 18 + rand(0, 12), 92 + rand(-3, 4)),
        ],
      };

    case "rainbow":
      return {
        primary: hsl(h, s, l),
        colors: [
          hsl(h + rand(80, 110), s + rand(-15, 5), l + rand(-8, 8)),
          hsl(h + rand(170, 200), s - rand(0, 15), l + rand(0, 10)),
          hsl(h + rand(255, 285), s, l - rand(0, 12)),
        ],
      };

    default:
      return {
        primary: hsl(h, s, l),
        colors: [hsl(h, s, 80), hsl(h, s, 60), hsl(h, s, 30)],
      };
  }
}
