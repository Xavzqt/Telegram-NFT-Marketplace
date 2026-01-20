import { NextRequest, NextResponse } from "next/server";
import { createSession, TelegramUser } from "@/lib/session";

// WARNING: This does not yet validate Telegram's signature.
// For a real app, you must verify initData with your bot token.[web:110][web:117]

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      user: TelegramUser;
    };

    if (!body.user || !body.user.id || !body.user.first_name) {
      return NextResponse.json(
        { message: "Invalid Telegram user payload." },
        { status: 400 }
      );
    }

    const session = createSession(body.user);

    const res = NextResponse.json(
      {
        sessionId: session.id,
        user: session.user,
      },
      { status: 200 }
    );

    // Set a httpOnly cookie with the session ID
    res.cookies.set("tg_session", session.id, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch {
    return NextResponse.json({ message: "Bad request." }, { status: 400 });
  }
}
