import { gql } from "@apollo/client";
import { Locations } from "../types";

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
  [index: string]: Locations | Error | undefined;
  locations: Locations;
  error?: Error;
}

export default queryLocations;
