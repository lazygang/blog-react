import React, { Component } from "react";
import {
  WhiteSpace,
  List,
  InputItem,
  Toast,
  Checkbox,
  Button,
} from "antd-mobile";
import { connect } from "react-redux";
import { login_api } from "../../network/login";

class LoginTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        loginName: null,
        loginPassWord: null,
        rememberPassWord: true,
      },
    };
  }
  // 输入框绑定
  onChangeInput = (e, key) => {
    let data = this.state.data;
    data[key] = e;
    this.setState({
      data,
    });
  };
  // 选择框绑定
  onChangeCheck = (e, key) => {
    let data = this.state.data;
    data[key] = e.target.checked;
    this.setState({
      data,
    });
  };
  // 登录
  login = () => {
    if (!(this.state.data.loginName && this.state.data.loginPassWord)) {
      Toast.info("请输入账号密码", 3, () => {}, false);
      return false;
    }
    let data = {};
    data.name = this.state.data.loginName;
    data.passWord = this.state.data.loginPassWord;
    if (this.state.data.rememberPassWord) {
      window.localStorage.setItem("name", data.name);
      window.localStorage.setItem("passWord", data.passWord);
    } else {
      window.localStorage.setItem("name", data.name);
      window.localStorage.setItem("passWord", "");
    }
    let tip = Toast.loading("登陆中", 5, () => {}, true);
    login_api(data).then(async (res) => {
      Toast.hide();
      if (res && res.data) {
        if (res.data.success) {
          window.localStorage.setItem("isLogin", "true");
          window.localStorage.setItem(
            "userData",
            JSON.stringify(res.data.data)
          );
          this.props.dispatch({
            type: "login",
            payload: null,
          });
          await this.props.dispatch({
            type: "updateUser",
            payload: res.data.data,
          });
          this.props.history.push("/index/plaza");
          Toast.info("登录成功", 3, () => {}, false);
        } else {
          Toast.info(res.data.msg, 3, () => {}, false);
        }
      }
    });
  };
  componentDidMount() {
    let data = this.state.data;
    data.loginName = window.localStorage.getItem("name");
    data.loginPassWord = window.localStorage.getItem("passWord");
    this.setState({
      data,
    });
  }
  render() {
    return (
      <div>
        <List
          renderHeader={() => (
            <div style={{ textAlign: "center" }}>
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
              <div style={{ fontSize: "2rem" }}>登录</div>
            </div>
          )}
        >
          <InputItem
            autoAdjustHeight={true}
            clear={true}
            placeholder="请输入用户名"
            autoAdjustHeight={true}
            // error={this.state.hasError}
            // onErrorClick={this.onErrorClick}
            onChange={(e) => {
              this.onChangeInput(e, "loginName");
            }}
            value={this.state.data.loginName}
          >
            用户名
          </InputItem>
          <WhiteSpace size="xl" />
          <InputItem
            type="password"
            clear={true}
            placeholder="密码"
            autoAdjustHeight={true}
            //   error={this.state.hasError}
            //   onErrorClick={this.onErrorClick}
            onChange={(e) => {
              this.onChangeInput(e, "loginPassWord");
            }}
            value={this.state.data.loginPassWord}
          >
            密码
          </InputItem>
        </List>
        <WhiteSpace size="xl" />
        <div>
          <div
            style={{
              display: "inline-block",
              width: "18rem",
              paddingLeft: "2rem",
              color: "#108EE9",
            }}
          >
            忘记密码?
          </div>
          <Checkbox
            style={{ width: "6rem", display: "inline-block" }}
            onChange={(e) => {
              this.onChangeCheck(e, "rememberPassWord");
            }}
            checked={this.state.data.rememberPassWord}
          >
            记住密码
          </Checkbox>
        </div>
        <WhiteSpace size="xl" />
        <Button
          type="primary"
          onClick={() => {
            this.login();
          }}
        >
          登录
        </Button>
        <WhiteSpace size="xl" />
        <Button
          type="warning"
          onClick={() => {
            this.props.history.goBack();
          }}
        >
          返回
        </Button>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    // title: state.title,
    // islogin:state.islogin
  };
};
export default connect(mapStateToProps)(LoginTab);
