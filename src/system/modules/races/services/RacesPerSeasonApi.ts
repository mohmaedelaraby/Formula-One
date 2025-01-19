import axios from "axios";
import {  SeasonResponse } from "../../../types/Types";

  export const getRacePerSeason = async (limit = 10, offset = 0 , season:string): Promise<SeasonResponse>  => {
    const res = await axios.get(`http://ergast.com/api/f1/${season}/races.json`, {
      params: { limit, offset }, // Add query parameters for pagination
    });
    return res.data.MRData
  };
