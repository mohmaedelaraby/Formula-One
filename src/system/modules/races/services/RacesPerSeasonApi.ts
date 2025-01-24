import axios from "axios";
import {  RaceResponse } from "../../../types/Types";

  export const getRacePerSeason = async (limit = 20, offset = 0 , season:string): Promise<RaceResponse>  => {
    const res = await axios.get(`https://ergast.com/api/f1/${season}/races.json`, {
      params: { limit, offset }, // Add query parameters for pagination
    });
    return res.data.MRData
  };
