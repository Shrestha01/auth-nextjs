"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") return <div>Loading...</div>;

  return (
    <main style={{ padding: "2rem" }}>
      <h1>NextAuth + Postgres + Drizzle</h1>

      {session ? (
        <div>
          <p>
            Signed in as <strong>{session.user.email}</strong>
          </p>
          <button onClick={() => signOut()}>Sign Out</button>
        </div>
      ) : (
        <div>
          <p>You are not signed in.</p>
          {/* This triggers the NextAuth default login page */}
          <button onClick={() => signIn()}>Sign In</button>
        </div>
      )}
    </main>
  );
}
