"use client";
import { getFirestore, collection, getDocs, setDoc, doc, query, where } from 'firebase/firestore';
import { app } from '@/lib/firebase'; // ตรวจสอบ path ให้ถูกต้องตามการตั้งค่าของคุณ
import { getDatabase, ref, onValue } from "firebase/database";
import { redirect } from 'next/navigation';
// ระบุ type สำหรับข้อมูล
export type DataType = {
  name?: string;
  age?: number;
  gender?: string;
  id?: string;
  imgUrl?: string;
};

// ฟังก์ชันเพื่อดึงข้อมูล
export let sensorId: string[] = [];

export interface DBdada {
  name: string;
  data: { x: string; y: number }[]; // ปรับปรุงโครงสร้างข้อมูลเพื่อเก็บวันที่ (x) และ AvgHeartRate (y)
}


export const fetchData = async (): Promise<DataType[]> => {
  const db = getFirestore(app);
  const dataCol = collection(db, 'teams');
  const dataSnapshot = await getDocs(dataCol);
  const dataList = dataSnapshot.docs.map(doc => ({
    docId: doc.id,
    ...doc.data(),
  })) as DataType[]; 

  
  
  const fetchRealtimeDBData = () => {
    const db = getDatabase(app);
    const dataRef = ref(db, '/');

    let nameList: string[] = [];
    
    onValue(dataRef, (snapshot) => {
        const data = snapshot.val();
        Object.keys(data).forEach((node) =>{
          nameList.push(node)
          
        })
        
    });
    nameList = Array.from(new Set(nameList));
    
    sensorId = nameList;

  };
  







  // TODO เพิ่มข้อมูลอัตโนมัติ
  fetchRealtimeDBData();
  // console.log("dataList:",dataList);
  // console.log("sensorId:",sensorId);


  const addDataIfNotExist = async () => {
    const db = getFirestore(app);
    const dataCol = collection(db, 'teams'); // 'teams' คือชื่อ collection
    for (const id of sensorId) { // ใช้ loop แบบ for...of เพื่อรอการดำเนินการแบบ asynchronous
      // สร้าง query เพื่อค้นหา document ที่มี field id ตรงกับ sensorId
      const q = query(dataCol, where("id", "==", id));
      const querySnapshot = await getDocs(q);
  
      const newData = {
        name: "sensor_data_" + id.split('_')[2], // ตัวอย่างการตั้งชื่อ
        age: 0,
        gender: "male",
        id: id,
      };
  
      if (querySnapshot.empty) { // ถ้าไม่มี document ที่ตรงกับเงื่อนไข
        // ใช้ addDoc หรือ setDoc โดยตรงกับ id ถ้าต้องการกำหนด ID สำหรับ document
        await setDoc(doc(dataCol, id), newData); // กำหนด ID ด้วยตัวเอง
        // console.log(`Added new data for sensor: ${id}`);
      } else {
        // console.log(`Data for sensor: ${id} already exists.`);
      }
    }
    // console.log('Check and add data process is completed.');
  };
  
  addDataIfNotExist();

  
  // 
  
  return dataList;
};
