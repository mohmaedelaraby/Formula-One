import axios from "axios";
import { RaceResultsResponse } from "../../../types/Types";

export const getRaceResult = async (
  limit = 20,
  offset = 0,
  season: string,
  round: string
): Promise<RaceResultsResponse> => {
  const res = await axios.get(
    `http://ergast.com/api/f1/${season}/${round}/results.json`,
    {
      params: { limit, offset }, // Add query parameters for pagination
    }
  );
  return res.data.MRData;
};
