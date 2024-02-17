"use client";

import React, { useState, useEffect } from 'react';
import { fetchData, DataType } from '@/components/data-table/fn/db-get'; // ตรวจสอบ path ให้ถูกต้อง
import { columns } from './columns';
import { DataTable } from './data-table';


// const datatest: DataType[] = [
//   {
//     id: "sensor_node_1",
//     name: "dog dag",
//     age: 15,
//     gender: "male",
//   },
//   {
//     id: "sensor_node_2",
//     name: "dog dag dug",
//     age: 19,
//     gender: "female",
//   },
// ]


const DataListComponent = () => {
  const [data, setData] = useState<DataType[]>([]);

  useEffect(() => {
    const getData = async () => {
      const dataList = await fetchData();
      setData(dataList);
    };
    getData();
  }, []);

  // console.log("data ->",data);
  
  

  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default DataListComponent;
