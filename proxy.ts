import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("AuthToken")?.value;
  const { pathname } = request.nextUrl;

  const isAuthPage =
    pathname.startsWith("/login") || pathname.startsWith("/register");
  // Get Public Pages
  const isHomePage = pathname === "/";
  const isRecipePage = pathname.startsWith("/recipes/");
  const isPublicPage = isAuthPage || isHomePage || isRecipePage;

  // If no token and not on Public Page, redirect to login
  if (!token && !isPublicPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If already has token and tries to access login/register, redirect to home
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|login|register).*)"],
};
