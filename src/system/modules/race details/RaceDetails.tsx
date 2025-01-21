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
} from "@mui/material";
import TableRowsIcon from "@mui/icons-material/TableRows";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Result } from "../../types/Types";
import LoadingPage from "../../shared/loadingState/LoadingPage";
import { useParams } from "react-router-dom";
import useRaceDetails from "./hooks/useRaceDeatails";
import PostionCircle from "./components/Gold Circle/GoldCircle";

function RaceDetails() {
  const { season, round } = useParams();
  const {
    RaceDetailsData,
    handleChangePage,
    handleChangeRowsPerPage,
    isError,
    isLoading,
    toggleView,
    totalCount,
    view,
    rowsPerPage,
    page,
  } = useRaceDetails({ season: season!, round: round! });

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
                      <TableCell>Name </TableCell>
                      <TableCell>Nationality</TableCell>
                      <TableCell>Team</TableCell>
                      <TableCell>Position</TableCell>
                    </TableRow>
                  </TableHead>
                )}
                <TableBody>
                  {view === "table" &&
                    RaceDetailsData[0]?.Results.map(
                      (result: Result, index: number) => (
                        <TableRow hover key={index}>
                          <TableCell className="custom-table-click">
                            {result.Driver.givenName} {result.Driver.familyName}
                          </TableCell>
                          <TableCell>{result.Driver.nationality}</TableCell>
                          <TableCell>{result.Constructor.name}</TableCell>
                          <TableCell>{result.position}</TableCell>
                        </TableRow>
                      )
                    )}

                  {view === "card" && (
                    <>
                      <div className="grid_view">
                        {RaceDetailsData[0]?.Results.map(
                          (result: Result, index: number) => (
                            <div>
                              <Card className="custom-card" key={index}>
                                <CardContent className="custom-card-container">
                                  <div className="custom-card-top">
                                    {result.Driver.givenName}{" "}
                                    {result.Driver.familyName}
                                    <div className="custom-card-top-postion">
                                      <PostionCircle number={result.position} />
                                    </div>
                                  </div>
                                  <div className="custom-card-mid">
                                    <div>
                                      He Is{" "}
                                      <strong>
                                        {result.Driver.nationality}
                                      </strong>{" "}
                                      Driver who Represnt
                                      <strong>{result.Constructor.name}</strong>
                                    </div>
                                  </div>

                                  {/* <Button
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
                                </Button> */}
                                </CardContent>
                              </Card>
                            </div>
                          )
                        )}
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

export default RaceDetails;
