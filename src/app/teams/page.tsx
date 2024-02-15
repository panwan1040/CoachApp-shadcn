
import PageTitle from '@/components/PageTitle';
import { columns } from '@/components/report-recent/columns';
import { DataTable } from '@/components/report-recent/data-table';
import * as React from 'react';

interface Props{

}

const TeamsPage = ({

}: Props) => {
  return ( 
    <div className='flex flex-col gap-5 w-full'>
        <PageTitle title="Teams" />
        <DataTable columns={columns} data={data} />
      </div>
   );
}
 
export default TeamsPage;



type DataType = {
  id: string
  name: string
  age: number
  status: "VeryLight" | "Light" | "Moderate" | "Hard" | "Maximum"
}

export const data: DataType[] = [
  {
    id: "728ed52f",
    name: "dog dag",
    age: 15,
    status: "VeryLight",
  },
  {
    id: "728ed52f",
    name: "dog dag dug",
    age: 19,
    status: "Light",
  },
  // ...
]






