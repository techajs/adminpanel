import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth({
  pages: {
    signIn: "/login",  // Redirect to login page if not authenticated
  },
  callbacks: {
    async authorized({ req, token }) {
      const currentTime = Math.floor(Date.now() / 1000);
      
      // Check if token exists and is not expired
      if (!token || (token.expiresAt && currentTime >= token.expiresAt)) {
        return false; // Redirect to login if token is missing or expired
      }

      return true;
    },
  },
});

export function middleware(req) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("next-auth.session-token") || req.cookies.get("__Secure-next-auth.session-token");


  // If already logged in and tries to access /login, redirect to /dashboard
  if (token && pathname === "/login") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // If not authenticated, redirect to /login
  if (!token && pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)", // Protect all routes except specified paths
  ],
};
