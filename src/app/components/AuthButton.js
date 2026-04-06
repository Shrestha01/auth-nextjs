"use client"; // Critical: Hooks like useSession only work in Client Components
import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButton() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;

  if (session) {
    return (
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <p>Hi, {session.user.name || session.user.email}</p>
        <button onClick={() => signOut()}>Sign Out</button>
      </div>
    );
  }

  return <button onClick={() => signIn()}>Sign In</button>;
}
