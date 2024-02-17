"use client";
// นำเข้า modules ที่จำเป็น
import { useEffect, useState } from 'react';
import { app } from "@/lib/firebase";
import { collection, getDocs, getFirestore } from "firebase/firestore";

// ประกาศ interface สำหรับข้อมูลทีม
export interface Team {
  id: string;
  age: number;
  gender: string;
  name: string;
}

export const fetchTeams = async (): Promise<Team[]> => {
  const db = getFirestore(app);
  const dataCol = collection(db, 'teams');
  const teamSnapshot = await getDocs(dataCol);
  const teamList: Team[] = teamSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Team[];



  return teamList;
};
