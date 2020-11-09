import React, { Component } from "react";
import { connect } from "react-redux";
import { InputItem, Drawer, Button } from "antd-mobile";
import "./login.less";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDrawer: false,
    };
  }
  openDrawer = () => {
    this.setState({
      openDrawer: !this.state.openDrawer,
    });
  };
  unLogin = async()=>{
    window.localStorage.setItem("isLogin",'');
    window.localStorage.setItem("userData",'')
    this.props.dispatch({
      type: "unLogin",
      payload: null,
    });
   await this.props.dispatch({
      type: "updateUser",
      payload: {},
    });
    this.props.history.push('/index/user')
  }
  componentDidMount() {
    console.log(this.props.user);
  }
  render() {
    return (
      <div>
        <div
          style={{
            height: "24rem",
            // backgroundColor: "red",
            paddingTop: "6rem",
          }}
        >
          <Drawer
            className="my-drawer"
            onOpenChange={() => {
              this.openDrawer();
            }}
            open={this.state.openDrawer}
            sidebar={
              <div style={{ width: "20rem", paddingTop: "3rem" }}>
                <div
                  style={{
                    width: "6rem",
                    border: "0.1rem solid #4BD0D0",
                    borderRadius: "15rem",
                    padding: "0.1rem",
                    margin: "0 auto",
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
                    onClick={() => {}}
                  >
                    <use xlinkHref={this.props.user.head?this.props.user.head:"#iconqie-01"}></use>
                  </svg>
                </div>
                <div
                  style={{
                    margin: "1rem auto",
                    width: "10rem",
                    textAlign: "center",
                    fontSize: "1.5rem",
                  }}
                  onClick={() => {}}
                >
                  {this.props.user.nickName?this.props.user.nickName:'快点娶个好名字'}
                </div>
                <Button
                  type="warning"
                  style={{
                    position: "absolute",
                    bottom: "5rem",
                    width: "100%",
                  }}
                  onClick={() => {this.unLogin()}}
                >
                  退出登录
                </Button>
              </div>
            }
          ></Drawer>
          <svg
            class="icon"
            aria-hidden="true"
            style={{
              width: "2.5rem",
              height: "2.5rem",
              transform: "translate(800%,-200%)",
            }}
            onClick={() => {
              this.openDrawer();
            }}
          >
            <use xlinkHref="#iconshezhi"></use>
          </svg>
          <div
            style={{
              margin: "0 auto",
              width: "18rem",
              height: "12rem",
              // backgroundColor: "blue",
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
            >
              <svg
                class="icon"
                aria-hidden="true"
                style={{
                  width: "6rem",
                  height: "5.5rem",
                  paddingRight: "0.5rem",
                }}
                onClick={() => {}}
              >
                <use xlinkHref={this.props.user.head}></use>
              </svg>
            </div>
            <div
              style={{
                margin: "1rem auto",
                width: "10rem",
                textAlign: "center",
                fontSize: "1.5rem",
              }}
              onClick={() => {}}
            >
              {this.props.user.nickName}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user.user,
  };
};
export default connect(mapStateToProps)(Login);
