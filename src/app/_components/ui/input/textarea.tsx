import { useId } from "react";
import { tv } from "tailwind-variants";

interface TextAreaProps {
  disabled?: boolean;
  id?: string;
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  size?: "sm" | "md";
  value?: string;
  width?: "sm" | "md" | "lg" | "full";
  onBlur?: (value: string) => void;
  onChange?: (value: string) => void;
  onFocus?: (value: string) => void;
}

const textArea = tv({
  base: "rounded-sm bg-white/10 py-2 text-white",
  variants: {
    size: {
      sm: "h-16 px-3 text-sm",
      md: "h-20 px-4",
    },
    width: {
      sm: "w-20",
      md: "w-60",
      lg: "w-100",
      full: "w-full",
    },
  },
  defaultVariants: {
    size: "md",
    width: "full",
  },
});

export function TextArea({
  disabled = false,
  id,
  label,
  name,
  placeholder,
  required = false,
  size = "md",
  value,
  width = "full",
  onBlur,
  onChange,
  onFocus,
}: TextAreaProps) {
  const uid = useId();

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name}>{label}</label>
      <textarea
        className={textArea({ size, width })}
        disabled={disabled}
        id={id ?? uid}
        name={name}
        onBlur={onBlur ? (e) => onBlur(e.target.value) : undefined}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        onFocus={onFocus ? (e) => onFocus(e.target.value) : undefined}
        placeholder={placeholder}
        required={required}
        value={value}
      />
    </div>
  );
}
