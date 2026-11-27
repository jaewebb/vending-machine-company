import { useId } from "react";
import { tv } from "tailwind-variants";

interface NumberInputProps {
  disabled?: boolean;
  id?: string;
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  size?: "sm" | "md";
  value?: number;
  onBlur?: (value: number) => void;
  onChange?: (value: number) => void;
  onFocus?: (value: number) => void;
}

const numberInput = tv({
  base: "rounded-sm py-2 bg-slate-50 text-slate-950",
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

export function NumberInput({
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
}: NumberInputProps) {
  const uid = useId();

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name}>{label}</label>
      <input
        className={numberInput({ size })}
        disabled={disabled}
        id={id ?? uid}
        name={name}
        onBlur={onBlur ? (e) => onBlur(e.target.valueAsNumber) : undefined}
        onChange={onChange ? (e) => onChange(e.target.valueAsNumber) : undefined}
        onFocus={onFocus ? (e) => onFocus(e.target.valueAsNumber) : undefined}
        placeholder={placeholder}
        required={required}
        type="number"
        value={value}
      />
    </div>
  );
}
