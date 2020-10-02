import React from "react";
import "./App.less";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Login from "./index/Login";
import Index from "./views/Index";

function App() {
  return (
    <div className="App">
      <div className="AppContent">
        <Router>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route path="/index" component={Index} />
            <Redirect from="/*" to="/index/plaza"></Redirect>
          </Switch>
        </Router>
      </div>
    </div>
  );
}
export default App;
