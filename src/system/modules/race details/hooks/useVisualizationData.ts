import { useMemo } from "react";
import { Races } from "../../../types/Types";
import { axisClasses } from "@mui/x-charts/ChartsAxis";

interface Props {
  data: Races[];
}

const useVisualizationData = (props: Props) => {
  const { data } = props;

  const barChartDataset = useMemo(() => {
    if (data && data[0]?.Results) {
      return data[0].Results.map((driver) => ({
        driverName: driver.Driver.givenName,
        grid: +driver.grid,
        laps: +driver.laps,
      }));
    }
    return []; // Return an empty array if there's no data
  }, [data]);

  function barChartValueFormatter(value: number | null) {
    return `${value}`;
  }

  const barChartsChartSetting = {
    width: 600,
    height: 300,
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: "translate(-20px, 0)",
      },
    },
  };

  const barChartSeris = useMemo(() => {
    return [
      {
        dataKey: "laps",
        label: "Laps",
        barChartValueFormatter,
        color: "#e10600 ",
      },
      {
        dataKey: "grid",
        label: "Grid",
        barChartValueFormatter,
        color: "#15151e",
      },
    ];
  }, []);

  const barChartdataKey = useMemo(() => {
    return "driverName";
  }, []);
  const lineChartLabel = useMemo(() => {
    return "Points";
  }, []);

  const lineChartxAxis = useMemo(() => {
    if (data && data[0]?.Results) {
      return data[0].Results.map((driver) => driver.Driver.givenName);
    }
    return []; // Return an empty array if there's no data
  }, [data]);

  const lineChartyAxis = useMemo(() => {
    if (data && data[0]?.Results) {
      return data[0].Results.map((driver) => driver.points);
    }
    return []; // Return an empty array if there's no data
  }, [data]);

  return {
    barChartsChartSetting,
    lineChartxAxis,
    barChartDataset,
    barChartSeris,
    barChartdataKey,
    lineChartyAxis,
    lineChartLabel,
  };
};

export default useVisualizationData;
