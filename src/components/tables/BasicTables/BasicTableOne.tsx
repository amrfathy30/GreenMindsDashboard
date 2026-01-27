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
    <div className="overflow-hidden rounded-xl border dark:border-gray-600">
      <div className="overflow-x-auto w-full">
        {" "}
        <Table className="border-0">
          <TableHeader className="border-b dark:border-gray-600 bg-linear-to-r from-primary to-secondary  capitalize">
            <TableRow>
              {columns.map((col) => (
                <TableCell
                  key={col.key}
                  isHeader
                  className="px-5 py-3 text-start text-lg text-white"
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
    ${rowIndex % 2 === 0 ? "bg-white dark:bg-[#262626]" : "bg-[#D9D9D940] dark:bg-[#323333]"}
    ${isExpanded ? "bg-[#D9D9D940] dark:bg-white/[0.01]" : ""}
  `}
                  >
                    {columns.map((col) => (
                      <TableCell
                        key={col.key}
                        onClick={() => handleRowClick(row)}
                        className="cursor-pointer text-start text-lg px-5 py-2 font-normal dark:text-white"
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
                            className="px-5 py-3 font-semibold text-lg dark:text-white"
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
                            className="bg-gray-100 dark:bg-gray-600"
                          >
                            <TableCell
                              colSpan={columns.length}
                              className="px-5 py-3 bg-white dark:bg-gray-700"
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
