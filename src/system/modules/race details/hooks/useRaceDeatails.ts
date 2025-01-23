import React, { useState, useEffect, useCallback } from "react";
import useGetRaceResult from "./useGetRaceDetails";
import {  Result } from "../../../types/Types";

interface Props {
  season: string;
  round: string;
}

export const useRaceDetails = (props: Props) => {
  const { season, round } = props;
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(18);

  // Fetching race result data
  const { RaceDetailsData, totalCount, isLoading, isError, refetch } =
    useGetRaceResult(rowsPerPage, page * rowsPerPage, season, round);

  const [view, setView] = useState<"table" | "card">("table");
  const [filteredResults, setFilteredResults] = useState<Result[]>([]); // Store filtered results for table view

  useEffect(() => {
    // Initialize filtered results to the full set of results when data is fetched
    if (RaceDetailsData?.[0]?.Results) {
      setFilteredResults(RaceDetailsData[0]?.Results); // Set the full results initially
    }
  }, [RaceDetailsData]);

  const toggleView = useCallback((display: "table" | "card") => {
    setView(display);
  }, []);

  useEffect(() => {
    refetch();
  }, [page, rowsPerPage, refetch]);

  const handleChangePage = useCallback(
    (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
      setPage(newPage);
    },
    []
  );

  const handleChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    },
    []
  );

  // Handle the driver search
  const driverSearch = useCallback(
    (name: string) => {
      if (!name) {
        // If the search is cleared, reset to all results
        if (RaceDetailsData?.[0]?.Results) {
          setFilteredResults(RaceDetailsData[0]?.Results); // Reset to full results
        }
        return;
      }

      // Filter the results by driver's name (given name or family name)
      const filtered = RaceDetailsData?.[0]?.Results.filter(
        (driver: Result) =>
          driver?.Driver?.givenName
            ?.toLowerCase()
            .includes(name.toLowerCase()) ||
          driver?.Driver?.familyName
            ?.toLowerCase()
            .includes(name.toLowerCase())
      );

      setFilteredResults(filtered || []); // Set filtered results for the table
    },
    [RaceDetailsData]
  );

  return {
    view,
    handleChangePage,
    handleChangeRowsPerPage,
    toggleView,
    driverSearch,
    RaceDetailsData,
    filteredResults, // Use this for the filtered results
    totalCount,
    isLoading,
    isError,
    rowsPerPage,
    page,
  };
};
