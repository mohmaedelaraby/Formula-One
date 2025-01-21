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

export interface RaceResponse {
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
  Results: Result[];
  date: string;
}

export interface RacesPerSeason {
  season: string;
  races: Races[];
}

export interface Result {
  Constructor: {
    constructorId: string;
    url: string;
    name: string;
    nationality: string;
  };
  Driver: {
    driverId: string;
    url: string;
    givenName: string;
    familyName: string;
    dateOfBirth: string;
    nationality: string;
  };
  Time: { millis: string; time: string };
  grid: string;
  laps: string;
  number: string;
  points: string;
  position: string;
  positionText: string;
  status: string;
}

export interface RaceResultsResponse {
  RaceTable: {
    Races: Races[];
  };
  total: number;
}
