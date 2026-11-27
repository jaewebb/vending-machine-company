import { Button } from "~/app/_components/ui/button/button";

export function ErrorMessage({ message, reset }: { message: string; reset: () => void }) {
  return (
    <div className="flex flex-col justify-center items-center md:gap-4 gap-2">
      <h2>Something went wrong!</h2>
      <p>{message}</p>
      <Button label="Try again" onClick={() => reset()} />
    </div>
  );
}
