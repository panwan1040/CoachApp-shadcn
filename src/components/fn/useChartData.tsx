"use client";

import { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { app } from "@/lib/firebase";
import { Team, fetchTeams } from "@/components/report-recent/fn/db-getname";

interface ChartData {
  name: string;
  data: { x: string; y: number }[];
}

interface TeamNameMapping {
  [key: string]: string;
}

const convertEpochToISODate = (epoch: number): string => {
  return new Date(epoch * 1000).toISOString();
};

export const useChartData = () => {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);

  // Function to update chartData names with team names
  const updateChartDataNames = (chartData: ChartData[], teams: Team[]) => {
    const teamNameMapping = teams.reduce((acc: TeamNameMapping, team) => {
      acc[team.id] = team.name;
      return acc;
    }, {});

    return chartData.map(item => ({
      ...item,
      name: teamNameMapping[item.name] || item.name,
    }));
  };

  useEffect(() => {
    const db = getDatabase(app);
    const dataRef = ref(db, '/');

    onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      let series: ChartData[] = [];

      if (data) {
        Object.keys(data).forEach((node) => {
          const dataPoints: { x: string; y: number }[] = [];
          Object.keys(data[node]).forEach((key) => {
            if (data[node][key].hasOwnProperty('Date') && data[node][key].hasOwnProperty('AvgHeartRate')) {
              dataPoints.push({
                x: convertEpochToISODate(data[node][key].Date),
                y: data[node][key].AvgHeartRate,
              });
            }
          });
          series.push({ name: node, data: dataPoints });
        });
      }
      // If teams are already loaded, update names immediately
      if (teams.length > 0) {
        series = updateChartDataNames(series, teams);
      }
      setChartData(series);
    });
  }, [teams]); // Only re-run this effect if teams data changes

  useEffect(() => {
    const loadTeams = async () => {
      try {
        const fetchedTeams = await fetchTeams();
        setTeams(fetchedTeams);
      } catch (error) {
        console.error("Failed to fetch teams:", error);
      }
    };

    loadTeams();
  }, []);

  

  return { chartData };
};
