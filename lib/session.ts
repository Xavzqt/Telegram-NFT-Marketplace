// lib/session.ts
export type TelegramUser = {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
};

export type Session = {
  id: string;
  user: TelegramUser;
  createdAt: string;
};

const SESSIONS = new Map<string, Session>();

export function createSession(user: TelegramUser): Session {
  const id = `${user.id}-${Math.random().toString(36).slice(2, 8)}`;
  const session: Session = {
    id,
    user,
    createdAt: new Date().toISOString(),
  };
  SESSIONS.set(id, session);
  return session;
}

export function getSession(sessionId: string | undefined | null): Session | null {
  if (!sessionId) return null;
  return SESSIONS.get(sessionId) ?? null;
}
