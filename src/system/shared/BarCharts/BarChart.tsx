import React from "react";

import { BarChart } from "@mui/x-charts/BarChart";
interface Props {
  dataset?: any;
  chartSetting?: any;
  dataKey?: string;
  series?: any;
  hideLegend?: boolean;
}
function BarChartComponent(props: Props) {
  const { chartSetting, dataset, dataKey, series, hideLegend = false } = props;

  return (
    <div>
      <BarChart
        dataset={dataset}
        xAxis={[{ scaleType: "band", dataKey: dataKey }]}
        series={series}
        {...chartSetting}
        slotProps={{
          legend: {
            hidden: hideLegend,
          },
        }}
      />
    </div>
  );
}

export default BarChartComponent;
