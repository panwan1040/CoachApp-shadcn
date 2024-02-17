
import PageTitle from '@/components/PageTitle';
import DataListComponent from '@/components/data-table/data-list';
import { ProfileForm } from '@/components/data-table/form';

import * as React from 'react';


interface Props{

}

// test data

type DataType = {
  id: string;
  name: string;
  age: number;
  gender: "male" | "female";
  imgUrl?: string;
}



const TeamsPage = ({

}: Props) => {
  
  return ( 
      <div className='flex flex-col gap-5 w-full'>
        <PageTitle title="Teams" />
        {/* <ProfileForm /> */}
        {/* <DataTable columns={columns} data={datatest} /> */}
        <DataListComponent />
        
      </div>
   );
}
 
export default TeamsPage;