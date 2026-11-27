import { useId } from "react";
import { tv } from "tailwind-variants";

interface DatePickerProps {
  disabled?: boolean;
  id?: string;
  label: string;
  max?: string;
  min?: string;
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

const datePicker = tv({
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

export function DatePicker({
  disabled = false,
  id,
  label,
  max,
  min,
  name,
  placeholder,
  required = false,
  size = "md",
  value,
  onBlur,
  onChange,
  onFocus,
}: DatePickerProps) {
  const uid = useId();

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name}>{label}</label>
      <input
        className={datePicker({ size })}
        disabled={disabled}
        id={id ?? uid}
        max={max}
        min={min}
        name={name}
        onBlur={onBlur ? (e) => onBlur(e.target.value) : undefined}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        onFocus={onFocus ? (e) => onFocus(e.target.value) : undefined}
        placeholder={placeholder}
        required={required}
        type="date"
        value={value}
      />
    </div>
  );
}
