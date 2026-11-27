import { X } from "lucide-react";
import { type MouseEvent, type ReactNode, useEffect, useId, useRef } from "react";
import { tv } from "tailwind-variants";
import { Button } from "~/app/_components/ui/button/button";

interface ModalProps {
  children: ReactNode;
  footer: ReactNode;
  id?: string;
  isOpen: boolean;
  size?: "sm" | "md" | "lg";
  title: string;
  onClose: () => void;
}

const modal = tv({
  base: "bg-slate-50 text-slate-950 backdrop:backdrop-blur-xs backdrop:overflow-hidden backdrop:overscroll-contain overscroll-contain shadow-md m-auto rounded-sm md:p-5 p-3",
  variants: {
    size: {
      sm: "md:w-1/3 w-dvw",
      md: "md:w-1/2 w-dvw",
      lg: "2xl:w-3/4 w-dvw",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export function Modal({ children, footer, id, isOpen, size = "md", title, onClose }: ModalProps) {
  const uid = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  const handleBackdropClick = (e: MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: this is a dialog. it is closable with esc.
    <dialog
      className={modal({ size })}
      id={id ?? uid}
      onClick={handleBackdropClick}
      onClose={onClose}
      ref={dialogRef}
    >
      <div className="flex justify-between mb-5">
        <h2 className="text-2xl">{title}</h2>
        <Button
          aria-label="Close modal"
          className="cursor-pointer"
          icon={<X />}
          kind="iconOnly"
          label="close"
          onClick={onClose}
        />
      </div>
      <div className="lg:my-10 my-2">{children}</div>
      <div className="flex justify-end mt-5">{footer}</div>
    </dialog>
  );
}
