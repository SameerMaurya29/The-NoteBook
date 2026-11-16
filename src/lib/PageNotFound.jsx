import { Link, useLocation } from "react-router-dom";
export default function PageNotFound() {
  const { pathname } = useLocation();
  return <div className="min-h-screen flex items-center justify-center paper-grain p-6"><div className="text-center text-ink space-y-4"><h1 className="text-6xl font-heading">404</h1><h2 className="text-2xl">Page not found</h2><p className="text-brown">The page “{pathname}” does not exist.</p><Link to="/" className="text-green-ink underline">Go home</Link></div></div>;
}
