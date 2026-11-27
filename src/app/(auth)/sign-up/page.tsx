"use client";

import "~/styles/globals.css";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "~/app/_components/ui/button/button";
import { TextInput } from "~/app/_components/ui/input/textInput";
import { signUp } from "~/app/auth-client";

export default function SignUpPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);

    const res = await signUp.email({
      name: formData.get("name") as string,
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
    <div className="flex flex-col md:gap-4 gap-2 mx-auto md:w-1/3 w-full">
      <h1 className="text-2xl">Sign Up</h1>
      <p>
        Feel free to make up an email if you don't want to share your real one, it won't need to be
        verified.
      </p>
      <p>Please do not use a password you use somewhere else, this is a portfolio project.</p>
      {error && <p className="text-red-500">{error}</p>}
      <form className="flex flex-col md:gap-4 gap-2" onSubmit={handleSubmit}>
        <TextInput label="Full Name" name="name" placeholder="First Last" required />
        <TextInput label="Email" name="email" placeholder="Email" required type="email" />
        <TextInput
          label="Password"
          minLength={8}
          name="password"
          placeholder="Password"
          required
          type="password"
        />
        <Button label="Create Account" type="submit" />
      </form>
      <div>
        Already have an account?{" "}
        <Link className="hover:underline" href="/sign-in">
          Sign in
        </Link>
      </div>
    </div>
  );
}
