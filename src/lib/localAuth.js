import { migrateLegacyProgress } from "./profileStorage.js";
const SESSION_KEY = "tabula_session";
const USERS_KEY = "tabula_users";
function users() {
  try { return JSON.parse(localStorage.getItem(USERS_KEY) || "{}"); }
  catch { throw new Error("Local profile data is unreadable. Do not clear browser data; restore a backup."); }
}
function notify() { window.dispatchEvent(new Event("tabula-auth-change")); }
function establish(username, guest = false) {
  if (!guest) migrateLegacyProgress(username);
  const session = { username, guest };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  notify();
  return session;
}
export function getCurrentUser() {
  try {
    const session = JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
    if (!session || typeof session.username !== "string") return null;
    if (session.guest && session.username === "@guest") return session;
    if (!Object.hasOwn(users(), session.username)) return null;
    migrateLegacyProgress(session.username);
    return session;
  } catch { return null; }
}
async function derive(password, salt) {
  if (!globalThis.crypto?.subtle) throw new Error("Local passwords require HTTPS or localhost.");
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits({ name: "PBKDF2", salt: Uint8Array.from(salt), iterations: 210000, hash: "SHA-256" }, key, 256);
  return Array.from(new Uint8Array(bits), n => n.toString(16).padStart(2, "0")).join("");
}
async function credential(password) {
  const salt = Array.from(crypto.getRandomValues(new Uint8Array(16)));
  return { salt, hash: await derive(password, salt), algorithm: "PBKDF2-SHA256", iterations: 210000 };
}
export async function signup(username, password) {
  const name = (username || "").trim();
  if (!name || !password) throw new Error("Username and password are required.");
  if (name.length > 64 || name.startsWith("@") || ["__proto__", "constructor", "prototype"].includes(name)) throw new Error("Please choose a different username (up to 64 characters).");
  if (Object.hasOwn(users(), name)) throw new Error("That username is already taken.");
  const record = { ...await credential(password), created: Date.now() };
  const current = users();
  if (Object.hasOwn(current, name)) throw new Error("That username is already taken.");
  current[name] = record;
  localStorage.setItem(USERS_KEY, JSON.stringify(current));
  return establish(name);
}
export async function login(username, password) {
  const name = (username || "").trim();
  const records = users();
  const rec = Object.hasOwn(records, name) ? records[name] : null;
  if (!rec || (rec.hash ? await derive(password, rec.salt) !== rec.hash : rec.password !== password)) throw new Error("Invalid username or password.");
  // Upgrade old plaintext credentials only after successful verification.
  if (!rec.hash) {
    const current = users();
    current[name] = { ...await credential(password), created: rec.created };
    localStorage.setItem(USERS_KEY, JSON.stringify(current));
  }
  return establish(name);
}
export function continueAsGuest() { return establish("@guest", true); }
export function logout() { localStorage.removeItem(SESSION_KEY); notify(); }
