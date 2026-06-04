// Lectere — demo icon generator (SVG)
// Produces scalable vector icons for the interactive demo (MacDemo.tsx):
//   • The four application icons (Safari, Mail, System Settings, Numbers) as
//     hand-built SVG so they stay razor-crisp at any dock size.
//   • The in-app UI glyphs (System Settings sidebar, Mail mailboxes) as SVG.
// Output: ../public/appicons/*.svg
//
//   node tools/iconsvg.mjs
//
import { writeFileSync, mkdirSync } from "node:fs";

const OUT = new URL("../public/appicons/", import.meta.url);
mkdirSync(OUT, { recursive: true });
const write = (name, svg) => {
  writeFileSync(new URL(`${name}.svg`, OUT), svg.trim() + "\n");
  console.log("OK", name + ".svg");
};

const head = (vb = "0 0 120 120") =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" width="120" height="120">`;

/* ============================================================ app icons === */

// macOS squircle as a rounded rect (rx ≈ 22.4% reads as the continuous corner).
const tile = (id, c1, c2, x1 = 0, y1 = 0, x2 = 0, y2 = 1) => `
  <defs><linearGradient id="${id}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">
    <stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/>
  </linearGradient></defs>
  <rect x="6" y="6" width="108" height="108" rx="26.8" fill="url(#${id})"/>`;

// — Safari —
function safari() {
  const cx = 60, cy = 60, r = 45;
  // fine tick bezel via a dashed band; 4 longer cardinal ticks as rects
  const cardinals = [0, 90, 180, 270]
    .map((d) => `<rect x="58.6" y="13" width="2.8" height="9" rx="1.4" fill="#fff" transform="rotate(${d} ${cx} ${cy})"/>`)
    .join("");
  return `${head()}
  <defs><radialGradient id="sf" cx="50%" cy="36%" r="72%">
    <stop offset="0" stop-color="#4cb8f5"/><stop offset="0.55" stop-color="#2a98ef"/><stop offset="1" stop-color="#1574df"/>
  </radialGradient></defs>
  <rect x="6" y="6" width="108" height="108" rx="26.8" fill="url(#sf)"/>
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#fff" stroke-opacity="0.22" stroke-width="2"/>
  <circle cx="${cx}" cy="${cy}" r="${r - 6}" fill="none" stroke="#fff" stroke-opacity="0.9" stroke-width="5" stroke-dasharray="1.1 4.45" stroke-linecap="round"/>
  ${cardinals}
  <polygon points="84,36 64,64 56,56" fill="#f5453b"/>
  <polygon points="36,84 64,64 56,56" fill="#fbfbfd"/>
  <circle cx="${cx}" cy="${cy}" r="3" fill="#e9e9ec"/>
</svg>`;
}

// — Mail —
function mail() {
  return `${head()}
  <defs>
    <linearGradient id="mb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#63bbff"/><stop offset="1" stop-color="#1a83f7"/></linearGradient>
    <linearGradient id="mf" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#e2effc"/></linearGradient>
  </defs>
  <rect x="6" y="6" width="108" height="108" rx="26.8" fill="url(#mb)"/>
  <rect x="24" y="37" width="72" height="47" rx="9.5" fill="url(#mf)"/>
  <path d="M27.5 41 L60 65 L92.5 41" fill="none" stroke="#aacdf2" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M27.5 40.5 L60 64.5 L92.5 40.5 L92.5 45 L60 69 L27.5 45 Z" fill="#cde3f8" opacity="0.55"/>
</svg>`;
}

// — System Settings —
function settingsApp() {
  const cx = 60, cy = 60;
  const teeth = Array.from({ length: 12 }, (_, k) =>
    `<rect x="55" y="18.5" width="10" height="17" rx="2.4" transform="rotate(${k * 30} ${cx} ${cy})"/>`
  ).join("");
  return `${head()}
  <defs>
    <linearGradient id="sb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5e5e66"/><stop offset="1" stop-color="#39393e"/></linearGradient>
    <radialGradient id="sg" cx="50%" cy="40%" r="62%"><stop offset="0" stop-color="#d8d8dd"/><stop offset="1" stop-color="#a6a6ae"/></radialGradient>
  </defs>
  <rect x="6" y="6" width="108" height="108" rx="26.8" fill="url(#sb)"/>
  <g fill="url(#sg)">${teeth}<circle cx="${cx}" cy="${cy}" r="27"/></g>
  <circle cx="${cx}" cy="${cy}" r="11.5" fill="url(#sb)"/>
</svg>`;
}

// — Numbers —
function numbers() {
  const bars = [
    [33, 66, 18], [49, 54, 30], [65, 40, 44], [81, 50, 34],
  ].map(([x, y, h]) => `<rect x="${x}" y="${y}" width="11" height="${h}" rx="3"/>`).join("");
  return `${head()}
  <defs><linearGradient id="nb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5fe177"/><stop offset="1" stop-color="#1fb84c"/></linearGradient></defs>
  <rect x="6" y="6" width="108" height="108" rx="26.8" fill="url(#nb)"/>
  <g fill="#ffffff">${bars}</g>
</svg>`;
}

write("app-safari", safari());
write("app-mail", mail());
write("app-settings", settingsApp());
write("app-numbers", numbers());

/* =========================================================== UI glyphs === */
// lucide-style symbol paths in a 24×24 box.
const SYM = {
  wifi: `<path d="M2 8.82a15 15 0 0 1 20 0"/><path d="M5 12.86a10 10 0 0 1 14 0"/><path d="M8.5 16.43a5 5 0 0 1 7 0"/><path d="M12 20h.01"/>`,
  bluetooth: `<path d="m7 7 10 10-5 5V2l5 5L7 17"/>`,
  globe: `<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>`,
  bell: `<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>`,
  monitor: `<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/>`,
  access: `<circle cx="12" cy="5" r="1.5"/><path d="M4.5 9 12 10.5 19.5 9"/><path d="M12 10.5V15"/><path d="M8.5 21 12 15l3.5 6"/>`,
  volume: `<path d="M11 5 6 9H2v6h4l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M19 5a10 10 0 0 1 0 14"/>`,
  eye: `<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>`,
  zoom: `<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/><path d="M11 8v6"/><path d="M8 11h6"/>`,
  message: `<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>`,
  inbox: `<path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.4 5.1 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.4-6.9A2 2 0 0 0 16.8 4H7.2a2 2 0 0 0-1.8 1.1z"/>`,
  send: `<path d="M22 2 11 13"/><path d="M22 2 15 22 11 13 2 9z"/>`,
  file: `<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>`,
  trash: `<path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>`,
};
const CROSS = `<path d="M9.5 3h5v6.5H21v5h-6.5V21h-5v-6.5H3v-5h6.5z"/>`;

const T = {
  blue: ["#36a4ff", "#0a73e6"], indigo: ["#7d7ce4", "#5a59d8"], gray: ["#9aa0a6", "#6e747c"],
  graph: ["#63666c", "#3f4248"], red: ["#ff6f61", "#e23b2f"], pink: ["#f0467d", "#d8285f"],
  green: ["#5ce072", "#22b94c"], teal: ["#3cc6d8", "#159fb0"],
};

// A System Settings sidebar icon: tinted rounded square + white symbol.
function setSquare(sym, tint) {
  const [c1, c2] = T[tint];
  const filled = sym === CROSS;
  const inner = filled
    ? `<g transform="translate(8,8) scale(0.833)" fill="#fff">${sym}</g>`
    : `<g transform="translate(8,8) scale(0.833)" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${sym}</g>`;
  return `${head("0 0 36 36")}
  <defs><linearGradient id="t" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs>
  <rect x="0.5" y="0.5" width="35" height="35" rx="10" fill="url(#t)"/>
  ${inner}
</svg>`.replace('width="120" height="120"', 'width="36" height="36"');
}

// A Mail mailbox glyph: bare tinted symbol.
function tintGlyph(sym, tint) {
  const [c1] = T[tint];
  return `${head("0 0 36 36")}
  <g transform="translate(6,6)" fill="none" stroke="${c1}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${sym}</g>
</svg>`.replace('width="120" height="120"', 'width="36" height="36"');
}

const settings = [
  ["set-wifi", SYM.wifi, "blue"], ["set-bluetooth", SYM.bluetooth, "blue"],
  ["set-network", SYM.globe, "gray"], ["set-notif", SYM.bell, "red"],
  ["set-displays", SYM.monitor, "graph"], ["set-access", SYM.access, "blue"],
  ["set-sound", SYM.volume, "pink"], ["set-eye", SYM.eye, "blue"],
  ["set-zoom", SYM.zoom, "indigo"], ["set-spoken", SYM.message, "teal"],
  ["set-cross", CROSS, "pink"],
];
for (const [n, s, t] of settings) write(n, setSquare(s, t));

const mailGlyphs = [
  ["mail-inbox", SYM.inbox, "blue"], ["mail-sent", SYM.send, "gray"],
  ["mail-drafts", SYM.file, "gray"], ["mail-trash", SYM.trash, "gray"],
];
for (const [n, s, t] of mailGlyphs) write(n, tintGlyph(s, t));
