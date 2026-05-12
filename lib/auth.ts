import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { getDb } from "./db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const db = await getDb();
        const user = await db
          .collection("users")
          .findOne({ email: credentials.email });
        if (!user) return null;
        const valid = await bcrypt.compare(
          credentials.password as string,
          user.password,
        );
        if (!valid) return null;
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = (user as any).role;
      return token;
    },
    async session({ session, token }) {
      if (session.user) (session.user as any).role = token.role;
      return session;
    },
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const db = await getDb();
        const existing = await db
          .collection("users")
          .findOne({ email: user.email });
        if (!existing) {
          await db.collection("users").insertOne({
            name: user.name,
            email: user.email,
            role: "user",
            provider: "google",
            avatar: user.image,
            createdAt: new Date(),
          });
        }
        (user as any).role = existing?.role || "user";
      }
      return true;
    },
  },
  pages: { signIn: "/login" },
  session: { strategy: "jwt" },
});
