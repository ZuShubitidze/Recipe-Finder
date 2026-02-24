import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = await cookies();

  // Remove the session cookie
  cookieStore.delete("AuthToken");

  return NextResponse.json({ message: "Logged out" }, { status: 200 });
}
