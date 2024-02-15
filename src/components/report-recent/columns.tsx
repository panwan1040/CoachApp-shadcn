"use client";

import { ColumnDef } from "@tanstack/react-table";
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuLabel, 
    DropdownMenuSeparator, 
    DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Settings } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type TeamDetail = {
  id: string;
  name: string;
  age: number;
  status: "VeryLight" | "Light" | "Moderate" | "Hard" | "Maximum";
};

export const columns: ColumnDef<TeamDetail>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({row}) => {
        return (
            <div>Name-
                {
                    row.getValue("name")
                }
            </div>
        )
    }
  },
  {
    accessorKey: "age",
    header: "Age",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original
 
      return (
        <button className="text-gray-500 hover:text-gray-900">
            <Settings />
        </button>
      )
    },
  }
]
