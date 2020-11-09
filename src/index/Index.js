import React, { Component } from "react";
import CacheRoute, { CacheSwitch } from "react-router-cache-route";
import "./index.less";
import routes from "./routes";
import TarBar_ from "../component/content/TarBar_.js";
import { connect } from "react-redux";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: false,
    };
  }
  componentDidMount() {
    let isLogin = window.localStorage.getItem("isLogin");
    if (isLogin === "true") {
      let userData = JSON.parse(window.localStorage.getItem("userData"));
      this.props.dispatch({
        type: "updateUser",
        payload: userData,
      });
      this.props.dispatch({
        type: "login",
        payload: null,
      });
    }  
  }
  render() {
    return (
      <div>
        {/* 底部菜单栏 */}
        <TarBar_
          location={this.props.location}
          history={this.props.history}
        ></TarBar_>
        {/* 缓存路由 */}
        {routes.map((item, index) => {
          return (
            <CacheRoute
              path={item.path}
              component={item.component}
              when="always"
            />
          );
        })}
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user.user,
    isLogin: state.isLogin.isLogin,
  };
};
export default connect(mapStateToProps)(Index);
