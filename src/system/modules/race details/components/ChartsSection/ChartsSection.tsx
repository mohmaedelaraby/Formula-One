import { Card, CardActionArea, CardContent } from "@mui/material";
import React from "react";
import "./style.css";
import { Races } from "../../../../types/Types";
import BarChartComponent from "../../../../shared/BarCharts/BarChart";
import useVisualizationData from "../../hooks/useVisualizationData";
import LineChartComponent from "../../../../shared/LineChart/LineChart";

interface Props {
  data: Races[];
}
function ChartsSection(props: Props) {
  const { data } = props;
  console.log(data);
  const {
    barChartDataset,
    barChartSeris,
    barChartdataKey,
    barChartsChartSetting,
    lineChartyAxis,
    lineChartxAxis,
    lineChartLabel
  } = useVisualizationData({ data: data });

  return (
    <div className="charts">
      <div className="charts_container">
        <Card className="charts_card">
          <CardActionArea>
            <CardContent style={{ width: "100%", overflowX: "auto" }}>
              {barChartDataset &&
                barChartSeris &&
                barChartdataKey &&
                barChartsChartSetting && (
                  <BarChartComponent
                    chartSetting={barChartsChartSetting}
                    dataKey={barChartdataKey}
                    dataset={barChartDataset}
                    series={barChartSeris}
                    key={"barChart"}
                  />
                )}
            </CardContent>
          </CardActionArea>
        </Card>

        <Card className="charts_card">
          <CardActionArea>
            <CardContent style={{ width: "100%", overflowX: "auto" }}>
              <LineChartComponent
                height={300}
                width={550}
                series={lineChartyAxis}
                xAxisData={lineChartxAxis}
                label={lineChartLabel}
              />
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    </div>
  );
}

export default ChartsSection;
