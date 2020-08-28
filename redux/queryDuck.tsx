import { ApolloClient, InMemoryCache } from "@apollo/client";
import {
  queryCharacters,
  queryEpisodes,
  queryLocations,
} from "../apollo/queries";
import { State, Action } from "../interfaces/Interfaces";

let initialData: State = {
  name: "",
  filter: "characters",
  data: {},
  fetching: false,
  currentCard: 0,
  isFilterSelect: false,
};

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  cache: new InMemoryCache(),
});

const GET_DATA = "GET_DATA";
const GET_DATA_ERROR = "GET_DATA_ERROR";
const GET_DATA_SUCCESS = "GET_DATA_SUCCESS";
const GET_MORE_DATA_SUCCESS = "GET_MORE_DATA_SUCCESS";
const SET_NAME = "SET_NAME";
const SET_FILTER = "SET_FILTER";
const SET_CURRENT_CARD = "SET_CURRENT_CARD";
const SET_FILTER_SELECT = "SET_FILTER_SELECT";

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
    case SET_NAME:
      return { ...state, name: action.payload };
    case SET_FILTER:
      return { ...state, filter: action.payload };
    case SET_CURRENT_CARD:
      return { ...state, currentCard: action.payload };
    case SET_FILTER_SELECT:
      return { ...state, isFilterSelect: action.payload };
    default:
      return state;
  }
}

export let getDataAction = (next?: number) => (
  dispatch: Action,
  getState: { (): any }
) => {
  let query =
    getState().filter === "characters"
      ? queryCharacters
      : getState().filter === "locations"
      ? queryLocations
      : queryEpisodes;

  if (!next && next !== null) {
    dispatch({
      type: GET_DATA,
    });

    return client
      .watchQuery({
        query: query,
        variables: { name: { name: getState().name }, page: 1 },
        errorPolicy: "all",
      })
      .subscribe(({ data, errors }) => {
        if (data[getState().filter] !== null) {
          dispatch({
            type: GET_DATA_SUCCESS,
            payload: { data, error: false },
          });
        } else {
          if (errors) {
            dispatch({
              type: GET_DATA_ERROR,
              payload: true,
            });
          }
        }
      });
  } else {
    return client
      .watchQuery({
        query: query,
        variables: { name: { name: getState().name }, page: 1 },
      })
      .fetchMore({
        variables: { name: { name: getState().name }, page: next },

        updateQuery: (prev, { fetchMoreResult }) => {
          if (next === null) {
            return;
          } else {
            fetchMoreResult[getState().filter].results = [
              ...getState().data[getState().filter].results,
              ...fetchMoreResult[getState().filter].results,
            ];

            dispatch({
              type: GET_MORE_DATA_SUCCESS,
              payload: fetchMoreResult,
            });
          }
        },
      });
  }
};

export let setNameAction = (searcherVal: string) => (
  dispatch: Action,
  getState: { (): any }
) => {
  dispatch({
    type: SET_NAME,
    payload: searcherVal,
  });
  getDataAction()(dispatch, getState);
};

export let setFilterAction = (filter: string) => (
  dispatch: Action,
  getState: { (): any }
) => {
  dispatch({
    type: SET_FILTER,
    payload: filter,
  });
  getDataAction()(dispatch, getState);
};

export let setCurrentCardAction = (i: number) => (dispatch: Action) => {
  dispatch({
    type: SET_CURRENT_CARD,
    payload: i,
  });
};

export let setFilterSelectAction = (is: boolean) => (dispatch: Action) => {
  dispatch({
    type: SET_FILTER_SELECT,
    payload: is,
  });
};
