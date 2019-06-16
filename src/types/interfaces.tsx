export interface ResponseInterface {
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

export interface MovieInterface {
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
}

export interface CastInterface {
  character: {
    id: 78223;
    image: { medium: string; original: string };
    name: string;
    url: string;
    _links: { self: { href: string } };
  };
  person: {
    birthday: string;
    country: { name: string; code: string; timezone: string };
    deathday: any;
    gender: string;
    id: number;
    image: { medium: string; original: string };
    name: string;
    url: string;
    _links: { self: { href: string } };
  };
  self: boolean;
  voice: boolean;
}

export interface ScheduleInterface {
  id: number;
  url: string;
  name: string;
  season: number;
  number: number;
  airdate: string;
  airtime: string;
  airstamp: string;
  runtime: number;
  image: { medium: string; original: string };
  summary: string;
  show: MovieInterface;
}
