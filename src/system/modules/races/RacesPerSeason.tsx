import "./Styles.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Tooltip,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import TableRowsIcon from "@mui/icons-material/TableRows";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Races } from "../../types/Types";
import LoadingPage from "../../shared/loadingState/LoadingPage";
import { useNavigate, useParams } from "react-router-dom";
import useGetRacePerSeasons from "./hooks/useGetRacePerSeason";
import { format } from "date-fns";

function RacesPerSeason() {
  const { season } = useParams();
  const navigate = useNavigate();
  const {
    RaceData,
    handleChangePage,
    handleChangeRowsPerPage,
    isError,
    isLoading,
    toggleView,
    totalCount,
    view,
    rowsPerPage,
    page,
  } = useGetRacePerSeasons({ season: season! });

  if (isLoading || isError) {
    return <LoadingPage />;
  }

  return (
    <>
      {!isLoading && (
        <>
          <div className="switch_view">
            <Tooltip title="Table view">
              <button
                className={`switch_view_cards display_center ${
                  view === "table" ? "active" : ""
                }`}
                onClick={() => toggleView("table")}
              >
                <TableRowsIcon />
              </button>
            </Tooltip>
            <Tooltip title="Cards view">
              <button
                className={`switch_view_cards display_center ${
                  view === "card" ? "active" : ""
                }`}
                onClick={() => toggleView("card")}
              >
                <DashboardIcon />
              </button>
            </Tooltip>
          </div>
          <Paper
            className="display_center"
            sx={{ width: "100%", overflow: "hidden" }}
          >
            <TableContainer className="custom-table-container">
              <Table className="custom-table">
                {view === "table" && (
                  <TableHead>
                    <TableRow>
                      <TableCell>Race</TableCell>
                      <TableCell>Circuit</TableCell>
                      <TableCell>Date</TableCell>
                    </TableRow>
                  </TableHead>
                )}
                <TableBody>
                  {view === "table" &&
                    RaceData.map((race: Races, index: number) => (
                      <TableRow hover key={index}>
                        <TableCell
                          className="custom-table-click"
                          onClick={() => {
                            navigate(`/results/${race?.season}/${race?.round}`);
                          }}
                        >
                          {race.raceName}
                        </TableCell>
                        <TableCell>{race?.Circuit?.circuitName}</TableCell>
                        <TableCell>
                          {format(new Date(race?.date), "MMMM dd, yyyy")}
                        </TableCell>
                      </TableRow>
                    ))}

                  {view === "card" && (
                    <>
                      <div className="grid_view">
                        {RaceData.map((race: Races, index: number) => (
                          <div>
                            <Card className="custom-card" key={index}>
                              <CardContent className="custom-card-container">
                                <div className="custom-card-top">
                                  {race.raceName}
                                </div>
                                <div className="custom-card-mid">
                                <div className="custom-card-subtitle"> <span className="custom-card-subtitle-label">circuit name :  </span> {race.Circuit.circuitName}</div>
                                <div className="custom-card-date">{format(new Date(race?.date), "MMMM dd, yyyy")}</div>
                                </div>

                                
                                <Button
                                  variant="contained"
                                  className="custom-card-btn"
                                  size="small"
                                  onClick={() => {
                                    navigate(
                                      `/results/${race?.season}/${race?.round}`
                                    );
                                  }}
                                  style={{ marginTop: "10px" }}
                                >
                                  Show Results
                                </Button>
                              </CardContent>
                            </Card>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </TableBody>
              </Table>
              <TablePagination
                className="custom-pagination"
                rowsPerPageOptions={[9, 27, 30]}
                component="div"
                count={totalCount} // Use totalCount from the API response
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableContainer>
          </Paper>
        </>
      )}
    </>
  );
}

export default RacesPerSeason;
