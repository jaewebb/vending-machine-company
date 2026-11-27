import { Open_Sans } from "next/font/google";

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  weight: ["400", "600"],
});

export function LayoutWrapper({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html className={`${openSans.variable} w-dvw h-dvh overflow-hidden`} lang="en">
      <body className="w-dvw h-dvh overflow-hidden">{children}</body>
    </html>
  );
}
