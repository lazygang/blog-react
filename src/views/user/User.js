import React, { Component } from "react";
import { connect } from "react-redux";
import { InputItem } from "antd-mobile";
class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
    };
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
        <div
          style={{
            height: "24rem",
            backgroundColor: "red",
            paddingTop: "6rem",
          }}
        >
          {this.state.isLogin ? (
            <div> </div>
          ) : (
            <div
              style={{
                margin: "0 auto",
                width: "18rem",
                height: "12rem",
                backgroundColor: "blue",
                paddingTop: "1.5rem",
              }}
            >
              <div
                style={{
                  width: "6rem",
                  border: "0.1rem solid #4BD0D0",
                  borderRadius: "15rem",
                  padding: "0.1rem",
                  margin: "0 auto",
                }}
                onClick={() => {
                  this.props.history.push("/login");
                }}
              >
                <svg
                  class="icon"
                  aria-hidden="true"
                  style={{
                    width: "6rem",
                    height: "5.5rem",
                    paddingRight: "0.5rem",
                  }}
                >
                  <use xlinkHref="#iconqie-01"></use>
                </svg>
              </div>
              <div
                style={{
                  margin: "1rem auto",
                  width: "10rem",
                  textAlign: "center",
                  fontSize: "1.5rem",
                }}
                onClick={() => {
                  this.props.history.push("/login");
                }}
              >
                登录/注册
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    title: state.title,
    user: state.user,
  };
};
export default connect(mapStateToProps)(User);
