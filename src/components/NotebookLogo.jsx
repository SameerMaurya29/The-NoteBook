/** NotebookLogo — the app's crafted mark: a bound notebook with a bookmark and ruled lines. */
export default function NotebookLogo({ className = "w-6 h-6" }) {
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
      <path d="M6.5 3h11a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H6.5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
      <path d="M9 3v18" />
      <path d="M14 3v5l-1.6-1.4L11 8V3" />
      <path d="M11 12h5M11 15h5" />
    </svg>
  );
}