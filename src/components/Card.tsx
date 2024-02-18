"use client";
import { cn } from "@/lib/utils";


export interface CardProps {
  label: string;
  icon: React.ReactNode;
  amount: string;
  description: string;
}

const Card = ({ label, icon, amount, description }: CardProps) => {
  return (
    <CardContent>
      <section className="flex justify-between gap-2">
        <p className="text-sm">{ label }</p>
        { icon }
      </section>
      <section className="flex flex-col gap-1">
        <h2 className="text-2xl font-semibold">{ amount }</h2>
        <p className="text-xs text-gray-500 ">{ description }</p>
        
      </section>
    </CardContent>
  );
};

export function CardContent(Props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...Props}
      className={cn(
        "flex w-full flex-col gap-3 rounded-xl border p-5 shadow",
        Props
      )}
    ></div>
  );
}

export default Card;
