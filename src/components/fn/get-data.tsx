"use client";
import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { app } from "@/lib/firebase";
import AreaChart from "@/components/chart/area-charts";


const series :{ 
    name: string, 
    data: number[] 
}[] = [];


const GetData = () => {
    const [dateList, setDatelist] = useState<number[]>([]);

    useEffect(() => {
        const db = getDatabase(app);
        const dataRef = ref(db, '/');
        
        onValue(dataRef, (snapshot) => {
            const data = snapshot.val();
            const dates:number[] = [];

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
            
            setDatelist(dates);


            
            
          });
    }, [])
    const seriesMap = new Map(series.map(obj => [obj.name, obj]));
    const uniqueSeries = Array.from(seriesMap.values());
    const convertedDateList = convertEpochToDateList(dateList);
    // console.log(uniqueSeries);


    return ( 
      <div className="">
             <AreaChart 
                series={uniqueSeries}
                dates={convertedDateList}
             />   
        </div>
     );
}

function convertEpochToDateList(epochList: number[]): string[] {
    return epochList.map(epoch => {
        const date = new Date(epoch * 1000);
        return date.toLocaleString('en-US', { timeZone: "GMT" });
    });
  }


 
export default GetData;