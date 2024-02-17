import ReactApexChart from "react-apexcharts";
import { ChartData } from "../fn/useChartData";

interface AreaChartProps{
  series: {
    name: string,
    data: number[]
  }[];
    dates: string[];
}

export const AreaChart = ({ series }: { series: ChartData[] }) => {
    const options: {} = {
        chart: {
          height: 550,
          type: 'area',
          width: '100%'
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        xaxis: {
          type: 'datetime',
        },
        tooltip: {
          x: {
            format: 'dd/MM/yyyy HH:mm'
          },
        },
    };
  
    return ( 
      <ReactApexChart options={options} series={series} type="area" height={350} />
     );
};