import ReactApexChart from "react-apexcharts";

interface AreaChartProps{
  series: {
    name: string,
    data: number[]
  }[];
    dates: string[];
}

const AreaChart = ({
  series,
  dates,
}: AreaChartProps) => {
    
  // test data
  // const series = [{
  //   name: 'series1',
  //   data: [31, 40, 28, 51, 42, 109, 100]
  // }, {
  //   name: 'series2',
  //   data: [11, 32, 45, 32, 34, 52, 41]
  // }];

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
      // categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
      categories: dates
    },
    tooltip: {
      x: {
        format: 'dd/MM/yyyy HH:mm'
      },
    },
  }
  
  
    return ( 
      <ReactApexChart options={options} series={series} type="area" height={350} />
     );
};
 
export default AreaChart;







      

        
