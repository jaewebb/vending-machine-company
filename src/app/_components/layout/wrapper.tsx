"use client";

import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { type ReactNode, useEffect, useState } from "react";
import { Header } from "~/app/_components/header";
import { MainWrapper } from "~/app/_components/layout/mainWrapper";
import { PageWrapper } from "~/app/_components/layout/pageWrapper";
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

  if (isPending)
    return (
      <div className="flex justify-center items-center h-full w-full bg-linear-to-b from-slate-50 to-slate-200 text-slate-950">
        <LoaderCircle aria-label="loading" className="animate-spin" size="100" />
      </div>
    );
  if (!session?.user)
    return (
      <div className="flex justify-center items-center h-full w-full bg-linear-to-b from-slate-50 to-slate-200 text-slate-950 text-4xl">
        <p>Redirecting...</p>
      </div>
    );

  return (
    <PageWrapper>
      <div className={`${sidebarIsOpen && "w-1/6"} min-w-fit shrink-0 bg-slate-900`}>
        <Sidebar isOpen={sidebarIsOpen} setIsOpen={setSidebarIsOpen} />
      </div>
      <div className="flex flex-col w-full min-w-0 min-h-0 overflow-hidden bg-linear-to-b from-slate-50 to-slate-200">
        <Header />
        <MainWrapper>{children}</MainWrapper>
      </div>
    </PageWrapper>
  );
}
