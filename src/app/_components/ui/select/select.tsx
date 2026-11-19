import { useId } from "react";
import { tv } from "tailwind-variants";

export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export interface SelectOptionGroup {
  id: number;
  label: string;
  options: SelectOption[];
}

export type Option = SelectOption | SelectOptionGroup;

function isOptionGroup(option: Option): option is SelectOptionGroup {
  return "options" in option && Array.isArray(option.options);
}

interface SelectProps {
  disabled?: boolean;
  id?: string;
  label: string;
  name: string;
  options: Array<Option>;
  selectOptionValue?: "" | -1;
  size?: "sm" | "md";
  value?: string | number;
  width?: "sm" | "md" | "lg" | "full";
  onChange?: (value: string) => void;
}

const select = tv({
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

export function Select({
  disabled = false,
  id,
  label,
  name,
  options,
  selectOptionValue = "",
  size = "md",
  value,
  width = "full",
  onChange,
}: SelectProps) {
  const uid = useId();

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name}>{label}</label>
      <select
        className={select({ size, width })}
        disabled={disabled}
        id={id ?? uid}
        name={name}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        value={value}
      >
        <option disabled={true} value={selectOptionValue}>
          Select
        </option>
        {options.map((option) => {
          if (isOptionGroup(option)) {
            return (
              <optgroup key={`${option.label}-${option.id}`} label={option.label}>
                {option.options.map((o) => (
                  <option disabled={o.disabled} key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </optgroup>
            );
          }

          return (
            <option disabled={option.disabled} key={option.value} value={option.value}>
              {option.label}
            </option>
          );
        })}
      </select>
    </div>
  );
}
