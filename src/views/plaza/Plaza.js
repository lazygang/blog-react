import React, { Component } from "react";
import { InputItem, Button, NavBar, Icon } from "antd-mobile";
import { connect } from "react-redux";
import { addTitle, addCount } from "../../action/index";
import Axios from "../../network/requests";
import "./plaza.less";

class Plaza extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: false,
    };
  }
  render() {
    return (
      <div
        className={
          this.props.location.pathname === "/index/plaza"
            ? "animate__animated animate__fadeIn "
            : ""
        }
      >
        <NavBar
          mode="light"
          leftContent={
            <div
              style={{
                display: "inline-block",
                border: "0.1rem solid #4BD0D0",
                borderRadius: "1.5rem",
                padding: "0.1rem",
              }}
              onClick={() => {
                this.props.history.push("/index/user");
              }}
            >
              <svg
                class="icon"
                aria-hidden="true"
                style={{ width: "2rem", height: "2rem" }}
              >
                <use xlinkHref="#iconqie-01"></use>
              </svg>
            </div>
          }
          // rightContent={[
          //   <Icon key="0" type="search" style={{ marginRight: "16px" }} />,
          //   <Icon key="1" type="ellipsis" />,
          // ]}
        >
          广场
        </NavBar>
        <Button onClick={() => {
          Axios.post('/user/login',{name:'lazygang'}).then((res)=>{
            window.localStorage.setItem("token",res.headers.token);
            this.props.dispatch((dispatch) => {
              dispatch({
                  type:'login'
              })
            })
            console.log('登陆成功');
            console.log(res);
            // console.log(res.config.headers.token);
            // console.log(window.localStorage.getItem("token"));
          })
        }}>登录</Button>
        <Button onClick={() => {
          Axios.post('/user/test',{name:'lazygang'}).then((res)=>{
            console.log(res);
          })
        }}>test</Button>
        <Button>{this.props.islogin.islogin+''}</Button>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    title: state.title,
    islogin:state.islogin
  };
};
export default connect(mapStateToProps)(Plaza);
