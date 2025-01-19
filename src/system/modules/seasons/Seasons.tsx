import React, { useEffect, useState } from "react";
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
  CircularProgress,
  Typography,
} from "@mui/material";

import useSeasons from "./hooks/useSeasons";
import { Season } from "../../types/Types";

function Seasons() {
  const [page, setPage] = useState<number>(0); // Current page for pagination
  const [rowsPerPage, setRowsPerPage] = useState<number>(10); // Number of rows per page

  const { SeasonData, totalCount, isLoading, isError, refetch } = useSeasons(
    rowsPerPage,
    page * rowsPerPage
  ); // Fetch data for current page

  useEffect(() => {
    // Automatically refetch data whenever the page or rows per page change
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
    setPage(0); // Reset to the first page when rows per page is changed
  };

  if (isLoading) {
    return (
      <Paper sx={{ padding: 2 }}>
        <CircularProgress />
      </Paper>
    );
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
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Season</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {SeasonData.map((season: Season, index: number) => (
                <TableRow hover key={index}>
                  <TableCell>{season.season}</TableCell>
                </TableRow>
              ))}
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
    </>
  );
}

export default Seasons;
