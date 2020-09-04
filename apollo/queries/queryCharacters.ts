import { gql } from "@apollo/client";
import { Characters } from "../types";

const queryCharacters = gql`
  query Characters($name: FilterCharacter, $page: Int) {
    characters(filter: $name, page: $page) {
      results {
        id
        name
        type
        gender
        species
        image
      }
      info {
        pages
        next
      }
    }
  }
`;

export interface Variables {
  name: {
    name: string;
  };
  page: number;
}

export interface Response {
  [index: string]: Characters | Error | undefined;
  characters: Characters;
  error?: Error;
}

export default queryCharacters;
