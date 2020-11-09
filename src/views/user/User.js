import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, InputItem } from "antd-mobile";
import UnLogin from "./child/UnLogin";
import Login from "./child/Login";
class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
    };
  }
  componentDidMount() {

  }
  render() {
    return (
      <div
        className={
          this.props.location.pathname === "/index/user"
            ? "animate__animated animate__fadeIn "
            : ""
        }
      >
        {this.props.isLogin ? (
         <Login history={this.props.history}></Login>
        ) : (
          <UnLogin history={this.props.history}></UnLogin>
        )}
        <Button
          onClick={() => {
 
          }}
        >用户界面测试按钮暂时无作用</Button>
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
export default connect(mapStateToProps)(User);
