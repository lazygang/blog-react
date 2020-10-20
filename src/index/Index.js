import React, { Component } from "react";
import CacheRoute, { CacheSwitch } from "react-router-cache-route";
import "./index.less";
import routes from "./routes"
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
        {routes.map((item,index)=>{
          return <CacheRoute path={item.path} component={item.component} when="always" />
        })}
      </div>
    );
  }
}
export default Main;
