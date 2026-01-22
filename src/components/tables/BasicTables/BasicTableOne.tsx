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

interface GenericTableProps {
  columns: Column[];
  data: any[];
}

export default function BasicTableOne({ columns, data }: GenericTableProps) {
  return (
    <div className="overflow-hidden rounded-xl bg-white">
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-b bg-[#25B16F]">
            <TableRow>
              {columns.map((col) => (
                <TableCell
                  key={col.key}
                  isHeader
                  className="px-5 py-3 font-medium text-white text-center text-lg dark:text-gray-400"
                >
                  {col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100">
            {data.map((row, rowIndex) => (
              <TableRow
                key={row.id || rowIndex}
                className={rowIndex % 2 === 0 ? "bg-[#F5F4F4]" : "bg-[#EAE7E7]"}
              >
                {columns.map((col) => (
                  <TableCell
                    key={col.key}
                    className="px-4 py-3 text-black text-center text-lg font-semibold"
                  >
                    {col.render ? col.render(row) : row[col.key]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
