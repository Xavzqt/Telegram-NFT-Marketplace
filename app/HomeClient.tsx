"use client";

import Link from "next/link";
import { texts } from "@/lib/i18n";
import { useLang } from "./context/LanguageProvider";

type Props = {
  user: {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
    photo_url?: string;
  } | null;
};

export default function HomeClient({ user }: Props) {
  const { lang } = useLang();
  const t = texts[lang];

  return (
    <div className="mx-auto max-w-4xl px-4 pb-20 pt-8 sm:pt-12">
      <section className="flex flex-col gap-6 sm:flex-row sm:items-center">
        {/* Left side */}
        <div className="flex-1">
          <div className="inline-flex items-center gap-2 rounded-full bg-sky-500/10 px-3 py-1 text-[11px] text-sky-300 ring-1 ring-sky-500/30">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
            {t.hero_badge}
          </div>

          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            {t.hero_title}
          </h1>

          <p className="mt-3 text-sm text-slate-300">{t.hero_body}</p>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/discover"
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-tr from-sky-500 to-violet-500 px-4 py-2 text-sm font-medium text-slate-950 shadow-lg shadow-sky-500/30"
            >
              {t.discover_btn}
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center rounded-xl border border-slate-700 bg-slate-900/40 px-4 py-2 text-sm text-slate-200 hover:border-slate-500"
            >
              {t.how_it_works_btn}
            </a>
          </div>
        </div>

        {/* Right side preview */}
        <div className="mt-8 flex-1 sm:mt-0">
          <div className="mx-auto max-w-xs rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-950 p-4 shadow-xl shadow-sky-500/20 ring-1 ring-slate-800">
            <div className="rounded-2xl bg-slate-900 p-3">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-medium text-slate-200">
                  Telegram NFT Gift
                </span>
                <span className="rounded-full bg-sky-500/10 px-2 py-0.5 text-[10px] text-sky-300">
                  Demo preview
                </span>
              </div>
              <div className="aspect-[4/3] overflow-hidden rounded-xl bg-slate-800" />
              <div className="mt-3 flex items-center justify-between text-xs">
                <div>
                  <div className="font-medium text-slate-100">
                    Teddy Bear Gift
                  </div>
                  <div className="text-[11px] text-slate-400">
                    8,000 MMK · KBZ Pay
                  </div>
                </div>
                <button className="rounded-xl bg-sky-500 px-3 py-1 text-[11px] font-medium text-slate-950">
                  Buy now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="mt-12 sm:mt-16">
        <h2 className="text-sm font-semibold text-slate-100">
          {t.how_title}
        </h2>
        <p className="mt-1 text-xs text-slate-400">{t.how_sub}</p>

        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
            <div className="mb-2 text-xs font-semibold text-slate-200">
              {t.step1_title}
            </div>
            <p className="text-xs text-slate-400">{t.step1_body}</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
            <div className="mb-2 text-xs font-semibold text-slate-200">
              {t.step2_title}
            </div>
            <p className="text-xs text-slate-400">{t.step2_body}</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
            <div className="mb-2 text-xs font-semibold text-slate-200">
              {t.step3_title}
            </div>
            <p className="text-xs text-slate-400">{t.step3_body}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
