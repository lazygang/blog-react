import React, { Component } from "react";
import { InputItem, Button, NavBar, Icon } from "antd-mobile";
import { connect } from "react-redux";
import { addTitle, addCount } from "../../action/index";
import Axios from "../../network/requests";
import "./plaza.less";
import AddContent from "./child/AddContent";
import Content from "./child/Content";
class Plaza extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: false,
      visable: false,
    };
  }
  toggleEditor = () => {
    this.setState({
      visable: !this.state.visable,
    });
  };
  contentRef = (ref) => {
    this.contentRef = ref;
  };
  reFresh = () => {
    console.log(this.refs);
    this.contentRef.onRefresh();
  };
  componentDidMount() {}
  render() {
    return (
      <div
        className={
          this.props.location.pathname === "/index/plaza"
            ? "animate__animated animate__fadeIn "
            : ""
        }
      >
        <div
        // style={{position:'fixed',top:'0',left:'0'}}
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
                  <use
                    xlinkHref={
                      this.props.user ? this.props.user.head : "#iconqie-01"
                    }
                  ></use>
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
        </div>
        <div>
          <AddContent
            reFresh={this.reFresh}
            visable={this.state.visable}
            toggleEditor={this.toggleEditor}
            history={this.props.history}
          ></AddContent>

          <div
            style={{
              position: "fixed",
              bottom: "9rem",
              right: "2.5rem",
              borderRadius: "3rem",
              padding: "0.8rem",
              backgroundColor: "#FFBB03",
              display: "inline-block",
              zIndex: "19",
              boxShadow: "#625C74 0 0 0.5rem",
            }}
            onClick={() => {
              this.toggleEditor();
            }}
          >
            {" "}
            <svg
              class="icon"
              aria-hidden="true"
              style={{ width: "1.7rem", height: "1.7rem" }}
            >
              <use xlinkHref={"#iconchuangzuo"}></use>
            </svg>
          </div>
          <Content contentRef={this.contentRef} ></Content>
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
export default connect(mapStateToProps)(Plaza);
