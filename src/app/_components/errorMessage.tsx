import { Button } from "~/app/_components/ui/button/button";

export function ErrorMessage({ message, reset }: { message: string; reset: () => void }) {
  return (
    <div className="flex flex-col grow justify-center items-center gap-4">
      <h2>Something went wrong!</h2>
      <p>{message}</p>
      <Button label="Try again" onClick={() => reset()} />
    </div>
  );
}
