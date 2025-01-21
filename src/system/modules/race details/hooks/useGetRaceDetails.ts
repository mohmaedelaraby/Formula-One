import { useQuery, UseQueryResult } from "react-query";
import { RaceResultsResponse } from "../../../types/Types";
import { getRaceResult } from "../services/RaceDetailsApi";

const fetchRaceResault = async (
  limit: number,
  offset: number,
  season: string,
  round: string
): Promise<RaceResultsResponse> => {
  return await getRaceResult(limit, offset, season, round);
};

const useGetRaceResult = (limit = 10, offset = 0,season = "", round = "") => {
  const {
    data,
    isLoading,
    isError,
    refetch,
  }: UseQueryResult<RaceResultsResponse, Error> = useQuery<RaceResultsResponse, Error>(
    ["raceDeatilas", { limit, offset,season, round }],
    () => fetchRaceResault(limit, offset,season, round),
    {
      refetchOnWindowFocus: false,
      enabled: false,
      keepPreviousData: true,
      staleTime: 5000,
    }
  );

  return {
    RaceDetailsData: data?.RaceTable?.Races || [],
    totalCount: data?.total || 0,
    isLoading,
    isError,
    refetch,
  };
};

export default useGetRaceResult;

