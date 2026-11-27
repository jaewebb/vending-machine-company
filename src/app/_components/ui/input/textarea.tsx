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
  onBlur?: (value: string) => void;
  onChange?: (value: string) => void;
  onFocus?: (value: string) => void;
}

const textArea = tv({
  base: "rounded-sm bg-slate-200 py-2 text-slate-950",
  variants: {
    size: {
      sm: "h-16 px-3 text-sm",
      md: "h-20 px-4",
    },
  },
  defaultVariants: {
    size: "md",
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
  onBlur,
  onChange,
  onFocus,
}: TextAreaProps) {
  const uid = useId();

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name}>{label}</label>
      <textarea
        className={textArea({ size })}
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
