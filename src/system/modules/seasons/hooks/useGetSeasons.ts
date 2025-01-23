import { useQuery, UseQueryResult } from "react-query";
import { getSeason } from "../services/seasonsApi";
import { SeasonResponse } from "../../../types/Types";


const fetchSeasons = async (
  limit: number,
  offset: number
): Promise<SeasonResponse> => {
  return await getSeason(limit, offset);
};

const useGetSeasons = (limit = 10, offset = 0) => {
  const { data, isLoading, isError, refetch }: UseQueryResult<SeasonResponse, Error> =
    useQuery<SeasonResponse, Error>(
      ["seasons", { limit, offset }],
      () => fetchSeasons(limit, offset),
      {
        refetchOnWindowFocus: false,
        enabled: false,
        keepPreviousData: true,
        staleTime: 5000,
      }
    );

  return {
    SeasonData: data?.SeasonTable?.Seasons || [],
    totalCount: data?.total || 0,
    isLoading,
    isError,
    refetch,
  };
};

export default useGetSeasons;
