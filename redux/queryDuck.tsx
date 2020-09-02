import { ApolloClient, InMemoryCache } from "@apollo/client";
import queryCharacters from "../apollo/queries/queryCharacters";
import queryEpisodes from "../apollo/queries/queryEpisodes";
import queryLocations from "../apollo/queries/queryLocations";

interface State {
  name: string;
  filter: string;
  data: object;
  fetching: boolean;
  currentCard: number;
  filterNoCharacters: boolean;
}

interface Action {
  type: string;
  payload: any;
}

interface Dispatch {
  (type: object): any;
}

let initialData: State = {
  name: "",
  filter: "characters",
  data: {},
  fetching: false,
  currentCard: 0,
  filterNoCharacters: false,
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
const SET_REQUIRED_DATA = "SET_REQUIRED_DATA";

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
    case SET_REQUIRED_DATA:
      return { ...state, filterNoCharacters: action.payload };
    default:
      return state;
  }
}

export let getDataAction = (next?: number) => (
  dispatch: Dispatch,
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
      .query({
        query: query,
        variables: { name: { name: getState().name }, page: 1 },
        errorPolicy: "all",
      })
      .then(({ data }) => {
        dispatch({
          type: GET_DATA_SUCCESS,
          payload: { data, error: false },
        });
      })
      .catch(() => {
        dispatch({
          type: GET_DATA_ERROR,
          payload: { error: true },
        });
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
  dispatch: Dispatch,
  getState: { (): any }
) => {
  dispatch({
    type: SET_NAME,
    payload: searcherVal,
  });
  getDataAction()(dispatch, getState);
};

export let setFilterAction = (filter: string) => (
  dispatch: Dispatch,
  getState: { (): any }
) => {
  dispatch({
    type: SET_FILTER,
    payload: filter,
  });
  getDataAction()(dispatch, getState);
};

export let setCurrentCardAction = (i: number) => (dispatch: Dispatch) => {
  dispatch({
    type: SET_CURRENT_CARD,
    payload: i,
  });
};

export let setRequiredDataAction = (filterNoCharacters: boolean) => (
  dispatch: Dispatch
) => {
  dispatch({
    type: SET_REQUIRED_DATA,
    payload: filterNoCharacters,
  });
};
