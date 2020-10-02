import React, { Component } from "react";
import { InputItem } from "antd-mobile";
class User extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <InputItem placeholder="用户">用户</InputItem>
      </div>
    );
  }
}
export default User;
