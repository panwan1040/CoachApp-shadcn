"use client";
// อาจต้องการปรับปรุง import เพื่อใช้งานในสภาพแวดล้อมของคุณ

import { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { app } from "@/lib/firebase";
import { Team, fetchTeams } from "@/components/report-recent/fn/db-getname";


export interface ChartData {
    name: string,
    data: { x: string; y: number }[]; // ปรับปรุงโครงสร้างข้อมูลเพื่อเก็บวันที่ (x) และ AvgHeartRate (y)
}

const convertEpochToISODate = (epoch: number): string => {
    return new Date(epoch * 1000).toISOString();
};


export const useChartData = () => {
    const [chartData, setChartData] = useState<ChartData[]>([]);
    const [teams, setTeams] = useState<Team[]>([]);

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

    useEffect(() => {
        // ฟังก์ชันสำหรับดึงข้อมูลทีม
        const loadTeams = async () => {
            try {
                const fetchedTeams = await fetchTeams();
                setTeams(fetchedTeams); // อัพเดท state ด้วยข้อมูลที่ได้
            } catch (error) {
                console.error("Failed to fetch teams:", error);
            } finally {

            }
        };

        loadTeams(); // เรียกใช้ฟังก์ชันเมื่อ component ถูกโหลด
    }, []); // อาร์เรย์ว่างแสดงถึงการทำงานเพียงครั้งเดียวเมื่อ component mount

    // console.log(chartData, "<<-1");
    // console.log(teams,"<<-2");
    useEffect(() => {
        // ตรวจสอบว่า teams มีข้อมูล
        if (teams.length > 0) {
            const updatedChartData = chartData.map(item => {
                // หาทีมที่มี id ตรงกับชื่อใน chartData
                const matchingTeam = teams.find(team => team.id === item.name);
                // ถ้าหาเจอ, ให้เปลี่ยนชื่อใน chartData เป็นชื่อของทีม
                if (matchingTeam) {
                    return { ...item, name: matchingTeam.name };
                }
                // ถ้าไม่เจอ, ให้คืนค่า item ปัจจุบัน
                return item;
            });
            // อัพเดท chartData ด้วยข้อมูลใหม่
            setChartData(updatedChartData);
        }
    }, [teams, chartData]);


      
    return { chartData };
};
