

export const calculateMaxHR = (age: number, gender: string): number => {
    // ผู้ชาย : MaxHR = 214 – (0.8 x อายุ)
    // ผู้หญิง : MaxHR = 209 – (0.7 x อายุ)

    if (gender === "male") {
        return 214 - (0.8 * age)
    }

    return 209 - (0.7 * age)


};


export const calculateZone = (maxHR: number, heartRateNow: number): string => {

    const zone1UpperLimit = maxHR * 0.6;
    const zone2UpperLimit = maxHR * 0.7;
    const zone3UpperLimit = maxHR * 0.8;
    const zone4UpperLimit = maxHR * 0.9;

    if (heartRateNow <= zone1UpperLimit) {
        return `Very light: 50-60% from max (${maxHR})`;
    } else if (heartRateNow <= zone2UpperLimit) {
        return `Light: 60-70% from max (${maxHR})`;
    } else if (heartRateNow <= zone3UpperLimit) {
        return `Moderate: 70-80% from max (${maxHR})`;
    } else if (heartRateNow <= zone4UpperLimit) {
        return `Hard: 80-90% from max (${maxHR})`;
    } else {
        return `Maximum: 90-100% from max (${maxHR})`;
    }

};

export const calculateZoneNumber = (maxHR: number, heartRateNow: number): number => {

    const zone1UpperLimit = maxHR * 0.6;
    const zone2UpperLimit = maxHR * 0.7;
    const zone3UpperLimit = maxHR * 0.8;
    const zone4UpperLimit = maxHR * 0.9;

    if (heartRateNow <= zone1UpperLimit) {
        return 1;
    } else if (heartRateNow <= zone2UpperLimit) {
        return 2;
    } else if (heartRateNow <= zone3UpperLimit) {
        return 3;
    } else if (heartRateNow <= zone4UpperLimit) {
        return 4;
    } else {
        return 5;
    }

};