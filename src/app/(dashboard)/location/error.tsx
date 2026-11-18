"use client";

import { ErrorMessage } from "~/app/_components/errorMessage";

export default function LocationError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <ErrorMessage message={error.message} reset={reset} />;
}
