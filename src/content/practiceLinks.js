// External practice tools. We link out instead of running user code in this app.
// Keep https only. Verify manually now and then (a link can die without breaking the app).
export const TOOLS = {
  gdbC: { label: "OnlineGDB (C)", url: "https://www.onlinegdb.com/online_c_compiler" },
  gdbCpp: { label: "OnlineGDB (C++)", url: "https://www.onlinegdb.com/online_c++_compiler" },
  gdbJava: { label: "OnlineGDB (Java)", url: "https://www.onlinegdb.com/online_java_compiler" },
  gdbPython: { label: "OnlineGDB (Python)", url: "https://www.onlinegdb.com/online_python_compiler" },
  oneJs: { label: "OneCompiler (JavaScript)", url: "https://onecompiler.com/javascript" },
  oneSql: { label: "OneCompiler (MySQL)", url: "https://onecompiler.com/mysql" },
  oneBash: { label: "OneCompiler (Bash)", url: "https://onecompiler.com/bash" },
  fiddle: { label: "JSFiddle (HTML/CSS/JS)", url: "https://jsfiddle.net/" },
};

// Lesson code language -> tool. Anything not listed gets no practice block.
export const BY_LANG = {
  c: "gdbC",
  cpp: "gdbCpp",
  java: "gdbJava",
  python: "gdbPython",
  javascript: "oneJs",
  js: "oneJs",
  sql: "oneSql",
  bash: "oneBash",
  html: "fiddle",
  css: "fiddle",
};

// Languages that are not runnable code in a compiler (shell output, plain text, etc.).
const NOT_RUNNABLE = new Set(["text", ""]);
const ALIAS = { js: "javascript", "c++": "cpp", py: "python", python3: "python", sh: "bash", shell: "bash", zsh: "bash", mysql: "sql" };
export const normLang = (l) => { const k = String(l || "text").toLowerCase().trim(); return ALIAS[k] || k; };

/** Every distinct runnable language in a topic, in order of first appearance: [{ lang, code, tool }]. */
export function practiceAll(topic) {
  const out = [];
  const seen = new Set();
  for (const ex of topic?.codeExamples || []) {
    const candidates = ex.variants ? (Array.isArray(ex.variants) ? ex.variants : Object.entries(ex.variants).map(([lang, code]) => ({ lang, code }))) : [ex];
    for (const c of candidates) {
      const lang = normLang(c.lang);
      if (NOT_RUNNABLE.has(lang) || seen.has(lang) || typeof c.code !== "string" || !c.code.trim()) continue;
      const key = BY_LANG[lang];
      if (!key) continue;
      seen.add(lang);
      out.push({ lang, code: c.code, tool: TOOLS[key] });
    }
  }
  return out;
}

/** First runnable example, or null. */
export function practiceFor(topic) { return practiceAll(topic)[0] || null; }
