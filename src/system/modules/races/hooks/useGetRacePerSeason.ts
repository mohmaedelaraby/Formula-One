import { useQuery, UseQueryResult } from "react-query";
import { RaceResponse } from "../../../types/Types";
import { getRacePerSeason } from "../services/RacesPerSeasonApi";

const fetchRacePerSeason = async (
  limit: number,
  offset: number,
  season: string
): Promise<RaceResponse> => {
  return await getRacePerSeason(limit, offset, season);
};

const useGetRacePerSeasons = (limit = 20, offset = 0, season = "") => {
  const {
    data,
    isLoading,
    isError,
    refetch,
  }: UseQueryResult<RaceResponse, Error> = useQuery<RaceResponse, Error>(
    ["racePerSeasons", { limit, offset, season }],
    () => fetchRacePerSeason(limit, offset, season),
    {
      refetchOnWindowFocus: false,
      enabled: false,
      keepPreviousData: true,
      staleTime: 5000,
    }
  );

  return {
    RaceData: data?.RaceTable?.Races || [],
    totalCount: data?.total || 0,
    isLoading,
    isError,
    refetch,
  };
};

export default useGetRacePerSeasons;
