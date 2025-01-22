import { Card, CardActionArea, CardContent } from "@mui/material";
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
    barChartLabsDataset,
    barChartLabsSeris,
    barChartLabsdataKey,
    barChartsChartLabsSetting,
    barChartTimingDataset,
    barChartTimingSeris,
    barChartdataTimingKey,
    barChartsChartTimingSetting,
    lineChartyAxis,
    lineChartxAxis,
    lineChartLabel,
  } = useVisualizationData({ data: data });

  return (
    <div className="charts">
      <p className="charts-title">Analyitcs</p>
      <div className="charts_container">
        <Card className="charts_card">
          <CardActionArea>
            <CardContent>
              {barChartTimingDataset &&
                barChartTimingSeris &&
                barChartdataTimingKey &&
                barChartsChartTimingSetting && (
                  <>
                    <p className="charts-card-title mb-0">Drivers Timing</p>
                    <p className="charts-card-hint">some drivers dosen't had time</p>
                    <div className="charts_card_conatainer_overflow">
                      <BarChartComponent
                        chartSetting={barChartsChartTimingSetting}
                        dataKey={barChartdataTimingKey}
                        dataset={barChartTimingDataset}
                        series={barChartTimingSeris}
                        key={"time bar chart"}
                        hideLegend={true}
                      />
                    </div>
                  </>
                )}
            </CardContent>
          </CardActionArea>
        </Card>

        <Card className="charts_card">
          <CardActionArea>
            <CardContent>
              {barChartLabsDataset &&
                barChartLabsSeris &&
                barChartLabsdataKey &&
                barChartsChartLabsSetting && (
                  <>
                    <p className="charts-card-title">Drivers Labs and Grids</p>
                    <div className="charts_card_conatainer_overflow">
                      <BarChartComponent
                        chartSetting={barChartsChartLabsSetting}
                        dataKey={barChartLabsdataKey}
                        dataset={barChartLabsDataset}
                        series={barChartLabsSeris}
                        key={"barChart"}
                      />
                    </div>
                  </>
                )}
            </CardContent>
          </CardActionArea>
        </Card>
        <Card className="charts_card">
          <CardActionArea>
            <CardContent className="charts_card_conatainer">
              {lineChartyAxis && lineChartxAxis && lineChartLabel && (
                <>
                  <p className="charts-card-title">Drivers Points</p>
                  <div className="charts_card_conatainer_overflow">
                    <LineChartComponent
                      height={200}
                      width={500}
                      series={lineChartyAxis}
                      xAxisData={lineChartxAxis}
                      label={lineChartLabel}
                      key={"lineChart"}
                      hideLegend={true}
                    />
                  </div>
                </>
              )}
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    </div>
  );
}

export default ChartsSection;
