import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
interface Props {
  dataset?: any;
  chartSetting?: any;
  dataKey?: string;
  series?: any;
  hideLegend?: boolean;
  isHorizontal?: boolean;
}
function BarChartComponent(props: Props) {
  const {
    chartSetting,
    dataset,
    dataKey,
    series,
    hideLegend = false,
    isHorizontal = false,
  } = props;

  return (
    <div>
      {!isHorizontal && (
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
      )}
      {isHorizontal && (
        <BarChart
          dataset={dataset}
          yAxis={[{ scaleType: "band", dataKey: dataKey }]}
          series={series}
          layout="horizontal"
          slotProps={{
            legend: {
              hidden: hideLegend,
            },
          }}
          grid={{ vertical: true }}
          {...chartSetting}
        />
      )}
    </div>
  );
}

export default BarChartComponent;
