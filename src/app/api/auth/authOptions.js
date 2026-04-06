import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { db } from "@/app/db/index"; // Ensure this matches your src/db/index.js
import { users } from "@/app/db/schema"; // Ensure this matches your src/db/schema.js

export const authOptions = {
  // Use JWT strategy for Credentials login
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter an email and password");
        }

        // 1. Find user in Postgres
        const [user] = await db
          .select()
          .from(users)
          .where(eq(users.email, credentials.email));

        // 2. Check if user exists and has a password
        if (!user || !user.password) {
          throw new Error("No user found with that email");
        }

        // 3. Compare hashed password
        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password,
        );

        if (!passwordMatch) {
          throw new Error("Incorrect password");
        }

        // 4. Return user object (NextAuth saves this in the JWT)
        return {
          id: user.id.toString(), // Convert serial integer to string
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  // Secret for signing cookies (must be in .env.local)
  secret: process.env.NEXTAUTH_SECRET,
};
