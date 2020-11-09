import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
//==========================================================================Reducer========================================
import counterReducer from "./counterReducer";
import titleReducer from "./titleReducer";
import isLoginReducer from "./isLoginReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  count: counterReducer,
  title: titleReducer,
  isLogin: isLoginReducer,
  user: userReducer,
});

const store = createStore(rootReducer, compose(applyMiddleware(...[thunk])));

export default store;
