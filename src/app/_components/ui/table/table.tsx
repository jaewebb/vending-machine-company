import { ChevronDown, ChevronsUpDown, ChevronUp } from "lucide-react";
import { type ReactNode, useId, useMemo, useState } from "react";
import { Button } from "~/app/_components/ui/button/button";
import { TextInput } from "~/app/_components/ui/input/textInput";

interface Column {
  isSearchable?: boolean;
  isSortable?: boolean;
  label: string;
  srOnly?: boolean; // don't show the column header, while still allowing screen readers to announce it
  value?: string;
  onClick?: (column: string) => void;
}

interface Row {
  id: string | number;
  cells: Array<Cell>;
}

interface Cell {
  key: string;
  value: string | number | ReactNode;
}

interface TableProps {
  columns: Array<Column>;
  id: string;
  noDataMessage?: ReactNode;
  rows: Array<Row>;
  size?: "sm" | "md";
  tableOptions?: React.ReactNode;
}

export function Table({ columns, id, noDataMessage, rows, size = "md", tableOptions }: TableProps) {
  const uid = useId();

  const [currentSearchTerm, setCurrentSearchTerm] = useState("");
  const [currentSortDirection, setCurrentSortDirection] = useState("asc");
  const [currentSortField, setCurrentSortField] = useState("");

  const rowsMemo = useMemo(() => {
    const getCell = (row: Row, column: string) => row.cells.find((c) => c.key === column);

    let items = [...rows];

    // search
    const searchableColumns = columns.filter((c) => c.isSearchable).map((c) => c.value) ?? [];

    items = items.filter((row) => {
      return row.cells.find((cell) => {
        return (
          searchableColumns.includes(cell.key) &&
          cell.value?.toString().trim().toLowerCase().includes(currentSearchTerm)
        );
      });
    });

    // sort
    if (currentSortField) {
      items = items.sort((a, b) => {
        const rowCellA = getCell(a, currentSortField);
        const rowCellB = getCell(b, currentSortField);

        if (rowCellA?.value == null && rowCellB?.value == null) return 0;
        if (rowCellA?.value == null) return 1;
        if (rowCellB?.value == null) return -1;

        if (typeof rowCellA.value === "string" && typeof rowCellB.value === "string") {
          if (rowCellA.value.trim().toLowerCase() < rowCellB.value.trim().toLowerCase())
            return currentSortDirection === "asc" ? -1 : 1;
          if (rowCellA.value.trim().toLowerCase() > rowCellB.value.trim().toLowerCase())
            return currentSortDirection === "asc" ? 1 : -1;
          return 0;
        } else {
          if (rowCellA.value < rowCellB.value) return currentSortDirection === "asc" ? -1 : 1;
          if (rowCellA.value > rowCellB.value) return currentSortDirection === "asc" ? 1 : -1;
          return 0;
        }
      });
    }

    return items;
  }, [columns, rows, currentSortDirection, currentSearchTerm, currentSortField]);

  if (!rows.length) return noDataMessage ?? <p>There's no data to show.</p>;

  const handleColumnClicked = (newSortField: string) => {
    if (newSortField === currentSortField)
      setCurrentSortDirection(currentSortDirection === "asc" ? "desc" : "asc");
    if (newSortField !== currentSortField) setCurrentSortField(newSortField);
  };

  return (
    <div className="flex flex-col max-h-full max-w-full overflow-hidden md:gap-4 gap-2">
      <div
        className={`flex items-end ${tableOptions ? "justify-between md:gap-4 gap-2" : "justify-end"} shrink-0 overflow-auto`}
      >
        {tableOptions}
        <div className="lg:w-1/3 w-full">
          <TextInput
            label="Search"
            name="search"
            onChange={setCurrentSearchTerm}
            value={currentSearchTerm}
          />
        </div>
      </div>
      {rows.length ? (
        <div className="flex-1 min-h-0 min-w-0 border border-slate-600 overflow-auto">
          <table className="table-auto border-collapse bg-slate-200 w-full" id={id ?? uid}>
            <thead>
              <tr className="text-left">
                {columns.map((c) => {
                  return (
                    <th
                      className={`md:py-2 px-2 py-0 ${c.srOnly ? "sr-only" : ""}`}
                      key={c.value ?? c.label}
                      scope="col"
                    >
                      <div className="flex items-center">
                        {c.isSortable ? (
                          <Button
                            kind="transparent"
                            label={c.label}
                            onClick={() => handleColumnClicked?.(c.value || "")}
                          />
                        ) : (
                          <span>{c.label}</span>
                        )}
                        {c.value === currentSortField ? (
                          currentSortDirection === "asc" ? (
                            <ChevronUp size="16" />
                          ) : (
                            <ChevronDown size="16" />
                          )
                        ) : (
                          c.isSortable && <ChevronsUpDown size="16" />
                        )}
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {rowsMemo.map((r) => {
                return (
                  <tr className="" key={`row-${r.id}`}>
                    {r.cells.map((c) => {
                      return (
                        <td
                          className={`border-t border-slate-600 ${size === "md" ? "p-2" : "p-1"}`}
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
        </div>
      ) : (
        <p>There are no items to show.</p>
      )}
    </div>
  );
}
