"use client";

import { Button } from "~/app/_components/ui/button/button";
import { signOut, useSession } from "~/app/auth-client";

export function UserGreeting() {
  const { data: session } = useSession();

  if (!session?.user) return null;

  const { user } = session;

  return (
    <>
      <h1>Welcome, {user.name || "User"}!</h1>
      <p>Email: {user.email}</p>
      <Button label="Sign Out" onClick={() => signOut()} />
    </>
  );
}
