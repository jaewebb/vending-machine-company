import { type ComponentPropsWithoutRef, type ReactNode, useId } from "react";
import { tv } from "tailwind-variants";

interface ButtonProps {
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  kind?: "default" | "iconOnly" | "transparent" | "disabled";
  label: string;
  size?: "sm" | "md";
  type?: "button" | "submit" | "reset";
}

const button = tv({
  base: "flex justify-center items-center gap-2 rounded-sm font-semibold transition hover:bg-white/20 py-5",
  variants: {
    kind: {
      default: "bg-white/10",
      disabled: "bg-white/30",
      iconOnly: "",
      transparent: "",
    },
    size: {
      sm: "h-8 px-3 text-sm",
      md: "h-10 px-4",
    },
  },
  defaultVariants: {
    kind: "default",
    size: "md",
  },
});

export function Button({
  icon,
  iconPosition = "right",
  id,
  kind = "default",
  label,
  name,
  size = "md",
  type = "button",
  onClick,
  ...props
}: ButtonProps & ComponentPropsWithoutRef<"button">) {
  const uid = useId();

  return (
    <button
      aria-disabled={kind === "disabled"}
      aria-label={kind === "iconOnly" ? label : undefined}
      className={button({ kind, size })}
      id={id ?? uid}
      name={name}
      onClick={kind === "disabled" ? () => {} : onClick}
      type={type}
      {...props}
    >
      {iconPosition === "left" && icon}
      {kind !== "iconOnly" && label}
      {iconPosition === "right" && icon}
    </button>
  );
}
