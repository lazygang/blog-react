import React, { Component } from "react";
import CacheRoute, { CacheSwitch } from "react-router-cache-route";
import User from "./user/User.js";
import Plaza from "./plaza/Plaza.js";
class Main extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <CacheRoute path="/index/user" component={User} when="always"/>
        <CacheRoute path="/index/plaza" component={Plaza} when="always"/>
      </div>
    );
  }
}
export default Main;
