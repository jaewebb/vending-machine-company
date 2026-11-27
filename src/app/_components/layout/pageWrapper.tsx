export function PageWrapper({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className="flex w-dvw h-dvh overflow-hidden">{children}</div>;
}
