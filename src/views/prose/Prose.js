import React, { Component } from "react";
import { InputItem, Button } from "antd-mobile";
import { connect } from "react-redux";
import { addTitle, addCount } from "../../action/index";
import Axios from "../../network/requests";
class Prose extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div
        className={
          this.props.location.pathname === "/index/prose"
            ? "animate__animated animate__fadeIn "
            : ""
        }
      >
        <Button>精选</Button>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {};
};
export default connect(mapStateToProps)(Prose);
