import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { login, signup, continueAsGuest } from "@/lib/localAuth";
import NotebookLogo from "@/components/NotebookLogo";

export default function Auth() {
  const [mode, setMode] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  const root = useRef(null);
  const card = useRef(null);
  const fieldset = useRef(null);
  const toggleRef = useRef(null);

  // Entrance: animate the card + inner groups. clearProps guarantees nothing
  // is left with inline opacity:0 even if a tween is interrupted.
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(card.current, { y: 40, opacity: 0, duration: 0.7, clearProps: "all" })
        .from(card.current.querySelectorAll("[data-anim]"), {
          y: 16, opacity: 0, stagger: 0.08, duration: 0.5, clearProps: "all"
        }, "-=0.35");
    }, root);
    return () => ctx.revert();
  }, []);

  const animateToggle = () => {
    gsap.fromTo(
      fieldset.current,
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.35, ease: "power2.out", clearProps: "all" }
    );
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      if (mode === "signup") await signup(username, password);
      else await login(username, password);
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.message);
      setBusy(false);
      gsap.fromTo(card.current, { x: -8 }, { x: 0, duration: 0.4, ease: "elastic.out(1,0.5)", clearProps: "all" });
    }
  };

  const switchMode = (m) => {
    setMode(m);
    setError("");
    animateToggle();
  };

  return (
    <div ref={root} className="min-h-screen flex items-center justify-center paper-grain px-4 py-10">
      <div ref={card} className="w-full max-w-sm bg-paper border border-brown/40 rounded-2xl p-8 page-lift">
        <div className="flex flex-col items-center text-center">
          <span data-anim className="text-brown">
            <NotebookLogo className="w-12 h-12" />
          </span>
          <h1 data-anim className="mt-3 text-2xl font-heading font-semibold text-ink">
            {mode === "login" ? "Welcome back" : "Create your notebook"}
          </h1>
          <p data-anim className="font-reading italic text-brown">
            {mode === "login" ? "sign in to continue" : "just a username and password"}
          </p>
        </div>

        <div data-anim ref={toggleRef} className="mt-5 flex rounded-md border border-brown/40 overflow-hidden">
          <button
            type="button"
            onClick={() => switchMode("login")}
            className={`flex-1 py-2 text-sm transition-colors ${mode === "login" ? "bg-paper-2 text-ink font-medium" : "text-brown hover:bg-paper-2/60"}`}
          >
            Log in
          </button>
          <button
            type="button"
            onClick={() => switchMode("signup")}
            className={`flex-1 py-2 text-sm transition-colors ${mode === "signup" ? "bg-paper-2 text-ink font-medium" : "text-brown hover:bg-paper-2/60"}`}
          >
            Sign up
          </button>
        </div>

        <form ref={fieldset} onSubmit={submit} className="mt-5 space-y-3" noValidate>
          <div data-anim>
            <label htmlFor="auth-username" className="block text-xs font-mono-code text-brown mb-1">username</label>
            <input
              id="auth-username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="pick a username"
              autoComplete="username"
              className="w-full px-4 py-3 bg-paper-2 border-2 border-brown/50 rounded-md text-ink placeholder:text-brown/50 focus:border-orangeink focus:ring-2 focus:ring-orangeink/30 outline-none transition"
            />
          </div>
          <div data-anim>
            <label htmlFor="auth-password" className="block text-xs font-mono-code text-brown mb-1">password</label>
            <input
              id="auth-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="your password"
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              className="w-full px-4 py-3 bg-paper-2 border-2 border-brown/50 rounded-md text-ink placeholder:text-brown/50 focus:border-orangeink focus:ring-2 focus:ring-orangeink/30 outline-none transition"
            />
          </div>
          {error && <p data-anim className="text-sm text-destructive">{error}</p>}
          <button
            data-anim
            type="submit"
            disabled={busy}
            className="w-full py-3 rounded-md bg-paper-2 border border-brown/40 text-green-ink font-medium hover:bg-paper-2/70 disabled:opacity-50 transition-colors"
          >
            {mode === "login" ? "Log in" : "Sign up"}
          </button>
        </form>

        <button type="button" disabled={busy} onClick={() => {
          try { continueAsGuest(); navigate("/", { replace: true }); }
          catch (err) { setError(err.message); }
        }} className="mt-4 w-full text-sm text-brown underline">Continue without a profile</button>
        <p data-anim className="mt-4 text-center text-xs text-brown">Profiles and salted password hashes stay in this browser. This is not server authentication.</p>
      </div>
    </div>
  );
}