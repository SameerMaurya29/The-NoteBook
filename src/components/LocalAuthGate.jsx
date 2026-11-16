import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getCurrentUser } from "@/lib/localAuth";
import IntroAnimation from "@/components/IntroAnimation";

export default function LocalAuthGate() {
  const [user, setUser] = useState(getCurrentUser);
  const [introDone, setIntroDone] = useState(() => sessionStorage.getItem("tabula_intro") === "done");

  useEffect(() => {
    const handler = () => setUser(getCurrentUser());
    window.addEventListener("tabula-auth-change", handler);
    window.addEventListener("storage", handler);
    return () => { window.removeEventListener("tabula-auth-change", handler); window.removeEventListener("storage", handler); };
  }, []);

  if (!introDone) {
    return (
      <IntroAnimation
        onComplete={() => {
          setIntroDone(true);
          sessionStorage.setItem("tabula_intro", "done");
        }}
      />
    );
  }
  if (!user) return <Navigate to="/login" replace />;
  return <Outlet key={user.username} />;
}