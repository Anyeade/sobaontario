import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "./db";
import { members } from "./db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db) as any,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Hardcoded admin login
        if (credentials.email === "admin" && credentials.password === "Mnbvcxzl@5") {
          return {
            id: "admin-hardcoded",
            email: "admin@sobaontario.org",
            name: "SOBA Admin",
            role: "super_admin",
            image: undefined,
          };
        }

        try {
          const user = await db
            .select()
            .from(members)
            .where(eq(members.emailAddress, credentials.email))
            .limit(1);

          if (!user[0]) {
            return null;
          }

          const member = user[0];

          // Check if user is active
          if (!member.isActive) {
            return null;
          }

          // Verify password
          if (!member.password) {
            return null;
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            member.password
          );

          if (!isPasswordValid) {
            return null;
          }

          // Update last login
          await db
            .update(members)
            .set({ lastLogin: new Date() })
            .where(eq(members.id, member.id));

          return {
            id: member.id,
            email: member.emailAddress,
            name: member.fullName,
            role: member.role || "member",
            image: member.profileImage || undefined,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
}; 