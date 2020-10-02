import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
//==========================================================================Reducer========================================
import counterReducer from "./counterReducer";
import titleReducer from "./titleReducer";

const rootReducer = combineReducers({
  count: counterReducer,
  title: titleReducer,
});

const store = createStore(rootReducer, compose(applyMiddleware(...[thunk])));

export default store
