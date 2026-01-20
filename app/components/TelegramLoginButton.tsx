"use client";

import { useEffect, useState } from "react";

declare global {
  interface Window {
    Telegram?: {
      WebApp?: any;
    };
  }
}

type TelegramUser = {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
};

type Props = {
  onLoggedIn?: (user: TelegramUser) => void;
};

export default function TelegramLoginButton({ onLoggedIn }: Props) {
  const [loading, setLoading] = useState(false);
  const [available, setAvailable] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.Telegram?.WebApp) {
      setAvailable(true);
    }
  }, []);

  const handleLogin = async () => {
    setError(null);

    if (!window.Telegram?.WebApp) {
      setError("Open this site inside Telegram to use Telegram login.");
      return;
    }

    try {
      setLoading(true);

      const tg = window.Telegram.WebApp;
      const user: TelegramUser | undefined = tg.initDataUnsafe?.user;

      if (!user || !user.id) {
        throw new Error("Telegram user data is not available.");
      }

      // Send to backend to create a session
      const res = await fetch("/api/auth/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message ?? "Login failed.");
      }

      const data = await res.json();
      if (onLoggedIn) onLoggedIn(data.user as TelegramUser);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-1 text-xs">
      <button
        type="button"
        onClick={handleLogin}
        disabled={loading}
        className="inline-flex items-center gap-2 rounded-xl bg-sky-500 px-3 py-2 text-xs font-medium text-slate-950 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-[11px]">
          T
        </span>
        {loading ? "Connecting..." : "Login with Telegram"}
      </button>
      {!available && (
        <p className="text-[11px] text-slate-500">
          For real Telegram login, open this app inside Telegram Mini App.
        </p>
      )}
      {error && (
        <p className="text-[11px] text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}
