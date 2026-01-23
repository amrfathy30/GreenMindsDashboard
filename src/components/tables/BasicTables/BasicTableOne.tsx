/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";

interface Column {
  key: string;
  label: string;
  render?: (item: any) => React.ReactNode;
}

interface ExpandableConfig {
  canExpand: (row: any) => boolean;
  title?: string | ((row: any) => string);
  renderExpandedRows: (row: any) => React.ReactNode[];
}

interface GenericTableProps {
  columns: Column[];
  data: any[];
  expandable?: ExpandableConfig;
}

export default function BasicTableOne({
  columns,
  data,
  expandable,
}: GenericTableProps) {
  const [expandedRowId, setExpandedRowId] = useState<number | null>(null);

  const handleRowClick = (row: any) => {
    if (!expandable?.canExpand(row)) return;

    setExpandedRowId((prev) => (prev === row.id ? null : row.id));
  };

  return (
    <div className="overflow-hidden rounded-xl bg-white">
      <div className="max-w-full overflow-x-auto">
        <Table className="border">
          <TableHeader className="border-b bg-[#25B16F] capitalize">
            <TableRow>
              {columns.map((col) => (
                <TableCell
                  key={col.key}
                  isHeader
                  className="px-5 py-3 text-center text-lg text-white"
                >
                  {col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((row, rowIndex) => {
              const isExpanded = expandedRowId === row.id;

              return (
                <React.Fragment key={row.id}>
                  {/* Main Row */}
                  <TableRow
                    className={`
    ${rowIndex % 2 === 0 ? "bg-[#F5F4F4]" : "bg-[#EAE7E7]"}
    ${isExpanded ? "bg-[#DFF5EA]" : ""}
  `}
                  >
                    {columns.map((col) => (
                      <TableCell
                        key={col.key}
                        onClick={() => handleRowClick(row)}
                        className="cursor-pointer text-center text-lg py-3 font-semibold"
                      >
                        {col.render ? col.render(row) : row[col.key]}
                      </TableCell>
                    ))}
                  </TableRow>

                  {/* Expanded Rows */}
                  {isExpanded && expandable && (
                    <>
                      {/* Title Row */}
                      {expandable.title && (
                        <TableRow>
                          <TableCell
                            colSpan={columns.length}
                            className="px-8 py-3 font-bold text-lg"
                          >
                            {typeof expandable.title === "function"
                              ? expandable.title(row)
                              : expandable.title}
                          </TableCell>
                        </TableRow>
                      )}

                      {/* Expanded Rows */}
                      {expandable
                        .renderExpandedRows(row)
                        .map((expandedRow, index) => (
                          <TableRow
                            key={`${row.id}-child-${index}`}
                            className="bg-gray-100"
                          >
                            <TableCell
                              colSpan={columns.length}
                              className="px-8 py-3 bg-white"
                            >
                              {expandedRow}
                            </TableCell>
                          </TableRow>
                        ))}
                    </>
                  )}
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
