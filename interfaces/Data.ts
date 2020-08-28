import { Characters, Locations, Episodes } from "./Interfaces";

export interface Data {
  [characters: string]: Characters;
  locations?: Locations;
  episodes?: Episodes;
  info: {
    pages: number;
    next: number;
  };
}
