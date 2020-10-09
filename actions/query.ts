import { ApolloClient, InMemoryCache, DocumentNode } from "@apollo/client";
import queryCharacters, {
  Variables as CharactersVariables,
} from "../apollo/queries/queryCharacters";
import queryEpisodes, {
  Variables as EpisodesVariables,
} from "../apollo/queries/queryEpisodes";
import queryLocations, {
  Variables as LocationsVariables,
} from "../apollo/queries/queryLocations";
import {
  GET_DATA,
  GET_DATA_ERROR,
  GET_DATA_SUCCESS,
  GET_MORE_DATA_SUCCESS,
  SET_CURRENT_CARD,
  SET_FILTER,
  SET_SEARCHER_VALUE,
  SET_REQUIRED_DATA,
} from "./types";

interface Dispatch {
  (type: object): any;
}

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  cache: new InMemoryCache(),
});

export let getDataAction = (next?: number) => (
  dispatch: Dispatch,
  getState: { (): any }
) => {
  const FILTER: string = getState().filter;
  const DATA: any = getState().data;
  const NAME: string = getState().searcherValue;

  if (FILTER === "characters") {
    if (!next && next !== null) {
      dispatch({
        type: GET_DATA,
      });

      return client
        .query<DocumentNode, CharactersVariables>({
          query: queryCharacters,
          variables: { name: { name: NAME }, page: 1 },
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
        .watchQuery<any, CharactersVariables>({
          query: queryCharacters,
          variables: { name: { name: NAME }, page: 1 },
        })
        .fetchMore({
          variables: { name: { name: NAME }, page: next },

          updateQuery: (prev, { fetchMoreResult }) => {
            if (next === null) {
              return;
            } else {
              fetchMoreResult[FILTER].results = [
                ...DATA[FILTER].results,
                ...fetchMoreResult[FILTER].results,
              ];

              dispatch({
                type: GET_MORE_DATA_SUCCESS,
                payload: fetchMoreResult,
              });
            }
          },
        });
    }
  } else if (FILTER === "locations") {
    if (!next && next !== null) {
      dispatch({
        type: GET_DATA,
      });

      return client
        .query<DocumentNode, LocationsVariables>({
          query: queryLocations,
          variables: { name: { name: NAME }, page: 1 },
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
        .watchQuery<any, LocationsVariables>({
          query: queryLocations,
          variables: { name: { name: NAME }, page: 1 },
        })
        .fetchMore({
          variables: { name: { name: NAME }, page: next },

          updateQuery: (prev, { fetchMoreResult }) => {
            if (next === null) {
              return;
            } else {
              fetchMoreResult[FILTER].results = [
                ...DATA[FILTER].results,
                ...fetchMoreResult[FILTER].results,
              ];

              dispatch({
                type: GET_MORE_DATA_SUCCESS,
                payload: fetchMoreResult,
              });
            }
          },
        });
    }
  } else {
    if (!next && next !== null) {
      dispatch({
        type: GET_DATA,
      });

      return client
        .query<DocumentNode, EpisodesVariables>({
          query: queryEpisodes,
          variables: { name: { name: NAME }, page: 1 },
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
        .watchQuery<any, EpisodesVariables>({
          query: queryEpisodes,
          variables: { name: { name: NAME }, page: 1 },
        })
        .fetchMore({
          variables: { name: { name: NAME }, page: next },

          updateQuery: (prev, { fetchMoreResult }) => {
            if (next === null) {
              return;
            } else {
              fetchMoreResult[FILTER].results = [
                ...DATA[FILTER].results,
                ...fetchMoreResult[FILTER].results,
              ];

              dispatch({
                type: GET_MORE_DATA_SUCCESS,
                payload: fetchMoreResult,
              });
            }
          },
        });
    }
  }
};

export let setSearcherValueAction = (searcherValue: string) => (
  dispatch: Dispatch,
  getState: { (): any }
) => {
  dispatch({
    type: SET_SEARCHER_VALUE,
    payload: searcherValue,
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
