import React, { Component } from "react";
import { InputItem } from "antd-mobile";

class Plaza extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <InputItem clear placeholder="广场">
          广场
        </InputItem>
      </div>
    );
  }
}
export default Plaza;
