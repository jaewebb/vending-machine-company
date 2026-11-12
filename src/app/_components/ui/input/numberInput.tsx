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
  width?: "sm" | "md" | "lg" | "full";
  onBlur?: (value: number) => void;
  onChange?: (value: number) => void;
  onFocus?: (value: number) => void;
}

const numberInput = tv({
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

export function NumberInput({
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
}: NumberInputProps) {
  const uid = useId();

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name}>{label}</label>
      <input
        className={numberInput({ size, width })}
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
