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
      <div     className={
        this.props.location.pathname === "/index/prose"
          ? "animate__animated animate__fadeIn "
          : ""
      }>
        <InputItem clear placeholder="广场">
          广场
        </InputItem>
        <p> {this.props.title.title}</p>
        <Button
        >
          test
        </Button>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    title: state.title,
  };
};
export default connect(mapStateToProps)(Prose);
