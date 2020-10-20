import React from "react";
import ReactDOM from "react-dom";
import "./index.less";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import store from "./reducer/index";
import { Provider } from "react-redux";
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
