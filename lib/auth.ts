import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { getDb } from "./db";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
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
    async jwt({ token, user, account }) {
      if (user) token.role = (user as any).role;
      if (account?.provider === "google") {
        // fetch role from DB for Google users
        const db = await getDb();
        const dbUser = await db
          .collection("users")
          .findOne({ email: token.email });
        token.role = dbUser?.role || "user";
        token.id = dbUser?._id?.toString();
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
        (session.user as any).id = token.id || token.sub;
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        const db = await getDb();
        const existing = await db
          .collection("users")
          .findOne({ email: user.email });
        if (!existing) {
          const result = await db.collection("users").insertOne({
            name: user.name,
            email: user.email,
            role: "user",
            provider: "google",
            avatar: user.image,
            createdAt: new Date(),
          });
          (user as any).id = result.insertedId.toString();
          (user as any).role = "user";
        } else {
          (user as any).id = existing._id.toString();
          (user as any).role = existing.role;
        }
      }
      return true;
    },
  },
  pages: { signIn: "/login" },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
};
