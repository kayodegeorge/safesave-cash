/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { type ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { ArrowUpDown } from "lucide-react";
import { Button } from "../ui/button";


export interface AllAccounts {
 staffID: string;
}

export const columns: ColumnDef<AllAccounts>[] = [
  {
    accessorKey: "id",
    header: "Staff ID",
  },
  
  {
    accessorKey: "staffID",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          StafID
          <ArrowUpDown className="ml-2 h-4 w-4 shrink-0" />
        </Button>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4 shrink-0" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status = row.getValue("status");

      return (
        <div className="text-yellow-500">{status ? "APPROVED" : "PENDING"}</div>
      );
    },
  },
];
