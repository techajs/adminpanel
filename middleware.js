import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async authorized({ req, token }) {
      const currentTime = Math.floor(Date.now() / 1000);
      if (token?.expiresAt && currentTime >= token.expiresAt) {
        return false; // Redirect to login
      }
      return !!token;
    },
  },
});
export const config = {
  matcher: ["/:path*"], // Protect all routes
};
