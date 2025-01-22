import useGetSeasons from "./useGetSeasons";
import React, { useCallback, useEffect, useState } from "react";

const useSeasons = () => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(9);
  const { SeasonData, totalCount, isLoading, isError, refetch } = useGetSeasons(
    rowsPerPage,
    page * rowsPerPage
  );
  const [view, setView] = useState<"table" | "card">("table"); // State to track the current view

  // Toggle between 'card' and 'table'
  const toggleView = useCallback((display: "table" | "card") => {
    setView(display);
  }, []);
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

  return {
    view,
    handleChangePage,
    handleChangeRowsPerPage,
    toggleView,
    SeasonData,
    totalCount,
    isLoading,
    isError,
    rowsPerPage,
    page
  };
};

export default useSeasons;
