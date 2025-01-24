 
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
  TextField,
} from "@mui/material";
import TableRowsIcon from "@mui/icons-material/TableRows";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Result } from "../../types/Types";
import LoadingPage from "../../shared/loadingState/LoadingPage";
import { useParams } from "react-router-dom";
import { useRaceDetails } from "./hooks/useRaceDeatails";
import PostionCircle from "./components/Postion Circle/PostionCircle";
import ChartsSection from "./components/ChartsSection/ChartsSection";
import NotFoundPage from "../../shared/NotFoundPage/NotFoundPage";

function RaceDetails() {
  const { season, round } = useParams();
  const {
    RaceDetailsData,
    filteredResults, // Use the filtered results
    handleChangePage,
    handleChangeRowsPerPage,
    isError,
    isLoading,
    toggleView,
    totalCount,
    view,
    rowsPerPage,
    page,
    driverSearch,
  } = useRaceDetails({ season: season!, round: round! });
  if (isLoading) {
    return <LoadingPage />;
  }
  if (isError) {
    return <NotFoundPage />;
  }
  return (
    <>
      {!isLoading && !isError && (
        <div className="display_center display_center_col w-100">
          <ChartsSection data={{ ...RaceDetailsData }} />

          <div className="switch_view switch_view_between raceDetailsPageWidth">
            <p className="custom-table-title">Drivers</p>
            <div className="display_center">
              <div className="search_container">
                <TextField
                  placeholder="Highlight Driver"
                  key={"highlight"}
                  className="custom-textfield"
                  type="text"
                  onChange={(e) => driverSearch(e.target.value)} // Trigger search
                />
              </div>
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
          </div>

          <Paper
            className="display_center"
            sx={{ width: "100%", overflow: "hidden", marginTop: "12px" }}
          >
            <TableContainer className="custom-table-container">
              <Table className="custom-table">
                {view === "table" && (
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Nationality</TableCell>
                      <TableCell>Team</TableCell>
                      <TableCell>Position</TableCell>
                    </TableRow>
                  </TableHead>
                )}
                <TableBody>
                  {view === "table" &&
                    filteredResults?.map((result: Result, index: number) => (
                      <TableRow hover key={index}>
                        <TableCell className="custom-table-click">
                          {result.Driver.givenName} {result.Driver.familyName}
                        </TableCell>
                        <TableCell>{result.Driver.nationality}</TableCell>
                        <TableCell>{result.Constructor.name}</TableCell>
                        <TableCell>{result.position}</TableCell>
                      </TableRow>
                    ))}

                  {view === "card" && (
                    <div className="grid_view">
                      {RaceDetailsData[0]?.Results.map((result: Result, index: number) => (
                        <div key={index}>
                          <Card className="custom-card">
                            <CardContent className="custom-card-container">
                              <div className="custom-card-top">
                                {result.Driver.givenName} {result.Driver.familyName}
                                <div className="custom-card-top-postion">
                                  <PostionCircle number={result.position} />
                                </div>
                              </div>
                              <div className="custom-card-mid">
                                <div>
                                  He is{" "}
                                  <strong className="custom-card-mid-nat">
                                    {result.Driver.nationality}
                                  </strong>{" "}
                                  Driver who Represents{" "}
                                  <strong className="custom-card-mid-team">
                                    {result.Constructor.name}
                                  </strong>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      ))}
                    </div>
                  )}
                </TableBody>
              </Table>
              <TablePagination
                className="custom-pagination"
                rowsPerPageOptions={[20, 40, 60]}
                component="div"
                count={totalCount}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableContainer>
          </Paper>
        </div>
      )}
    </>
  );
}

export default RaceDetails;
