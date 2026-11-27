import { useId } from "react";
import { tv } from "tailwind-variants";

interface TextInputProps {
  disabled?: boolean;
  id?: string;
  label: string;
  minLength?: number;
  name: string;
  placeholder?: string;
  required?: boolean;
  size?: "sm" | "md";
  type?: "email" | "password" | "tel" | "text" | "url";
  value?: string;
  onBlur?: (value: string) => void;
  onChange?: (value: string) => void;
  onFocus?: (value: string) => void;
}

const textInput = tv({
  base: "rounded-sm bg-slate-200 py-2 text-slate-950",
  variants: {
    size: {
      sm: "px-3 text-sm",
      md: "px-4",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export function TextInput({
  disabled = false,
  id,
  label,
  minLength,
  name,
  placeholder,
  required = false,
  size = "md",
  type = "text",
  value,
  onBlur,
  onChange,
  onFocus,
}: TextInputProps) {
  const uid = useId();

  return (
    <div className="flex flex-col gap-2 w-full">
      <label htmlFor={name}>{label}</label>
      <input
        className={textInput({ size })}
        disabled={disabled}
        id={id ?? uid}
        minLength={minLength}
        name={name}
        onBlur={onBlur ? (e) => onBlur(e.target.value) : undefined}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        onFocus={onFocus ? (e) => onFocus(e.target.value) : undefined}
        placeholder={placeholder}
        required={required}
        type={type}
        value={value}
      />
    </div>
  );
}
