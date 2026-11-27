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
  base: "flex justify-center items-center gap-2 rounded-sm transition",
  variants: {
    kind: {
      default: "bg-slate-900 hover:bg-slate-700 text-white",
      disabled: "bg-slate-600 hover:bg-slate-700 text-white",
      iconOnly: "text-slate-800 hover:text-slate-600",
      transparent: "py-0",
    },
    size: {
      sm: "text-sm",
      md: "",
    },
  },
  compoundVariants: [
    {
      kind: ["default", "disabled"],
      size: "md",
      class: "px-4 py-2",
    },
    {
      kind: ["iconOnly"],
      size: "md",
      class: "p-4",
    },
  ],
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
