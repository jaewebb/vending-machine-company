import { useId } from "react";
import { tv } from "tailwind-variants";

interface CheckboxProps {
  disabled?: boolean;
  id?: string;
  label: string;
  name: string;
  value?: boolean;
  onChange?: (value: boolean) => void;
}

const checkbox = tv({
  base: "rounded-sm bg-slate/10 py-2",
  variants: {
    disabled: {
      true: "text-grey",
      false: "text-slate-950",
    },
  },
  defaultVariants: {
    disabled: false,
  },
});

export function Checkbox({ disabled = false, id, label, name, value, onChange }: CheckboxProps) {
  const uid = useId();

  return (
    <div className="flex items-center gap-2">
      <label htmlFor={name}>{label}</label>
      <input
        checked={value}
        className={checkbox({ disabled })}
        disabled={disabled}
        id={id ?? uid}
        name={name}
        onChange={onChange ? (e) => onChange(e.target.checked) : undefined}
        type="checkbox"
      />
    </div>
  );
}
