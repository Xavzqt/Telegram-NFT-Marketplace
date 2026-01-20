"use client";

import { useLang } from "../context/LanguageProvider";

export default function LangToggle() {
  const { lang, setLang } = useLang();
  const nextLang = lang === "mm" ? "en" : "mm";

  return (
    <button
      type="button"
      onClick={() => setLang(nextLang)}
      className="rounded-full border border-slate-700 bg-slate-900/60 px-3 py-1 text-[11px] text-slate-200"
    >
      {lang === "mm" ? "MM / EN" : "EN / MM"}
    </button>
  );
}
