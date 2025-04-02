import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TableHeadProps,TabelDataProps } from "@/types/Commontypes";

export type TableProps = {
    tableHeaders: TableHeadProps[];
    tableData: TabelDataProps[];
};

export function TaskTable({ tableHeaders, tableData }: TableProps) {
    
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {tableHeaders.map((header) => {
            return <TableHead key={header.key}>{header.headName}</TableHead>
          })}
        </TableRow>
      </TableHeader>
      <TableBody>
        {tableData.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.taskName}</TableCell>
            <TableCell >{item.status}</TableCell>
            <TableCell>{item.assignees}</TableCell>
            <TableCell>{item.dueDate}</TableCell>
            <TableCell >{item.priority}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}



  
  