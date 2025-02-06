import { BASE_URL } from "@/utils/constants";
import NextAuth, { getServerSession } from "next-auth";
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

const authOptions = {
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
  },
  callbacks: {
    async jwt({ token, user,trigger,session }) {
      const currentTime = Math.floor(Date.now() / 1000);
      if (user) {
        console.log("userend",user)
        // On initial login, store user info and set token expiry time
        token.username = user.username;
        token.email = user.email;
        token.token = user.token;
        token.role = user.role;
        token.firstname = user.firstname;
        token.lastname = user.lastname;
        token.webToken = user?.webToken;
        token.expiresAt = currentTime + 60 * 60; // Set token expiry time (1 hour)
      }
      

      if (trigger === "update" && session?.webToken) {
        console.log("Updating webToken:", session.webToken);
        token.webToken = session.webToken; // Ensure webToken updates
      }
      // Check if the token is expired and invalidate it if necessary
      if (token.expiresAt && currentTime >= token.expiresAt) {
        return { ...token, expired: true };
      }

      return token;
    },
    async session({ session, token }) {
      // Pass user data from token to session
      session.username = token.username;
      session.lastname = token.lastname;
      session.firstname = token.firstname;
      session.email = token.email;
      session.token = token.token;
      session.role = token.role;
      session.expiresAt = token.expiresAt;
      session.webToken = token?.webToken;
      
      // If token is expired, trigger signOut
      if (token.expired) {
        signOut({ callbackUrl: "/login" });
      }

      return session;
    },
  },
  pages: {
    signIn: "/login", // Custom login page
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
