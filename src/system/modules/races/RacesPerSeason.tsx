import React from 'react';
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
import { format } from "date-fns";
import {useRacePerSeasons} from "./hooks/useRacePerSeason";
import usePinStore from "../../stores/usePinSore";
import PushPinIcon from "@mui/icons-material/PushPin";

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
  } = useRacePerSeasons({ season: season! });
  const { pinnedRaces, togglePin } = usePinStore();

  const sortedRaces = RaceData.sort((a, b) => {
    const aIsPinned = pinnedRaces.has(`${a.season}-${a.round}`);
    const bIsPinned = pinnedRaces.has(`${b.season}-${b.round}`);
    return (bIsPinned ? 1 : 0) - (aIsPinned ? 1 : 0);
  });

  if (isLoading || isError) {
    return <LoadingPage />;
  }

  return (
    <>
      {!isLoading && (
        <>
        <div className="display_center   display_center_col w-100">
          <div className="switch_view switch_view_between raceDetailsPageWidth">
            <p className="custom-table-title">Races </p>
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
                      <TableCell>Race</TableCell>
                      <TableCell>Circuit</TableCell>
                      <TableCell>Date</TableCell>
                    </TableRow>
                  </TableHead>
                )}
                <TableBody>
                  {view === "table" &&
                    sortedRaces.map((race: Races, index: number) => (
                      <TableRow
                        onClick={() => {
                          navigate(
                            `/results/${race?.season}/${
                              race?.round
                            }?name=${encodeURIComponent(race.raceName)}`
                          );
                        }}
                        hover
                        key={index}
                      >
                        <TableCell className="custom-table-click">
                          <Button
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent row click when pinning
                              togglePin(`${race.season}-${race.round}`);
                            }}
                          >
                            {pinnedRaces.has(`${race.season}-${race.round}`) ? (
                              <PushPinIcon sx={{ color: "red" }} />
                            ) : (
                              <PushPinIcon sx={{ color: "gray" }} />
                            )}
                          </Button>
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
                                  <div className="custom-card-top-postion">
                                    <Button
                                      onClick={(e) => {
                                        e.stopPropagation(); // Prevent row click when pinning
                                        togglePin(
                                          `${race.season}-${race.round}`
                                        );
                                      }}
                                    >
                                      {pinnedRaces.has(
                                        `${race.season}-${race.round}`
                                      ) ? (
                                        <PushPinIcon sx={{ color: "red" }} />
                                      ) : (
                                        <PushPinIcon sx={{ color: "gray" }} />
                                      )}
                                    </Button>
                                  </div>
                                </div>
                                <div className="custom-card-mid">
                                  <div className="custom-card-subtitle">
                                    {" "}
                                    <span className="custom-card-subtitle-label">
                                      circuit name :{" "}
                                    </span>{" "}
                                    {race.Circuit.circuitName}
                                  </div>
                                  <div className="custom-card-date">
                                    {format(
                                      new Date(race?.date),
                                      "MMMM dd, yyyy"
                                    )}
                                  </div>
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
                rowsPerPageOptions={[20, 40, 60]}
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

export default RacesPerSeason;
