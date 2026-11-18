import "~/styles/globals.css";

import type { Metadata } from "next";
import { Geist } from "next/font/google";

import type { auth } from "~/server/auth";

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
  return (
    <html className={`${geist.variable}`} lang="en">
      <body>
        <main className="flex grow justify-center items-center min-h-screen bg-linear-to-b from-[#152649] to-[#151c2c] text-white">
          {children}
        </main>
      </body>
    </html>
  );
}
