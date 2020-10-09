import { Response as CharactersResponse } from "../apollo/queries/queryCharacters";
import { Response as EpisodesResponse } from "../apollo/queries/queryEpisodes";
import { Response as LocationsResponse } from "../apollo/queries/queryLocations";
import {
  SET_REQUIRED_DATA,
  SET_SEARCHER_VALUE,
  SET_FILTER,
  SET_CURRENT_CARD,
  GET_MORE_DATA_SUCCESS,
  GET_DATA_SUCCESS,
  GET_DATA_ERROR,
  GET_DATA,
} from "../actions/types";

interface State {
  searcherValue: string;
  filter: string;
  data: CharactersResponse | EpisodesResponse | LocationsResponse;
  fetching: boolean;
  currentCard: number;
  filterNoCharacters: boolean;
}

interface Action {
  type: string;
  payload: any;
}

let initialData: State = {
  searcherValue: "",
  filter: "characters",
  data: {},
  fetching: false,
  currentCard: 0,
  filterNoCharacters: false,
};

export default function reducer(state = initialData, action: Action) {
  switch (action.type) {
    case GET_DATA:
      return { ...state, fetching: true };
    case GET_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        error: action.payload.error,
        fetching: false,
      };
    case GET_DATA_ERROR:
      return {
        ...state,
        error: action.payload,
        fetching: false,
      };
    case GET_MORE_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case SET_SEARCHER_VALUE:
      return { ...state, searcherValue: action.payload };
    case SET_FILTER:
      return { ...state, filter: action.payload };
    case SET_CURRENT_CARD:
      return { ...state, currentCard: action.payload };
    case SET_REQUIRED_DATA:
      return { ...state, filterNoCharacters: action.payload };
    default:
      return state;
  }
}
