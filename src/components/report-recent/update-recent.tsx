import { cn } from "@/lib/utils";
import { Activity } from "lucide-react";
import Image from "next/image";

export interface UpdateRecentProps {
  name: string;
  oldName?: string;
  heartRate: string;
  des: string;
  zoneNum: number;
  gender: string;
  age: number;
}

const UpdateRecent = ({
  name,
  oldName,
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
          <img src={`https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${name}`} width={200} height={200} className="rounded-full" alt="avatar" />
        </div>
        <div className="text-sm">
          <p className="font-semibold">
            {name} <span className="font-mono text-red-300">({oldName})</span>
          </p>
          <div
            className={cn(
              "text-ellipsis overflow-hidden whitespace-nowrap w-[120px] sm:w-auto font-medium",
              zoneNum === 1
                ? "text-[#898e91]"
                : zoneNum === 2
                ? "text-[#3d54df]"
                : zoneNum === 3
                ? "text-[#19b744]"
                : zoneNum === 4
                ? "text-[#e9a401]"
                : zoneNum === 5
                ? "text-[#d6101a]"
                : "text-gray-400"
            )}
          >
            {des}
          </div>
        </div>
      </section>
      <p className="font-bold flex">
        {heartRate} <Activity className="text-green-500 pl-[3px]" />
      </p>
    </div>
  );
};

export default UpdateRecent;