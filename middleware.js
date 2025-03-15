import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth({
  pages: {
    signIn: "/login", // Redirect to login page if not authenticated
  },
  callbacks: {
    async authorized({ token }) {
      const currentTime = Math.floor(Date.now() / 1000);

      // Redirect to login if token is missing or expired
      if (!token || (token.expiresAt && currentTime >= token.expiresAt)) {
        return false;
      }

      return true;
    },
  },
});

export function middleware(req) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("next-auth.session-token") || req.cookies.get("__Secure-next-auth.session-token");

  // If authenticated and tries to access /login, redirect to /dashboard
  if (token && pathname === "/login") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
  if (!token && pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// Apply middleware only to protected routes
export const config = {
  matcher: [
    "/dashboard/:path*", 
    "/consumer/:path*", 
    "/enterprise/:path*", 
    "/deliveryboy/:path*", 
    "/order/:path*", 
    "/((?!api|_next/static|_next/image|favicon.ico).*)", // Protect all routes except public assets & API
  ],
};
