import { createStore, compose, applyMiddleware } from "redux";
import queryReducer from "./queryDuck";
import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore() {
  let store = createStore(
    queryReducer,
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
}
