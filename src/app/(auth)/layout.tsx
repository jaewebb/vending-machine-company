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
    <html className={`${geist.variable} h-full`} lang="en">
      <body className="h-full">
        <main className="flex h-full justify-center items-center bg-linear-to-b from-[#152649] to-[#151c2c] text-white">
          {children}
        </main>
      </body>
    </html>
  );
}
