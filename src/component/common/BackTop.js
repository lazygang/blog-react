import React, { Component } from "react";
import throttle from '../../tool/throttle'
class BackTop extends Component {
  constructor(props) {
    super(props);
    this.state={
        isShow:false
    }
  }
  componentDidMount(){
    window.onscroll=(e)=>{
        console.log(e);
    }
  }
  render() {
    return (
      <div
        style={{
          position: "fixed",
          bottom: "5.5rem",
          right: "0.2rem",
          // borderRadius: "4rem",
          padding: "0.2rem",
          backgroundColor: "#62D9FB",
          display: "inline-block",
          boxShadow: "#625C74 0 0 1rem",
          // zIndex: "19",
        }}
        onClick={() => {
        //   this.lv.scrollTo(0, 0);
        }}
      >
        {" "}
        <svg
          class="icon"
          aria-hidden="true"
          style={{ width: "1.3rem", height: "1.3rem", color: "white" }}
        >
          <use xlinkHref={"#iconarrow-upward"}></use>
        </svg>
      </div>
    );
  }
}

export default BackTop;
