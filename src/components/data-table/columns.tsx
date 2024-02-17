"use client";
import { ColumnDef } from "@tanstack/react-table";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { Settings } from "lucide-react";
import { DataType } from "./fn/db-get";
import { ProfileForm } from "./form";

export const columns: ColumnDef<DataType>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({row}) => {
        return (
            <div>
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
    accessorKey: "gender",
    header: "Gender",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {

      

      return (
        
      
        <Sheet>
          <SheetTrigger asChild>
          <button className="text-gray-500 hover:text-gray-900">
              <Settings />
          </button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Edit profile</SheetTitle>
              <SheetDescription>
                โปรดตรวจสอบให้แน่ใจก่อนกดบันทึก
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">

              
              <ProfileForm 
              id={row.getValue("id")}
              name={row.getValue("name")}
              age={row.getValue("age")}
              gender={row.getValue("gender")}
              />


            </div>
            <SheetFooter>
              <SheetClose asChild>
              
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      
      )
    },
  }
]
