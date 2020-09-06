import { gql } from "@apollo/client";
import { Data } from "../types";

const queryLocations = gql`
  query($name: FilterLocation, $page: Int) {
    locations(filter: $name, page: $page) {
      results {
        id
        name
        type
        dimension
        residents {
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

export default queryLocations;
