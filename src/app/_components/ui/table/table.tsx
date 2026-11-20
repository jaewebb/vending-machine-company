import { type ReactNode, useId } from "react";
import { Button } from "~/app/_components/ui/button/button";
import { TextInput } from "~/app/_components/ui/input/textInput";

interface Column {
  label: string;
  srOnly?: boolean;
  value?: string;
  onClick?: (column: string) => void;
}

interface Row {
  id: string | number;
  cells: Array<Cell>;
}

interface Cell {
  key: string | number;
  value: string | number | ReactNode;
}

interface TableProps {
  columns?: Array<Column>;
  id: string;
  rows?: Array<Row>;
  size?: "sm" | "md";
  searchValue?: string;
  setSearchValue?: (searchValue: string) => void;
}

export function Table({ columns, id, rows, size = "md", searchValue, setSearchValue }: TableProps) {
  const uid = useId();

  return (
    <>
      <div className="flex items-center gap-2">
        <TextInput label="Search" name="search" onChange={setSearchValue} value={searchValue} />
      </div>
      {rows?.length ? (
        <table className="table-auto border border-white border-collapse bg-white/7" id={id ?? uid}>
          {columns && (
            <thead>
              <tr className="border border-white text-left">
                {columns.map((c) => {
                  return (
                    <th
                      className={`p-2 ${c.srOnly && "sr-only"}`}
                      key={c.value ?? c.label}
                      scope="col"
                    >
                      {c.onClick ? (
                        <Button
                          kind="transparent"
                          label={c.label}
                          onClick={() => c.onClick?.(c.value || "")}
                        />
                      ) : (
                        <span>{c.label}</span>
                      )}
                    </th>
                  );
                })}
              </tr>
            </thead>
          )}
          <tbody>
            {rows.map((r) => {
              return (
                <tr className="border border-white" key={`row-${r.id}`}>
                  {r.cells.map((c) => {
                    return (
                      <td
                        className={`border-y border-white ${size === "md" ? "p-2" : "p-1"}`}
                        key={`cell-${r.id}-${c.key}`}
                      >
                        {c.value}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div>there are no items to show</div>
      )}
    </>
  );
}
