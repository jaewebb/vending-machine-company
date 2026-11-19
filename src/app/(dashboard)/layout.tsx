import "~/styles/globals.css";

import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { Wrapper } from "~/app/_components/wrapper";
import { auth } from "~/server/auth";
import { TRPCReactProvider } from "~/trpc/react";

export type AuthSession = typeof auth.$Infer.Session;

export const metadata: Metadata = {
  title: "Sample Vending Machine Company App",
  description: "An app for my portfolio, for a fake vending machine company",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  let session: AuthSession | null;
  try {
    session = await auth.api.getSession({
      headers: await headers(),
    });
  } catch (e: unknown) {
    return (
      <html className={`${geist.variable} h-full`} lang="en">
        <body className="h-full">
          <main className="flex grow justify-center items-center bg-linear-to-b from-[#152649] to-[#151c2c] text-white">
            <div>{String(e)}</div>
          </main>
        </body>
      </html>
    );
  }

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <html className={`${geist.variable} h-full`} lang="en">
      <body className="h-full">
        <TRPCReactProvider>
          <Wrapper>{children}</Wrapper>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
