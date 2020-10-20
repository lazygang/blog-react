import React, { Component } from "react";
import {
  Tabs,
} from "antd-mobile";
import LoginTab from "./login/LoginTab";
import RegisterTab from "./login/RegisterTab";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}
  render() {
    const tabs = [{ title: <div>登录</div> }, { title: <div>注册</div> }];
    return (
      <div
        className={
          this.props.location.pathname === "/login"
            ? "animate__animated animate__fadeIn "
            : ""
        }
      >
        <Tabs
          tabs={tabs}
          // tabBarPosition='bottom'
        >
          <div
            style={{ height: "93vh", position: "relative", paddingTop: "3rem" }}
          >
            <LoginTab history={this.props.history}></LoginTab>
          </div>
          {/* =============================注册================= */}
          <div
            style={{ height: "93vh", position: "relative", paddingTop: "3rem" }}
          >
            <RegisterTab history={this.props.history}></RegisterTab>
          </div>
        </Tabs>
      </div>
    );
  }
}
export default Login;
