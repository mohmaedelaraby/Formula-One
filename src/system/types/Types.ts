export interface Season {
  season: string;
  url: string;
}

export interface SeasonResponse {
  SeasonTable: {
    Seasons: Season[];
  };
  total: number; // The total number of seasons available in the database
}
