import { cookies } from "next/headers";
import { getSession } from "@/lib/session";

export async function getCurrentUser() {
  const cookieStore = await cookies(); // async in your Next version[attached_file:1]
  const sessionId = cookieStore.get("tg_session")?.value;
  const session = getSession(sessionId);
  return session?.user ?? null;
}
