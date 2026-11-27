import { type ComponentPropsWithoutRef, useId } from "react";
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
  height?: "sm" | "md";
  id?: string;
  label: string;
  name: string;
  options: Array<Option>;
  selectOptionValue?: "" | -1;
  value?: string | number;
}

const select = tv({
  base: "rounded-sm py-2 bg-slate-200 text-slate-950",
  variants: {
    height: {
      sm: "px-3 text-sm",
      md: "px-4",
    },
  },
  defaultVariants: {
    height: "md",
  },
});

export function Select({
  height = "md",
  id,
  label,
  name,
  options,
  selectOptionValue = "",
  value,
  ...rest
}: SelectProps & ComponentPropsWithoutRef<"select">) {
  const uid = useId();

  return (
    <div className="flex flex-col gap-2 w-full">
      <label htmlFor={name}>{label}</label>
      <select className={select({ height })} id={id ?? uid} name={name} value={value} {...rest}>
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
