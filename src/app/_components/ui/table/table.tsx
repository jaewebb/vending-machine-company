import { type ReactNode, useId } from "react";

interface Column {
  srOnly?: boolean;
  value: string;
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
}

export function Table({ columns, id, rows, size = "md" }: TableProps) {
  const uid = useId();

  if (!rows?.length) {
    return <div>there are no items to show</div>;
  }

  return (
    <table className="table-auto border border-white border-collapse bg-white/7" id={id ?? uid}>
      {columns && (
        <thead>
          <tr className="border border-white text-left">
            {columns.map((c) => {
              return (
                <th className={`p-2 ${c.srOnly && "sr-only"}`} key={c.value} scope="col">
                  {c.value}
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
  );
}
