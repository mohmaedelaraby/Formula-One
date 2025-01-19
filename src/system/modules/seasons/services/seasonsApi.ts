import axios from "axios";
import { SeasonResponse } from "../../../types/Types";
export const getSeason = async (limit = 10, offset = 0): Promise<SeasonResponse> => {
    const res = await axios.get(`http://ergast.com/api/f1/seasons.json`, {
      params: { limit, offset }, // Add query parameters for pagination
    });
    return res.data.MRData
  };
