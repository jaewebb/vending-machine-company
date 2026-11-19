"use client";

import { useSession } from "~/app/auth-client";

export function UserGreeting() {
  const { data: session } = useSession();

  if (!session?.user) return null;

  const { user } = session;

  return <h2>Welcome, {user.name || "User"}!</h2>;
}
