"use client";
import PageTitle from "@/components/PageTitle";
import MainPageProvider from "@/components/report-recent/main-provider";

interface SeriesItem {
  name: string;
  data: number[];
}


export default function Home() {
 
  return (
   <div className="flex flex-col gap-5">

    <PageTitle title="Dashboard" />
    <MainPageProvider />
   </div>
  );
}
