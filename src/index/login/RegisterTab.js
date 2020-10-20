import React, { Component } from "react";
import { WhiteSpace, List, InputItem, Toast, Button } from "antd-mobile";
import { checkName_api, checkNickName_api } from "../../network/login";
import deBounce from "../../tool/deBounce";
import { register_api, login_api } from "../../network/login";
class LoginTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        name: null,
        nickName: null,
        passWord: null,
        checkPassWord: null,
      },
      checkKey: {
        name: false,
        nickName: false,
        passWord: false,
        checkPassWord: false,
      },
    };
  }
  //=============================输入框验证接口==================
  checkName = deBounce((params) => {
    checkName_api(params).then((res) => {
      console.log(res);
      if (res && res.data) {
        if (res.data.data) {
          let checkKey = this.state.checkKey;
          checkKey.name = true;
          this.setState({
            checkKey,
          });
        }
      }
    });
  }, 1000);
  checkNickName = deBounce((params) => {
    checkNickName_api(params).then((res) => {
      console.log(res);
      if (res && res.data) {
        if (res.data.data) {
          let checkKey = this.state.checkKey;
          checkKey.nickName = true;
          this.setState({
            checkKey,
          });
        }
      }
    });
  }, 1000);
  passWord = deBounce((e) => {
    if (e.length < 6) {
      let checkKey = this.state.checkKey;
      checkKey.passWord = true;
      this.setState({
        checkKey,
      });
      return false;
    }
    if (this.state.data.checkPassWord) {
      if (this.state.data.passWord != this.state.data.checkPassWord) {
        let checkKey = this.state.checkKey;
        checkKey.checkPassWord = true;
        this.setState({
          checkKey,
        });
      } else {
        let checkKey = this.state.checkKey;
        checkKey.checkPassWord = false;
        this.setState({
          checkKey,
        });
      }
    }
  }, 1000);
  checkPassWord = deBounce(() => {
    if (this.state.data.passWord != this.state.data.checkPassWord) {
      let checkKey = this.state.checkKey;
      checkKey.checkPassWord = true;
      this.setState({
        checkKey,
      });
    }
  }, 1000);
  onErrorClick = (key) => {
    switch (key) {
      case "name":
        Toast.info("用户名已存在", 3, () => {}, false);
        break;
      case "nickName":
        Toast.info("昵称已存在", 3, () => {}, false);
        break;
      case "passWord":
        Toast.info("请输入六位以上的密码", 3, () => {}, false);
        break;
      case "checkPassWord":
        Toast.info("确认密码不一致", 3, () => {}, false);
        break;
      default:
        break;
    }
  };
  //===============================================
  // 输入框绑定
  onChangeInput = (e, key) => {
    let data = this.state.data;
    data[key] = e;
    this.setState({
      data,
    });
    let checkKey = this.state.checkKey;
    switch (key) {
      case "name":
        checkKey.name = false;
        this.setState({
          checkKey,
        });
        if (e) {
          this.checkName({ name: e });
        }
        break;
      case "nickName":
        checkKey = this.state.checkKey;
        checkKey.nickName = false;
        this.setState({
          checkKey,
        });
        if (e) {
          this.checkNickName({ nickName: e });
        }
        break;
      case "passWord":
        checkKey = this.state.checkKey;
        checkKey.passWord = false;
        this.setState({
          checkKey,
        });
        if (e) {
          this.passWord(e);
        }
        break;
      case "checkPassWord":
        checkKey = this.state.checkKey;
        checkKey.checkPassWord = false;
        this.setState({
          checkKey,
        });
        if (e) {
          this.checkPassWord();
        }
        break;

      default:
        break;
    }
  };
  // 注册
  register = () => {
    Toast.loading("注册中", 5, () => {}, true);
    setTimeout(() => {
      if (
        !this.state.data.name ||
        !this.state.data.nickName ||
        !this.state.data.passWord ||
        !this.state.data.checkPassWord
      ) {
        Toast.info("请输入完整信息", 3, () => {}, false);
        return false;
      }
      if (
        this.state.checkKey.name ||
        this.state.checkKey.nickName ||
        this.state.checkKey.passWord ||
        this.state.checkKey.checkPassWord
      ) {
        Toast.info("请确认登录信息", 3, () => {}, false);
        return false;
      }
      register_api(this.state.data).then((res) => {
        Toast.hide();
        if (res.data.success) {
          setTimeout(() => {
            Toast.info("登录中", 3, () => {}, true);
            login_api(res.data.data).then((res) => {
              Toast.hide();
              if (res && res.data) {
                if (res.data.success) {
                  window.localStorage.setItem("isLogin", "true");
                  window.localStorage.setItem(
                    "userData",
                    JSON.stringify(res.data.data)
                  );
                  this.props.history.push("/index/plaza");
                  Toast.info("登录成功", 3, () => {}, false);
                } else {
                  Toast.info(res.data.msg, 3, () => {}, false);
                }
              }
            });
          }, 1000);
        }
      });
    }, 1000);
  };
  componentDidMount() {}
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
                <use xlinkHref="#iconzhu-01"></use>
              </svg>
              <div style={{ fontSize: "2rem" }}>注册</div>
            </div>
          )}
        >
          <InputItem
            clear={true}
            placeholder="请输入用户名"
            autoAdjustHeight={true}
            error={this.state.checkKey.name}
            onErrorClick={() => {
              this.onErrorClick("name");
            }}
            onChange={(e) => {
              this.onChangeInput(e, "name");
            }}
            //   value={this.state.value}
          >
            用户名
          </InputItem>
          <WhiteSpace size="xl" />
          <InputItem
            autoAdjustHeight={true}
            clear={true}
            placeholder="请输入昵称"
            error={this.state.checkKey.nickName}
            onErrorClick={() => {
              this.onErrorClick("nickName");
            }}
            onChange={(e) => {
              this.onChangeInput(e, "nickName");
            }}
            //   value={this.state.value}
          >
            昵称
          </InputItem>
          <WhiteSpace size="xl" />
          <InputItem
            type="password"
            clear={true}
            placeholder="密码"
            autoAdjustHeight={true}
            error={this.state.checkKey.passWord}
            onErrorClick={() => {
              this.onErrorClick("passWord");
            }}
            onChange={(e) => {
              this.onChangeInput(e, "passWord");
            }}
            //   value={this.state.value}
          >
            密码
          </InputItem>
          <WhiteSpace size="xl" />
          <InputItem
            type="password"
            clear={true}
            placeholder="确认密码"
            autoAdjustHeight={true}
            error={this.state.checkKey.checkPassWord}
            onErrorClick={() => {
              this.onErrorClick("checkPassWord");
            }}
            onChange={(e) => {
              this.onChangeInput(e, "checkPassWord");
            }}
            //   value={this.state.value}
          >
            确认密码
          </InputItem>
        </List>
        <WhiteSpace size="xl" />
        <div></div>
        <WhiteSpace size="xl" />
        <Button
          type="primary"
          onClick={() => {
            this.register();
          }}
        >
          注册
        </Button>
      </div>
    );
  }
}
export default LoginTab;
