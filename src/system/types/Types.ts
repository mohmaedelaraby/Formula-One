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

export interface SeasonResponse {
  RaceTable: {
    Races: Races[];
  };
  total: number; // The total number of seasons available in the database
}

export interface Races {
  season: string;
  round: string;
  url: string;
  raceName: string;
  Circuit: {
    circuitId: string;
    url: string;
    circuitName: string;
    Location: {
      lat: string;
      long: string;
      locality: string;
      country: string;
    };
  };
  date: string;
}

export interface RacesPerSeason {
  season: string;
  races: Races[];
}
