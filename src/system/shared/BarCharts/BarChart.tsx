import React from "react";

import { BarChart } from "@mui/x-charts/BarChart";
interface Props {
  dataset?: any;
  chartSetting?: any;
  dataKey?: string;
  series?: any;
}
function BarChartComponent(props: Props) {
  const { chartSetting, dataset, dataKey, series } = props;

  return (
    <div>
      <BarChart
        dataset={dataset}
        xAxis={[{ scaleType: "band", dataKey: dataKey }]}
        series={series}
        {...chartSetting}
      />
    </div>
  );
}

export default BarChartComponent;
