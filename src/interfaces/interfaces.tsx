export interface IShow {
  score: number;
  show: {
    externals: {
      tvrage: number;
      thetvdb: number;
      imdb: string;
    };
    genres: string[];
    id: number;
    image: { medium: string; original: string };
    language: string;
    name: string;
    network: {
      id: number;
      name: string;
      country: {
        code: string;
        name: string;
        timezone: string;
      };
    };
    officialSite: any;
    premiered: string;
    rating: { average: number };
    runtime: number;
    schedule: { time: string; days: string[] };
    status: string;
    summary: string;
    type: string;
    updated: number;
    url: string;
    webChannel: any;
    weight: number;
  };
}
