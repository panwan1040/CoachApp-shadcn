"use client";

export interface UpdateRecentProps {
    name: string;
    heartRate: number;
    date: string;
};

const UpdateRecent = ({
    name,
    heartRate,
    date,
}: UpdateRecentProps) => {
    return ( 
        <div className="flex flex-wrap justify-between gap-3">
            <section className="flex justify-between gap-3">
                <div className=" h-12 w-12 rounded-full bg-gray-100 p-1">
                    <img src={`https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${name}`} width={200} height={200} alt="avatar" />
                </div>
                <div className="text-sm">
                    <p>{name}</p>
                    <div className="text-ellipsis overflow-hidden whitespace-nowrap w-[120px] sm:w-auto text-gray-400">
                        { date }
                    </div>
                </div>
                
            </section>
            <p>
                { heartRate }
            </p>
        </div>
     );
}
 
export default UpdateRecent;