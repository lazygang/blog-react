import React, { Component } from "react";
import CacheRoute, { CacheSwitch } from "react-router-cache-route";
import { TabBar } from "antd-mobile";
import "./index.less";


import Blank_1 from "./blank_1/Blank_1.js";
import Blank_2 from "./blank_2/Blank_2.js";
import Plaza from "./plaza/Plaza.js";
import Prose from "./prose/Prose.js";
import User from "./user/User.js";

import TarBar_ from "../component/content/TarBar_.js";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: false,
    };
  }
  render() {
    return (
      <div>
        {/* 底部菜单栏 */}
        <TarBar_ location={this.props.location} history={this.props.history}></TarBar_>
        {/* 缓存路由 */}
        <CacheRoute path="/index/blank_1" component={Blank_1} when="always" />
        <CacheRoute path="/index/blank_2" component={Blank_2} when="always" />
        <CacheRoute path="/index/plaza" component={Plaza} when="always" />
        <CacheRoute path="/index/prose" component={Prose} when="always" />
        <CacheRoute path="/index/user" component={User} when="always" />
      </div>
    );
  }
}
export default Main;
