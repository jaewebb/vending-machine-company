export function MainWrapper({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="flex max-w-full max-h-full min-w-0 min-h-0 overflow-auto text-slate-950 4k:p-16 2k:p-12 3xl-p-10 md:p-8 p-4">
      {children}
    </main>
  );
}
