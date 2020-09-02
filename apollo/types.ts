import { Characters, Locations, Episodes } from './variables'

export interface Response {
  [characters: string]: Characters;
  locations?: Locations;
  episodes?: Episodes;
  info: {
    pages: number;
    next: number;
  };
}
