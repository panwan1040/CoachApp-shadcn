"use client";
import { db } from "@/lib/firebase"; // แก้ไขตาม path ของไฟล์ที่เหมาะสม
import { collection, addDoc } from "firebase/firestore";

async function addData() {
  try {
    const docRef = await addDoc(collection(db, "yourCollectionName"), {
      field1: "value1",
      field2: "value2",
      // เพิ่ม field และ value ที่ต้องการ
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

