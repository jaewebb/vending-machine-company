import "~/styles/globals.css";

import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Wrapper } from "~/app/_components/wrapper";
import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  title: "Sample Vending Machine Company App",
  description: "An app for my portfolio, for a fake vending machine company",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html className={`${geist.variable}`} lang="en">
      <body>
        <TRPCReactProvider>
          <Wrapper>{children}</Wrapper>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
