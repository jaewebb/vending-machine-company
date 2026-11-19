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
  base: "bg-[#151c2c] text-white backdrop:backdrop-blur-xs backdrop:bg-black/50 backdrop:overflow-hidden backdrop:overscroll-contain overscroll-contain shadow-md m-auto rounded-sm p-5",
  variants: {
    size: {
      sm: "w-1/3",
      md: "w-1/2",
      lg: "w-3/4",
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
          iconOnly
          label="close"
          onClick={onClose}
        />
      </div>
      <div className="my-10">{children}</div>
      <div className="flex justify-end mt-5">{footer}</div>
    </dialog>
  );
}
