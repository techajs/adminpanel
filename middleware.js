import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",  // Redirect to login page if not authenticated
  },
  callbacks: {
    async authorized({ req, token }) {
      const currentTime = Math.floor(Date.now() / 1000);
      
      // Check for token expiration
      if (token?.expiresAt && currentTime >= token.expiresAt) {
        return false; // Token expired, not authorized
      }
      
      // Make sure there's a valid token
      return !!token;
    },
  },
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)", // Protect all routes except specified paths
  ],
};
