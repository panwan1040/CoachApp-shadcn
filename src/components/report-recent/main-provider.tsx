"use client";
import Card, { CardContent, CardProps } from "@/components/Card";
import UpdateRecent, {
    UpdateRecentProps,
} from "@/components/report-recent/update-recent";
import {
    HeartPulse,
    SatelliteDish,
    TrendingDown,
    TrendingUp,
} from "lucide-react";

import {
    calculateAvg,
    calculateAvgOfLastTen,
    findMaximumLastTen,
    findMinimumLastTen,
    calculatePercentageChange,
} from "@/components/fn/CalFn";
import { GetUniqeData } from "@/components/fn/getUniqeData";
import { AreaChart } from "@/components/chart/area-charts";
import { useChartData } from "@/components/fn/useChartData";
import { Team, fetchTeams } from "./fn/db-getname";
import { useEffect, useState } from "react";
import { calculateMaxHR, calculateZone, calculateZoneNumber } from "./fn/cal";


const MainPageProvider = () => {
    const [teams, setTeams] = useState<Team[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    
    
    const avgTenList: number[] = [];
    let allHeartRateSensorOfTen: number[] = [];

    const { uniqueSeries } = GetUniqeData();
    const { chartData } = useChartData();

    // console.log(chartData);
    
    const teamUpdateData: UpdateRecentProps[] = [];

    useEffect(() => {
        // ฟังก์ชันสำหรับดึงข้อมูลทีม
        const loadTeams = async () => {
          try {
            const fetchedTeams = await fetchTeams();
            setTeams(fetchedTeams); // อัพเดท state ด้วยข้อมูลที่ได้
          } catch (error) {
            console.error("Failed to fetch teams:", error);
          } finally {
            setIsLoading(false); // อัพเดทสถานะการโหลด
          }
        };
    
        loadTeams(); // เรียกใช้ฟังก์ชันเมื่อ component ถูกโหลด
    }, []); // อาร์เรย์ว่างแสดงถึงการทำงานเพียงครั้งเดียวเมื่อ component mount
    
      if (isLoading) {
        return <div>Loading...</div>;
      }

    //   console.log(teams);
      

    uniqueSeries.forEach((item,index) => {
        const avg = calculateAvgOfLastTen(item.data);

        // console.log(item);
        allHeartRateSensorOfTen = allHeartRateSensorOfTen.concat(item.data);
        // console.log(allHeartRateSensorOfTen);

        avgTenList.push(avg);
        // console.log(`Average of the last ten (or fewer) items in ${item.name}: ${avg}`);

        teamUpdateData.push({
            name: teams[index].name,
            oldName: item.name,
            des: calculateZone(calculateMaxHR(teams[index].age, teams[index].gender),item.data[item.data.length - 1]),
            heartRate: item.data[item.data.length - 1].toFixed(2),
            zoneNum: calculateZoneNumber(calculateMaxHR(teams[index].age, teams[index].gender),item.data[item.data.length - 1]),
            age: teams[index].age,
            gender: teams[index].gender
        });
    });
    // console.log(calculateAvg(avgTenList).toFixed(2));
    // console.log(allHeartRateSensorOfTen);

    const cardData: CardProps[] = [
        {
            label: "Teams Heart-rate Avg",
            icon: <HeartPulse className="text-rose-500" />,
            amount: calculateAvg(avgTenList).toFixed(2),
            description: calculateAvg(avgTenList)
                ? calculateAvg(avgTenList) < 60
                    ? "'ต่ำกว่า'สภาวะปกติ"
                    : calculateAvg(avgTenList) >= 60 && calculateAvg(avgTenList) <= 100
                        ? "สภาวะปกติ"
                        : "'สูงกว่า'สภาวะปกติ"
                : "ไม่สามารถคำนวณค่าได้",
        },
        {
            label: "Maximum",
            icon: <TrendingUp className="text-green-500" />,
            amount: findMaximumLastTen(allHeartRateSensorOfTen).toFixed(2),
            description: `+${calculatePercentageChange(
                calculateAvg(avgTenList),
                findMaximumLastTen(allHeartRateSensorOfTen)
            ).toFixed()}% จากค่าเฉลี่ย`,
        },
        {
            label: "Minimum",
            icon: <TrendingDown className="text-rose-500" />,
            amount: findMinimumLastTen(allHeartRateSensorOfTen).toFixed(2),
            description: `${calculatePercentageChange(
                calculateAvg(avgTenList),
                findMinimumLastTen(allHeartRateSensorOfTen)
            ).toFixed()}% จากค่าเฉลี่ย`,
        },
        {
            label: "Equipment used",
            icon: <SatelliteDish className="text-amber-500" />,
            amount: avgTenList.length.toFixed(),
            description: "จำนวนอุปกรณ์ที่เก็บข้อมูล",
        },
    ];


    

    return (
        <>
            <section
                className="grid w-full grid-cols-1 gap-4 gap-x-8 
      transition-all sm:grid-cols-2 xl:grid-cols-4"
            >
                {cardData.map((d, i) => (
                    <Card
                        key={i}
                        amount={d.amount}
                        description={d.description}
                        icon={d.icon}
                        label={d.label}
                    />
                ))}
            </section>
            <section className="grid grid-cols-1 gap-4 transition-all lg:grid-cols-2">
                <CardContent>
                    <p className="p-4 font-semibold">Overview</p>
                    {/* <GetData /> */}
                    <AreaChart series={chartData} />
                </CardContent>

                <CardContent className="flex justify-between gap-4">
                    <p className="p-4 font-semibold">Recent Heartrate Update</p>
                    {teamUpdateData.map((d, i) => (
                        <UpdateRecent
                            key={i}
                            name={d.name}
                            oldName={d.oldName}
                            heartRate={d.heartRate}
                            des={d.des}
                            zoneNum={d.zoneNum}
                            age={d.age}
                            gender={d.gender}
                        />
                    ))}
                </CardContent>
            </section>
        </>
    );
};

export default MainPageProvider;
