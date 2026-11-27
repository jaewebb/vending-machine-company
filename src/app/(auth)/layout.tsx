import "~/styles/globals.css";

import type { Metadata } from "next";
import { LayoutWrapper } from "~/app/_components/layout/layoutWrapper";
import { MainWrapper } from "~/app/_components/layout/mainWrapper";
import { PageWrapper } from "~/app/_components/layout/pageWrapper";
import type { auth } from "~/server/auth";
export type AuthSession = typeof auth.$Infer.Session;

export const metadata: Metadata = {
  title: "Sample Vending Machine Company App",
  description: "An app for my portfolio, for a fake vending machine company",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <LayoutWrapper>
      <PageWrapper>
        <div className="flex flex-col w-full min-w-0 min-h-0 overflow-hidden bg-linear-to-b from-slate-50 to-slate-200">
          <MainWrapper>{children}</MainWrapper>
        </div>
      </PageWrapper>
    </LayoutWrapper>
  );
}
