import { useQuery, UseQueryResult } from "react-query";
import { SeasonResponse } from "../../../types/Types";
import { getRacePerSeason } from "../services/RacesPerSeasonApi";

const fetchRacePerSeason = async (
  limit: number,
  offset: number,
  season: string
): Promise<SeasonResponse> => {
  return await getRacePerSeason(limit, offset, season);
};

const useSeasons = (limit = 10, offset = 0, season = "") => {
  const {
    data,
    isLoading,
    isError,
    refetch,
  }: UseQueryResult<SeasonResponse, Error> = useQuery<SeasonResponse, Error>(
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

export default useSeasons;
