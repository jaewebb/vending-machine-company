import "~/styles/globals.css";

import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { LayoutWrapper } from "~/app/_components/layout/layoutWrapper";
import { MainWrapper } from "~/app/_components/layout/mainWrapper";
import { Wrapper } from "~/app/_components/layout/wrapper";
import { auth } from "~/server/auth";
import { TRPCReactProvider } from "~/trpc/react";

export type AuthSession = typeof auth.$Infer.Session;

export const metadata: Metadata = {
  title: "Sample Vending Machine Company App",
  description: "An app for my portfolio, for a fake vending machine company",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  let session: AuthSession | null;
  try {
    session = await auth.api.getSession({
      headers: await headers(),
    });
  } catch (e: unknown) {
    return (
      <LayoutWrapper>
        <MainWrapper>
          <div className="mx-auto">
            <p>{String(e)}</p>
          </div>
        </MainWrapper>
      </LayoutWrapper>
    );
  }

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <LayoutWrapper>
      <TRPCReactProvider>
        <Wrapper>{children}</Wrapper>
      </TRPCReactProvider>
    </LayoutWrapper>
  );
}
