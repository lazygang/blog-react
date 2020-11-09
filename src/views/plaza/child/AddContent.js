import React, { Component } from "react";
import {
  InputItem,
  Button,
  NavBar,
  Icon,
  WhiteSpace,
  Toast,
  Modal,
  ImagePicker,
} from "antd-mobile";
import { connect } from "react-redux";
import Axios from "../../../network/requests";
import "braft-editor/dist/index.css";
import BraftEditor from "braft-editor";
import "./test.css";
import moment from "moment";

// 定义输入转换函数
const unitImportFn = (unit, type, source) => {
  let sizeBase = window.innerWidth / 24;
  // type为单位类型，例如font-size等
  // source为输入来源，可能值为create或paste
  console.log(type, source);

  // 此函数的返回结果，需要过滤掉单位，只返回数值
  if (unit.indexOf("rem")) {
    return parseFloat(unit, 10) * sizeBase;
  } else {
    return parseFloat(unit, 10);
  }
};
// 定义输出转换函数
const unitExportFn = (unit, type, target) => {
  // let sizeBase = 15.625;
  let sizeBase = window.innerWidth / 24;
  if (type === "line-height") {
    // 输出行高时不添加单位
    return unit;
  }
  // target的值可能是html或者editor，对应输出到html和在编辑器中显示这两个场景
  if (target === "html") {
    // 只在将内容输出为html时才进行转换
    return unit / sizeBase + "rem";
  } else {
    // 在编辑器中显示时，按px单位展示
    return unit + "px";
  }
};
class AddContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visable: false,
      editorState: BraftEditor.createEditorState({
        blocks: [
          {
            key: "5f8qd",
            text: "  记录生活点滴",
            type: "unstyled",
            depth: 0,
            inlineStyleRanges: [{ offset: 0, length: 8, style: "FONTSIZE-30" }],
            entityRanges: [],
            data: {},
          },
        ],
        entityMap: {},
      }),
      content: null,
      data: {},
      img: [],
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
  // 添加图片
  addImg = (files, type, index) => {
    console.log(files, type, index);
    this.setState({
      img: files,
    });
  };
  handleChange = (editorState) => {
    this.setState({ editorState }, () => {
      this.editorInstance.draftInstance.focus();
    });
  };
  sendContent = () => {
    if (!(this.props.user)) {
      Toast.info("请登录您的账号", 2, () => {}, false)
      return false
    }
    let editor = this.editorInstance.getValue();
    let content = editor.toHTML();
    let html = editor.toHTML();
    let raw = editor.toRAW();
    // console.log(raw);
    let date = new Date();
    date = moment(date).format("YYYY-MM-DD HH:mm:ss");
    let data = {
      html,
      raw,
      date,
      user: this.props.user ? this.props.user : null,
      img: this.state.img,
    };
    // console.log(this.state.img);
    Toast.loading("发布中", 5, () => {}, true);
    Axios.post("dailys/add", data).then((res) => {
      Toast.hide();
      if (res && res.data) {
        if (res.data.success) {
          Toast.info("发布成功", 2, () => {}, false);
          this.props.reFresh();
          this.props.toggleEditor();
        } else {
          Toast.info("发布失败", 2, () => {}, false);
        }
      }
    });
    // this.setState({
    //   content,
    // });
  };
  componentDidMount() {}

  render() {
    return (
      <div
        style={
          this.props.visable
            ? {
                position: "absolute",
                zIndex: "101",
                width: "24rem",
                height: "100vh",
                backgroundColor: "white",
                zIndex: "20",
              }
            : {
                position: "absolute",
                width: "24rem",
                height: "100vh",
                backgroundColor: "white",
                zIndex: "20",
                display: "none",
              }
        }
        className={
          this.props.visable
            ? "animate__animated animate__fadeIn "
            : "animate__animated animate__fadeOut"
        }
      >
        <div
          style={{
            // width: "100%",
            // overflow: "hidden",
            backgroundColor: "#F5F5F9",
          }}
        >
          <BraftEditor
            ref={(instance) => (this.editorInstance = instance)}
            converts={{ unitImportFn, unitExportFn }}
            value={this.state.editorState}
            onChange={this.handleChange}
            excludeControls={["media"]}
          />
        </div>
        <hr></hr>
        {/* <WhiteSpace size="xl" /> */}
        <div style={{position:"fixed",zIndex:'999',width:'24rem',bottom:"4rem", boxShadow:'0 0 0 0 green, 0 -0.05rem 0.5rem 0rem , 0 0 0 0 red, 0 0 0 0 yellow',}}>
          <div
            style={{
              backgroundColor: "white",
            }}
          >
            <div>
              <p style={{ fontSize: "1rem", textAlign: "center" }}>添加图片</p>
              <ImagePicker
                style={{
                  backgroundColor: "white",
                }}
                files={this.state.img}
                onChange={this.addImg}
                onImageClick={(index, fs) => console.log(index, fs)}
                selectable={this.state.img.length < 50}
                multiple={true}
              />
            </div>
          </div>

          {/* <WhiteSpace size="xl" /> */}
          <div
            style={{
              backgroundColor: "white",
            }}
          >
            {" "}
            <Button
              type="primary"
              onClick={(e) => {
                this.editorInstance.draftInstance.blur();
                // this.refs.blur.focus()
                this.props.history.push("/index/plaza");

                e.stopPropagation();
                e.preventDefault();
                this.sendContent();
              }}
            >
              确认发布
            </Button>
            <WhiteSpace size="xl" style={{ backgroundColor: "#F5F5F9" }} />
            <Button
              type="warning"
              onClick={(e) => {
                this.props.history.push("/index/plaza");
                // this.editorInstance.draftInstance.focus();
                this.editorInstance.draftInstance.blur();

                e.stopPropagation();
                e.preventDefault();
                this.props.toggleEditor();
              }}
            >
              取消
            </Button>
          </div>
        </div>

        <div
          // dangerouslySetInnerHTML={{ __html: this.state.content }}
          style={{
            padding: "15px",
            width: "100%",
            fontSize: "16px",
            wordBreak: "break-all",
            wordWrap: "break-word",
          }}
          className="content"
        ></div>
        <div style={{ height: "4rem", backgroundColor: "#F5F5F9" }}></div>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user.user,
  };
};
export default connect(mapStateToProps)(AddContent);
