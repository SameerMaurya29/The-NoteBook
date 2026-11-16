/**
 * SubjectIcon — a crafted line-art SVG mark for each subject, replacing the
 * old emoji glyphs. Consistent 24×24 viewBox, stroke = currentColor so it
 * inherits the surrounding accent color.
 */
const ICONS = {
  java: (
    <>
      <path d="M5 8h11v6a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V8z" />
      <path d="M16 9h2a2 2 0 0 1 0 4h-2" />
      <path d="M8 2.5c-.4 1 .4 1.6 0 2.6" />
      <path d="M11 2.5c-.4 1 .4 1.6 0 2.6" />
    </>
  ),
  python: (
    <path d="M4 8c0-2.5 2.5-4 8-4s8 1.5 8 4-2.5 4-8 4-8 1.5-8 4 2.5 4 8 4 8-1.5 8-4" />
  ),
  c: (
    <text x="12" y="18" textAnchor="middle" fontFamily="serif" fontWeight="700" fontSize="20" fill="currentColor" stroke="none">C</text>
  ),
  dsa: (
    <>
      <path d="M4 20V11" strokeWidth="2.2" />
      <path d="M9.5 20V7" strokeWidth="2.2" />
      <path d="M15 20V13" strokeWidth="2.2" />
      <path d="M20 20V4" strokeWidth="2.2" />
      <path d="M3 20h18" />
    </>
  ),
  os: (
    <>
      <path d="M12 3l9 4.5-9 4.5-9-4.5L12 3z" />
      <path d="M3 12l9 4.5 9-4.5" />
      <path d="M3 16.5l9 4.5 9-4.5" />
    </>
  ),
  dbms: (
    <>
      <ellipse cx="12" cy="5.5" rx="7" ry="2.8" />
      <path d="M5 5.5v13c0 1.6 3.1 2.8 7 2.8s7-1.2 7-2.8v-13" />
      <path d="M5 12c0 1.6 3.1 2.8 7 2.8s7-1.2 7-2.8" />
    </>
  ),
  networks: (
    <>
      <circle cx="6" cy="6" r="2.4" />
      <circle cx="18" cy="6" r="2.4" />
      <circle cx="12" cy="18" r="2.4" />
      <path d="M8.1 7.3l5.8 9.4M15.9 7.3l-5.8 9.4M8.2 6h7.6" />
    </>
  ),
  coa: (
    <>
      <rect x="6" y="6" width="12" height="12" rx="1.5" />
      <rect x="9.5" y="9.5" width="5" height="5" rx="0.5" />
      <path d="M9 3.5v2.5M15 3.5v2.5M9 18v2.5M15 18v2.5M3.5 9H6M3.5 15H6M18 9h2.5M18 15h2.5" />
    </>
  ),
  html: (
    <>
      <path d="M8 7l-5 5 5 5" />
      <path d="M16 7l5 5-5 5" />
      <path d="M13.5 5l-3 14" />
    </>
  ),
  css: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="7.5" cy="9.5" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="7" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="16.5" cy="9.5" r="1.1" fill="currentColor" stroke="none" />
      <path d="M12 21c2.2-1.2 2.2-3.2 0-4.2" />
    </>
  ),
  js: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2.5" />
      <text x="12" y="16.5" textAnchor="middle" fontFamily="monospace" fontWeight="700" fontSize="8.5" fill="currentColor" stroke="none">JS</text>
    </>
  ),
  aptitude: (
    <>
      <path d="M9 18h6M10 21h4" />
      <path d="M12 3a6 6 0 0 0-4 10.5c.8.8 1 1.5 1 2.5h6c0-1 .2-1.7 1-2.5A6 6 0 0 0 12 3z" />
    </>
  ),
  systemdesign: (
    <>
      <rect x="3" y="4" width="18" height="5" rx="1" />
      <rect x="3" y="11" width="18" height="5" rx="1" />
      <path d="M6.5 6.5h.01M6.5 13.5h.01" />
    </>
  )
};

export default function SubjectIcon({ id, className = "w-6 h-6" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {ICONS[id] || ICONS.dsa}
    </svg>
  );
}