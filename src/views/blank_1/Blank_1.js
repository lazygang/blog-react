import React, { Component } from "react";
import { InputItem, Button } from "antd-mobile";
import { connect } from "react-redux";
import { addTitle, addCount } from "../../action/index";
import Axios from "../../network/requests";
class Blank_1 extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div     className={
        this.props.location.pathname === "/index/blank_1"
          ? "animate__animated animate__fadeIn "
          : ""
      }>
        <Button>施工中Blank_1</Button>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    title: state.title,
  };
};
export default connect(mapStateToProps)(Blank_1);
