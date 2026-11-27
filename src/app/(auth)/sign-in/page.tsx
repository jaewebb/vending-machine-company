"use client";

import "~/styles/globals.css";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type SubmitEvent, useState } from "react";
import { Button } from "~/app/_components/ui/button/button";
import { TextInput } from "~/app/_components/ui/input/textInput";
import { signIn } from "~/app/auth-client";

export default function SignInPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);

    const res = await signIn.email({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });

    if (res.error) {
      setError(res.error.message || "Something went wrong.");
    } else {
      router.push("/");
    }
  }

  return (
    <div className="flex flex-col w-full min-w-0 min-h-0 md:gap-4 gap-2 mx-auto md:w-1/3 overflow-auto">
      <h1 className="text-2xl">Sign In</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form className="flex flex-col md:gap-4 gap-2" onSubmit={handleSubmit}>
        <TextInput label="Email" name="email" placeholder="Email" required type="email" />
        <TextInput
          label="Password"
          name="password"
          placeholder="Password"
          required
          type="password"
        />
        <Button label="Sign In" type="submit" />
      </form>
      <div>
        Already have an account?{" "}
        <Link className="hover:underline" href="/sign-up">
          Sign Up
        </Link>
      </div>
    </div>
  );
}
