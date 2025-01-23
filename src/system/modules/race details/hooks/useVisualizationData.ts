import { useMemo } from "react";
import { Races } from "../../../types/Types";
import { axisClasses } from "@mui/x-charts/ChartsAxis";

interface Props {
  data: Races[];
}

const useVisualizationData = (props: Props) => {
  const { data } = props;

  const barChartLabsDataset = useMemo(() => {
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

  const barChartsChartLabsSetting = {
    width: 1000,
    height: 200,
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: "translate(-20px, 0)",
      },
    },
  };

  const barChartLabsSeris = useMemo(() => {
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

  const barChartLabsdataKey = useMemo(() => {
    return "driverName";
  }, []);
  const lineChartLabel = useMemo(() => {
    return "Points";
  }, []);



  const barChartTimingDataset = useMemo(() => {
    if (data && data[0]?.Results) {
      return data[0].Results.filter((d)=>d?.Time?.time).map((driver) => (
        {
        driverName: driver.Driver.givenName,
        time: +driver?.Time?.time || 0,
      }));
    }
    return []; // Return an empty array if there's no data
  }, [data]);

  function barChartValueTimingFormatter(value: number | null) {
    return `${value}`;
  }

  const barChartsChartTimingSetting = {
    width: 1000,
    height: 200,
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: "translate(-20px, 0)",
      },
    },
  };

  const barChartTimingSeris = useMemo(() => {
    return [
      {
        dataKey: "time",
        label: "Time",
        barChartValueTimingFormatter,
        color: "#e10600 ",
      }
    ];
  }, []);

  const barChartdataTimingKey = useMemo(() => {
    return "driverName";
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
    barChartsChartLabsSetting,
    barChartLabsDataset,
    barChartLabsSeris,
    barChartLabsdataKey,
    barChartTimingDataset,
    barChartTimingSeris,
    barChartdataTimingKey,
    barChartsChartTimingSetting,
    lineChartxAxis,
    lineChartyAxis,
    lineChartLabel,
  };
};

export default useVisualizationData;
