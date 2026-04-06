import NextAuth from "next-auth";
import { authOptions } from "@/app/api/auth/authOptions";

const handler = NextAuth(authOptions);

// This is the key for the App Router
export { handler as GET, handler as POST };
