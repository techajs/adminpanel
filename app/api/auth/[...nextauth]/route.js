import { BASE_URL } from "@/utils/constants";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signOut } from "next-auth/react";

const login = async (credentials) => {
  const res = await fetch(`${BASE_URL}/admin/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: credentials.email,
      password: credentials.password,
    }),
  });

  const user = await res.json();

  if (res.ok && user) {
    return {
      id: user.user._id,
      firstname: user.user.firstName,
      username: user.user.username,
      lastname: user.user.lastName,
      email: user.user.email,
      role: user.user.role,
      token: user.token,
      webToken: user.user.webToken,
    };
  } else {
    throw new Error("Invalid credentials");
  }
};

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "your-email@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await login(credentials);
        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 7, // ✅ Keeps session for 7 days (adjust if needed)
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.username = user.username;
        token.email = user.email;
        token.token = user.token;
        token.role = user.role;
        token.firstname = user.firstname;
        token.lastname = user.lastname;
        token.webToken = user?.webToken;
      }

      if (trigger === "update" && session?.webToken) {
        token.webToken = session.webToken;
      }

      return token; // ✅ No manual expiry
    },
    async session({ session, token }) {
      session.username = token.username;
      session.lastname = token.lastname;
      session.firstname = token.firstname;
      session.email = token.email;
      session.token = token.token;
      session.role = token.role;
      session.webToken = token?.webToken;

      if (!token.token) {
        if (typeof window !== "undefined") {
          signOut({ redirect: true, callbackUrl: "/login" });
        }
      }
      return session; // ✅ No forced sign-out after 2 minutes
    },
  },
  pages: {
    signIn: "/login", // Custom login page
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
