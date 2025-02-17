import useGetRacePerSeasons from "./useGetRacePerSeason";
import React, { useCallback, useEffect, useState } from "react";

interface Props {
  season: string;
}
export const useRacePerSeasons = (props: Props) => {
  const { season } = props;
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(20);
  const { RaceData, totalCount, isLoading, isError, refetch } =
    useGetRacePerSeasons(rowsPerPage, page * rowsPerPage, season);
  const [view, setView] = useState<"table" | "card">("table"); // State to track the current view

  // Toggle between 'card' and 'table'
  const toggleView = useCallback((display: "table" | "card") => {
    setView(display);
  }, []);
  useEffect(() => {
    refetch();
  }, [page, rowsPerPage, refetch]);

  // Handle page change event
  const handleChangePage = useCallback(
    (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
      setPage(newPage);
    },
    []
  );

  const handleChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 20));
      setPage(0);
    },
    []
  );

  return {
    view,
    handleChangePage,
    handleChangeRowsPerPage,
    toggleView,
    RaceData,
    totalCount,
    isLoading,
    isError,
    rowsPerPage,
    page,
  };
};
