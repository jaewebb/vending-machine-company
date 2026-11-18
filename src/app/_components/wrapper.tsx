"use client";

import { type ReactNode, useState } from "react";

import { Header } from "~/app/_components/header";
import { Sidebar } from "~/app/_components/sidebar/sidebar";
import { useSession } from "~/app/auth-client";

export function Wrapper({ children }: { children: ReactNode }) {
  const { data: session, isPending } = useSession();

  const [sidebarIsOpen, setSidebarIsOpen] = useState(true);

  if (isPending) return <p className="text-center mt-8 text-white">Loading...</p>;
  if (!session?.user) return <p className="text-center mt-8 text-white">Redirecting...</p>;

  return (
    <>
      <Header setSidebarIsOpen={setSidebarIsOpen} sidebarIsOpen={sidebarIsOpen} />
      <div className="flex">
        <Sidebar isOpen={sidebarIsOpen} />
        <main className="flex grow min-h-screen bg-linear-to-b from-[#152649] to-[#151c2c] text-white">
          {children}
        </main>
      </div>
    </>
  );
}
