import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async authorized({ req, token }) {
      const currentTime = Math.floor(Date.now() / 1000);
      if (token?.expiresAt && currentTime >= token.expiresAt) {
        return false; // Redirect to login if token expired
      }
      return !!token;
    },
  },
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"], // Protect all routes except specified paths
};

