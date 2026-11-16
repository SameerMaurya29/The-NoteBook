import {countSubjectCompletions} from "@/lib/buildProgress";
import { Component, lazy, Suspense } from "react";
import { ChevronDown, UserRound } from "lucide-react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { getCurrentUser, logout } from "@/lib/localAuth";
import { subjects } from "@/content/generated/catalog";
import { useProgress } from "@/lib/progress";
import OfflineStatus from "@/components/OfflineStatus";
import LearningDataNotice from "@/components/LearningDataNotice";
import ThemeToggle from "@/components/ThemeToggle";
import NotebookLogo from "@/components/NotebookLogo";

const MoreMenu = lazy(() => import("@/components/MoreMenu"));
// If the lazy menu chunk cannot load (for example offline before it was cached), keep the page and show a plain link.
class MenuBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? this.props.fallback : this.props.children; }
}

const PRIMARY_NAV = [
  { to: "/", label: "Home" },
  { to: "/quiz", label: "Quizzes" },
  { to: "/dsa", label: "Visualizers" },
  { to: "/roadmap", label: "Roadmap" }
];
const MORE_NAV = [
  { to: "/build/os", label: "Build an OS" },
  { to: "/system-design", label: "System Design syllabus" },
  { to: "/offline", label: "Install & offline" },
  { to: "/progress", label: "Progress backup" },
  { to: "/dsa/hub", label: "DSA Hub" },
  { to: "/complexity", label: "Big-O" },
  { to: "/tricky", label: "Tricky" },
  { to: "/resources", label: "Resources" },
  { to: "/cheatsheets", label: "Cheatsheets" }
];

export default function Layout() {
  const loc = useLocation();
  const { completed } = useProgress();
  const totalTopics = subjects.reduce((s, sub) => s + sub.topics.length, 0);
  const doneCount = countSubjectCompletions(subjects, completed);
  const user = getCurrentUser();

  const isActive = (to) => loc.pathname === to || (to === "/dsa" ? loc.pathname.startsWith("/dsa/") && !loc.pathname.startsWith("/dsa/hub") : to !== "/" && loc.pathname.startsWith(`${to}/`));
  const moreActive = MORE_NAV.some((n) => isActive(n.to));
  const triggerClass = `inline-flex shrink-0 items-center gap-1 whitespace-nowrap px-3 py-1.5 rounded-md text-sm transition-colors ${moreActive ? "bg-paper-2 text-ink font-medium" : "text-brown hover:text-ink hover:bg-paper-2/60"}`;
  // Fallback is a real link to the first page so navigation still works while (or if) the menu chunk is loading.
  const moreFallback = <Link to="/resources" className={triggerClass} aria-label="More notebook pages">More <ChevronDown size={14} /></Link>;
  const moreMenu = (
    <MenuBoundary fallback={moreFallback}>
      <Suspense fallback={moreFallback}>
        <MoreMenu items={MORE_NAV} triggerClass={triggerClass} isActive={isActive} />
      </Suspense>
    </MenuBoundary>
  );

  return (
    <div className="min-h-screen flex flex-col paper-grain">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 bg-paper text-ink p-3">Skip to content</a>
      {/* Top navbar */}
      <header className="sticky top-0 z-40 bg-paper/85 backdrop-blur-md border-b border-brown/40">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="h-16 flex items-center justify-between gap-4">
            <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
              <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-greenink/15 border border-greenink/30 text-green-ink group-hover:bg-greenink/25 transition-colors">
                <NotebookLogo className="w-5 h-5" />
              </span>
              <span className="font-heading text-lg text-ink leading-none">The Notebook</span>
            </Link>

            <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
              {PRIMARY_NAV.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  className={`whitespace-nowrap px-3 py-1.5 rounded-md text-sm transition-colors ${
                    isActive(n.to)
                      ? "bg-paper-2 text-ink font-medium"
                      : "text-brown hover:text-ink hover:bg-paper-2/60"
                  }`}
                >
                  {n.label}
                </Link>
              ))}
              {moreMenu}
            </nav>

            <div className="flex items-center gap-2 shrink-0">
              <Link to="/login" className="inline-flex items-center gap-1.5 rounded-md px-2 py-2 text-xs text-brown hover:bg-paper-2" onClick={logout} title={user?.guest ? "Sign in to a local profile" : `Switch profile: ${user?.username}`} aria-label={user?.guest ? "Sign in to a local profile" : `Switch profile: ${user?.username}`}><UserRound size={16} /><span className="hidden sm:inline max-w-20 truncate">{user?.guest ? "Sign in" : user?.username}</span></Link>
              <ThemeToggle />

            </div>
          </div>
        </div>

        {/* Mobile nav row */}
        <div className="lg:hidden border-t border-brown/30">
          <div className="max-w-6xl mx-auto px-2 flex gap-1 overflow-x-auto py-2" aria-label="Primary">
            {PRIMARY_NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className={`shrink-0 px-3 py-1 rounded-md text-sm transition-colors ${
                  isActive(n.to) ? "bg-paper-2 text-ink font-medium" : "text-brown hover:text-ink"
                }`}
              >
                {n.label}
              </Link>
            ))}
            {moreMenu}
          </div>
        </div>
      </header>

      {/* Page spread */}
      <main id="main-content" tabIndex={-1} className="flex-1 min-w-0">
        <div className="max-w-5xl mx-auto px-4 md:px-10 py-8 md:py-12">
          <OfflineStatus />
          <LearningDataNotice />
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-brown/30 bg-paper-2/40">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-brown">
          <p className="font-hand text-lg">a study archive — {doneCount} of {totalTopics} topics ticked off</p>
          <p className="font-mono-code text-xs">local profiles · browser-saved progress</p>
        </div>
      </footer>
    </div>
  );
}