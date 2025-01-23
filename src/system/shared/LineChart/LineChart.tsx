
import React from 'react';
import { LineChart } from "@mui/x-charts";
interface Props {
  xAxisData?: any;
  series?: any;
  width?: any;
  height?: any;
  label?: string;
  hideLegend?:boolean
}
function LineChartComponent(props: Props) {
  const { height, series, width, xAxisData, label , hideLegend = false} = props;

  return (
    <div>
      <LineChart
        width={width}
        height={height}
        series={[
          {
            data: series,
            label: label,
            yAxisId: "leftAxisId",
            color: "#e10600",
          },
        ]}
        xAxis={[{ scaleType: "point", data: xAxisData }]}
        yAxis={[{ id: "leftAxisId" }, { id: "rightAxisId" }]}
        rightAxis="rightAxisId"
        slotProps={{
          legend:{
            hidden:hideLegend
          }
        }}
      />
    </div>
  );
}

export default LineChartComponent;
