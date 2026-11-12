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
  width?: "sm" | "md" | "lg" | "full";
  onBlur?: (value: string) => void;
  onChange?: (value: string) => void;
  onFocus?: (value: string) => void;
}

const datePicker = tv({
  base: "rounded-sm bg-white/10 py-2 text-white",
  variants: {
    size: {
      sm: "h-8 px-3 text-sm",
      md: "h-10 px-4",
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
  width = "full",
  onBlur,
  onChange,
  onFocus,
}: DatePickerProps) {
  const uid = useId();

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name}>{label}</label>
      <input
        className={datePicker({ size, width })}
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
