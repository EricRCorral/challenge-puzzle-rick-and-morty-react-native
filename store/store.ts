import { createStore, compose, applyMiddleware } from "redux";
import queryReducer from "../reducers/query";
import thunk from "redux-thunk";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore() {
  let store = createStore(
    queryReducer,
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
}
