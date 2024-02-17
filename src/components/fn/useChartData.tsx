"use client";
// อาจต้องการปรับปรุง import เพื่อใช้งานในสภาพแวดล้อมของคุณ

import { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { app } from "@/lib/firebase";

export interface ChartData {
  name: string;
  data: { x: string; y: number }[]; // ปรับปรุงโครงสร้างข้อมูลเพื่อเก็บวันที่ (x) และ AvgHeartRate (y)
}

const convertEpochToISODate = (epoch: number): string => {
    return new Date(epoch * 1000).toISOString();
};


export const useChartData = () => {
    const [chartData, setChartData] = useState<ChartData[]>([]);

    useEffect(() => {
        const db = getDatabase(app);
        const dataRef = ref(db, '/');
        
        onValue(dataRef, (snapshot) => {
            const data = snapshot.val();
            const series: ChartData[] = [];

            if (data) {
                Object.keys(data).forEach((node) => {
                    // console.log(node);
                    const dataPoints: { x: string; y: number }[] = [];
                    Object.keys(data[node]).forEach((key) => {
                        if (data[node][key].hasOwnProperty('Date') && data[node][key].hasOwnProperty('AvgHeartRate')) {
                            dataPoints.push({
                                x: convertEpochToISODate(data[node][key].Date),
                                y: data[node][key].AvgHeartRate
                            });
                        }                       
                    });
                    series.push({ name: node, data: dataPoints });
                });
            }
            setChartData(series);
        });
    }, []);

    return { chartData };
};
