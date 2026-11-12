import { type ComponentPropsWithoutRef, type ReactNode, useId } from "react";
import { tv } from "tailwind-variants";

interface ButtonProps {
  icon?: ReactNode;
  iconOnly?: boolean;
  iconPosition?: "left" | "right";
  label: string;
  size?: "sm" | "md";
  type?: "button" | "submit" | "reset";
}

const button = tv({
  base: "flex justify-center items-center gap-2 rounded-sm bg-white/10 font-semibold transition hover:bg-white/20 py-5",
  variants: {
    size: {
      sm: "h-8 px-3 text-sm",
      md: "h-10 px-4",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export function Button({
  disabled = false,
  icon,
  iconOnly = false,
  iconPosition = "right",
  id,
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
      aria-label={iconOnly ? label : undefined}
      className={button({ size })}
      disabled={disabled}
      id={id ?? uid}
      name={name}
      onClick={onClick}
      type={type}
      {...props}
    >
      {iconPosition === "left" && icon}
      {!iconOnly && label}
      {iconPosition === "right" && icon}
    </button>
  );
}
