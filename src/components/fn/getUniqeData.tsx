"use client";
// GetUniqeData.tsx
import { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { app } from "@/lib/firebase";

interface Series {
  name: string;
  data: number[];
}

const convertEpochToDateList = (epochList: number[]): string[] => {
    return epochList.map((epoch) => {
        const date = new Date(epoch * 1000);
        return date.toLocaleString('en-US', { timeZone: "GMT" });
    });
};

export const GetUniqeData = () => {
    const [uniqueSeries, setUniqueSeries] = useState<Series[]>([]);
    const [convertedDateList, setConvertedDateList] = useState<string[]>([]);

    useEffect(() => {
        const db = getDatabase(app);
        const dataRef = ref(db, '/');
        const series: Series[] = [];

        onValue(dataRef, (snapshot) => {
            const data = snapshot.val();
            const dates: number[] = [];

            if (data) {
                Object.keys(data).forEach((node) => {
                    const tmpAvgHr:number[] = [];
                    Object.keys(data[node]).forEach((key) => {

                        if (data[node][key].hasOwnProperty('Date')) {
                            // เพิ่มวันที่เข้าไปใน array
                            dates.push(data[node][key].Date);
                        }
                        if (data[node][key].hasOwnProperty('AvgHeartRate')) {
                            // เพิ่มวันที่เข้าไปใน array
                            tmpAvgHr.push(data[node][key].AvgHeartRate);
                        }
                        
                    });
                    // console.log(tmpAvgHr);
                    series.push({
                        name: node,
                        data: tmpAvgHr
                    })
                });
            }

            const seriesMap = new Map(series.map(obj => [obj.name, obj]));
            const unique = Array.from(seriesMap.values());
            setUniqueSeries(unique as Series[]);
            setConvertedDateList(convertEpochToDateList(dates));
        });
    }, []);

    return { uniqueSeries, convertedDateList };
};


