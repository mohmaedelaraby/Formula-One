import React from 'react'; // Add this line
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
import { Season } from "../../types/Types";
import LoadingPage from "../../shared/loadingState/LoadingPage";
import { useNavigate } from "react-router-dom";
import {useSeasons} from "./hooks/useSeasons";

function Seasons() {
  const navigate = useNavigate();
  const {
    SeasonData,
    handleChangePage,
    handleChangeRowsPerPage,
    isError,
    isLoading,
    toggleView,
    totalCount,
    view,
    rowsPerPage,
    page,
  } = useSeasons();

  if (isLoading || isError) {
    return <LoadingPage />;
  }

  return (
    <>
      {!isLoading && (
        <>
          <div className="display_center display_center_col w-100">
            <div className="switch_view switch_view_between raceDetailsPageWidth">
              <p className="custom-table-title">Seasons </p>
              <div className="display_center">
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
              sx={{ width: "100%", overflow: "hidden" }}
            >
              <TableContainer className="custom-table-container">
                <Table className="custom-table">
                  {view === "table" && (
                    <TableHead>
                      <TableRow>
                        <TableCell>Season</TableCell>
                        <TableCell>Link</TableCell>
                      </TableRow>
                    </TableHead>
                  )}
                  <TableBody>
                    {view === "table" &&
                      SeasonData.map((season: Season, index: number) => (
                        <TableRow hover key={index}>
                          <TableCell
                            className="custom-table-click"
                            onClick={() => {
                              navigate(`/races/${season.season}`);
                            }}
                          >
                            {season.season}
                          </TableCell>
                          <TableCell>
                            <a
                              className="table_link"
                              href={season.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Link
                            </a>
                          </TableCell>
                        </TableRow>
                      ))}

                    {view === "card" && (
                      <>
                        <div className="grid_view">
                          {SeasonData.map((season: Season, index: number) => (
                            <div key={index}>
                              <Card className="custom-card">
                                <CardContent className="custom-card-container">
                                  <div className="custom-card-top">
                                    <a
                                      href={season.url}
                                      target="_blank"
                                      className="card_link"
                                      rel="noopener noreferrer"
                                    >
                                      {season.season}
                                    </a>
                                  </div>

                                  <Button
                                    variant="contained"
                                    className="custom-card-btn"
                                    size="small"
                                    onClick={() => {
                                      navigate(`/races/${season.season}`);
                                    }}
                                    style={{ marginTop: "10px" }}
                                  >
                                    Show Races
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
          </div>
        </>
      )}
    </>
  );
}

export default Seasons;