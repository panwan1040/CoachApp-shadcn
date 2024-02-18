'use client';
import React, { useState, useEffect } from 'react';
import { ChartData } from "@/components/fn/useChartData";

interface AreaChartProps {
  series: ChartData[];
}

const AreaChart = ({ series }: AreaChartProps) => {
  const [ReactApexChart, setReactApexChart] = useState<any | null>(null);

  useEffect(() => {
    const loadApexCharts = async () => {
      if (typeof window !== 'undefined') {
        const apexModule = await import('react-apexcharts');
        setReactApexChart(() => apexModule.default);
      }
    };
  
    loadApexCharts();
  }, []);

  const options: {} = {
    chart: {
      height: 550,
      type: 'area',
      width: '100%',
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    xaxis: {
      type: 'datetime',
    },
    tooltip: {
      x: {
        format: 'dd/MM/yyyy HH:mm',
      },
    },
  };

  if (!ReactApexChart) {
    return <div>Loading chart...</div>;
  }

  return (
    <ReactApexChart options={options} series={series} type="area" height={350} />
  );
};

export default AreaChart;
