"use client";

import { cn } from "@/lib/utils";
import { calculateMaxHR, calculateZoneNumber } from "./fn/cal";
import { Activity } from "lucide-react";


export interface UpdateRecentProps {
    name: string;
    heartRate: string;
    des: string;
    zoneNum: number;
    gender: string;
    age:number;
};

const UpdateRecent = ({
    name,
    heartRate,
    des,
    zoneNum,
    gender,
    age,
}: UpdateRecentProps) => {
    return ( 
        <div className="flex flex-wrap justify-between gap-3">
            <section className="flex justify-between gap-3">
                <div className=" h-12 w-12 rounded-full bg-gray-100 p-1">
                    <img src={`https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${name}`} width={200} height={200} alt="avatar" />
                </div>
                <div className="text-sm">
                    <p className="font-semibold">{name}</p>
                    <div className={cn(
                        "text-ellipsis overflow-hidden whitespace-nowrap w-[120px] sm:w-auto font-medium",
                        calculateZoneNumber(calculateMaxHR(age, gender),parseInt(heartRate, 10)) === 1 ? "text-[#898e91]" :
                        calculateZoneNumber(calculateMaxHR(age, gender),parseInt(heartRate, 10)) === 2 ? "text-[#3d54df]" :
                        calculateZoneNumber(calculateMaxHR(age, gender),parseInt(heartRate, 10)) === 3 ? "text-[#19b744]" :
                        calculateZoneNumber(calculateMaxHR(age, gender),parseInt(heartRate, 10)) === 4 ? "text-[#e9a401]" :
                        calculateZoneNumber(calculateMaxHR(age, gender),parseInt(heartRate, 10)) === 5 ? "text-[#d6101a]" :
                        "text-gray-400"
                    )}>
                        { des }
                        
                    </div>
                </div>
                
            </section>
            <p className="font-bold flex">
              { heartRate } <Activity className="text-green-500 pl-[3px]" />
            </p>
        </div>
     );
}
 
export default UpdateRecent;