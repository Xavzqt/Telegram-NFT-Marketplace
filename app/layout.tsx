import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "./context/LanguageProvider";
import LangToggle from "./components/LangToggle";

export const metadata: Metadata = {
  title: "Telegram NFT Gifts",
  description: "Lightweight Telegram NFT marketplace with manual KBZ Pay flow.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Telegram WebApp SDK */}
        <script src="https://telegram.org/js/telegram-web-app.js"></script>
      </head>
      <body className="bg-slate-950 text-slate-50">
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (window.Telegram && window.Telegram.WebApp) {
                window.Telegram.WebApp.ready();
                window.Telegram.WebApp.expand();
              }
            `,
          }}
        />

        <LanguageProvider>
          <div className="min-h-screen flex flex-col">
            <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
              <div className="mx-auto max-w-4xl px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-xl bg-gradient-to-tr from-sky-400 to-violet-500 text-xs font-bold">
                    TG
                  </span>
                  <div className="flex flex-col leading-tight">
                    <span className="text-sm font-semibold">
                      Telegram NFT Gifts
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Mobile‑first Telegram marketplace
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <nav className="hidden sm:flex gap-4 text-xs text-slate-400">
                    <a href="/" className="hover:text-slate-100 transition">
                      Home
                    </a>
                    <a
                      href="/discover"
                      className="hover:text-slate-100 transition"
                    >
                      Discover
                    </a>
                    <a
                      href="/profile"
                      className="hover:text-slate-100 transition"
                    >
                      Profile
                    </a>
                  </nav>
                  <LangToggle />
                </div>
              </div>
            </header>

            <main className="flex-1">{children}</main>

            <footer className="border-t border-slate-800 text-[11px] text-slate-500">
              <div className="mx-auto max-w-4xl px-4 py-3 flex items-center justify-between">
                <span>© {new Date().getFullYear()} Telegram NFT Gifts</span>
                <span>Manual KBZ Pay · Telegram delivery</span>
              </div>
            </footer>

            <nav className="fixed bottom-0 left-0 right-0 border-t border-slate-800 bg-slate-950/95 backdrop-blur sm:hidden">
              <div className="flex">
                <a
                  href="/"
                  className="flex-1 py-2 text-center text-xs text-slate-400 hover:text-slate-50"
                >
                  Home
                </a>
                <a
                  href="/discover"
                  className="flex-1 py-2 text-center text-xs text-slate-400 hover:text-slate-50"
                >
                  Discover
                </a>
                <a
                  href="/profile"
                  className="flex-1 py-2 text-center text-xs text-slate-400 hover:text-slate-50"
                >
                  Profile
                </a>
              </div>
            </nav>
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
