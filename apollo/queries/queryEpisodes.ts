import { gql } from "@apollo/client";
import { Data } from "../types";

const queryEpisodes = gql`
  query($name: FilterEpisode, $page: Int) {
    episodes(filter: $name, page: $page) {
      results {
        id
        name
        air_date
        episode
        characters {
          name
          image
          id
        }
      }
      info {
        pages
        next
      }
    }
  }
`;

export interface Variables {
  name: { name: string };
  page: number;
}

export interface Response {
  characters?: Data;
  locations?: Data;
  episodes?: Data;
  error?: readonly Error[];
}

export default queryEpisodes;
