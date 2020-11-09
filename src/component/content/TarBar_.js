import React, { Component } from "react";
import { TabBar } from "antd-mobile";
import './TarBar_.less'

class TarBar_ extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div
        style={{
          position: "fixed",
          width: "24rem",
          bottom: 0,
          boxShadow:'0 0 0 0 green, 0 -0.05rem 0.5rem 0rem , 0 0 0 0 red, 0 0 0 0 yellow',
          zIndex:'100'
        }}
      >
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#16C2C2"
          barTintColor="white"
        //   hidden={this.state.hidden}
        >
          <TabBar.Item
            icon={
              <svg class="icon" aria-hidden="true" className="icon">
                <use xlinkHref="#iconzhuye"></use>
              </svg>
            }
            selectedIcon={
              <svg
                class="icon"
                aria-hidden="true"
                className={
                  this.props.location.pathname === "/index/blank_1"
                    ? "animate__animated animate__bounce icon"
                    : "icon"
                }
              >
                <use xlinkHref="#iconzhuye"></use>
              </svg>
            }
            title="施工中_1"
            key="blank_1"
            selected={this.props.location.pathname === "/index/blank_1"}
            onPress={() => {
              this.props.history.push("/index/blank_1");
            }}
          ></TabBar.Item>
          <TabBar.Item
            icon={
              <svg class="icon" aria-hidden="true" className="icon">
                <use xlinkHref="#iconguanzhu"></use>
              </svg>
            }
            selectedIcon={
              <svg
                class="icon"
                aria-hidden="true"
                className={
                  this.props.location.pathname === "/index/blank_2"
                    ? "animate__animated animate__bounce icon"
                    : "icon"
                }
              >
                <use xlinkHref="#iconguanzhu"></use>
              </svg>
            }
            title="施工中_2"
            key="blank_2"
            selected={this.props.location.pathname === "/index/blank_2"}
            onPress={() => {
              this.props.history.push("/index/blank_2");
            }}
          >
          </TabBar.Item>
          <TabBar.Item
            icon={
              <svg class="icon" aria-hidden="true" className="icon">
                <use xlinkHref="#iconxingqiu"></use>
              </svg>
            }
            selectedIcon={
              <svg
                class="icon"
                aria-hidden="true"
                className={
                  this.props.location.pathname === "/index/plaza"
                    ? "animate__animated animate__bounce icon"
                    : "icon"
                }
              >
                <use xlinkHref="#iconxingqiu"></use>
              </svg>
            }
            title="广场"
            key="plaza"
            selected={this.props.location.pathname === "/index/plaza"}
            onPress={() => {
              this.props.history.push("/index/plaza");
            }}
          ></TabBar.Item>
          <TabBar.Item
            icon={
              <svg class="icon" aria-hidden="true" className="icon">
                <use xlinkHref="#iconxunzhang"></use>
              </svg>
            }
            selectedIcon={
              <svg
                class="icon"
                aria-hidden="true"
                className={
                  this.props.location.pathname === "/index/prose"
                    ? "animate__animated animate__bounce icon"
                    : "icon"
                }
              >
                <use xlinkHref="#iconxunzhang"></use>
              </svg>
            }
            title="精选"
            key="prose"
            selected={this.props.location.pathname === "/index/prose"}
            onPress={() => {
              this.props.history.push("/index/prose");
            }}
          ></TabBar.Item>
          <TabBar.Item
            icon={
              <svg class="icon" aria-hidden="true" className="icon">
                <use xlinkHref="#iconwode"></use>
              </svg>
            }
            selectedIcon={
              <svg
                class="icon"
                aria-hidden="true"
                className={
                  this.props.location.pathname === "/index/user"
                    ? "animate__animated animate__bounce icon"
                    : "icon"
                }
              >
                <use xlinkHref="#iconwode"></use>
              </svg>
            }
            title="我的"
            key="user"
            selected={this.props.location.pathname === "/index/user"}
            onPress={() => {
              this.props.history.push("/index/user");
            }}
          ></TabBar.Item>
        </TabBar>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    title: state.title,
  };
};
export default TarBar_;
