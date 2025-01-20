import React, { useEffect, useState } from "react";
import "./Styles.css";
import { useParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Typography,
} from "@mui/material";
import { Result } from "../../types/Types";
import useRaceResult from "./hooks/useRaceDetails";
import LoadingPage from "../../shared/loadingState/LoadingPage";

function RaceDetails() {
  const { season, round } = useParams();

  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const { RaceDetailsData, totalCount, isLoading, isError, refetch } =
    useRaceResult(rowsPerPage, page * rowsPerPage, season, round);

  useEffect(() => {
    refetch();
  }, [page, rowsPerPage, refetch]);

  // Handle page change event
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  // Handle rows per page change event
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isError) {
    return (
      <Paper sx={{ padding: 2 }}>
        <Typography color="error">
          Error occurred while fetching data!
        </Typography>
      </Paper>
    );
  }

  return (
    <>
      {!isLoading && (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    Race Result : {season} {round}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {RaceDetailsData[0]?.Results?.map(
                  (season: Result, index: number) => (
                    <TableRow hover key={index}>
                      <TableCell>{season?.Driver?.givenName}</TableCell>
                    </TableRow>
                  )
                )}
                {/* <div>
          {RaceData.map((season: Season, index: number) => (
            <div className="test" style={{width:'200px'}} key={index}>
              {season.season}
            </div>
          ))}
        </div> */}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={totalCount} // Use totalCount from the API response
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}
    </>
  );
}

export default RaceDetails;
