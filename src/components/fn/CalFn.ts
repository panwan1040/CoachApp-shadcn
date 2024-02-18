"use client";
export const calculateAvgOfLastTen = (data: number[]): number => {
  // ตรวจสอบถ้าข้อมูลมีมากกว่า 10 รายการ, ใช้เฉพาะ 10 รายการสุดท้าย
  const lastTenItems = data.length > 10 ? data.slice(-10) : data;

  // คำนวณค่าเฉลี่ย
  const sum = lastTenItems.reduce((acc, curr) => acc + curr, 0);
  return sum / lastTenItems.length;
};

export const findMaximumLastTen = (data: number[]): number => {
  // ค้นหาค่าสูงสุด
  return Math.max(...data);
};

export const findMinimumLastTen = (data: number[]): number => {
  // ค้นหาค่าต่ำสุด
  return Math.min(...data);
};

export const calculateAvg = (data: number[]): number => {
  const sum = data.reduce((acc, curr) => acc + curr, 0);
  return sum / data.length;
};

export function calculatePercentageChange(startValue: number, endValue: number): number {
    const percentageChange = ((endValue - startValue) / startValue) * 100;
    return percentageChange; // จำกัดค่าทศนิยมไว้ 2 ตำแหน่งและเพิ่มสัญลักษณ์ %
  }
