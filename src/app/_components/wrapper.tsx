"use client";

import { useRouter } from "next/navigation";
import { type ReactNode, useEffect, useState } from "react";
import { Header } from "~/app/_components/header";
import { Sidebar } from "~/app/_components/sidebar/sidebar";
import { useSession } from "~/app/auth-client";

export function Wrapper({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const [sidebarIsOpen, setSidebarIsOpen] = useState(true);

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/sign-in");
    }
  }, [isPending, session, router]);

  if (isPending) return <p className="text-center mt-8 text-white">Loading...</p>;
  if (!session?.user) return <p className="text-center mt-8 text-white">Redirecting...</p>;

  return (
    <div className="flex h-full">
      <Sidebar isOpen={sidebarIsOpen} setIsOpen={setSidebarIsOpen} />
      <div className="flex flex-col grow">
        <Header />
        <main className="flex grow bg-linear-to-b from-[#152649] to-[#151c2c] text-white">
          {children}
        </main>
      </div>
    </div>
  );
}
