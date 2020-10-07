import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
//==========================================================================Reducer========================================
import counterReducer from "./counterReducer";
import titleReducer from "./titleReducer";
import isLogin from "./isLogin";

const rootReducer = combineReducers({
  count: counterReducer,
  title: titleReducer,
  islogin: isLogin,
});

const store = createStore(rootReducer, compose(applyMiddleware(...[thunk])));

export default store;
