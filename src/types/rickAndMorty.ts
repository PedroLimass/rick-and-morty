export type CharacterStatus = "Alive" | "Dead" | "unknown";

export interface ApiInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface ApiList<T> {
  info: ApiInfo;
  results: T[];
}

export interface ResourceRef {
  name: string;
  url: string;
}

export interface Character {
  id: number;
  name: string;
  status: CharacterStatus;
  species: string;
  type: string;
  gender: string;
  origin: ResourceRef;
  location: ResourceRef;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface Episode {
  id: number;
  name: string;
  air_date: string;
  /** Código no formato "S01E01". */
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

export interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}

export type EpisodeWithImage = Episode & { image?: string };
export type LocationWithImage = Location & { image?: string };
