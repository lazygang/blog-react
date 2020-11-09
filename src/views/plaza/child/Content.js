import React, { Component } from "react";
import ReactDOM from "react-dom";
import {
  InputItem,
  Button,
  NavBar,
  Icon,
  WhiteSpace,
  Card,
  Toast,
  ListView,
  PullToRefresh,
} from "antd-mobile";
import { connect } from "react-redux";
import "./test.css";
import moment from "moment";
import Axios from "../../../network/requests";
import plazaTop from "./img/plazaTop.png";
import BackTop from "./BackTop";
import throttle from "../../../tool/throttle";
import Zmage from "react-zmage";
import { PhotoProvider, PhotoConsumer } from "react-photo-view";
import "react-photo-view/dist/index.css";
//==============================================================
function MyBody(props) {
  return (
    <div className="am-list-body my-body">
      <span style={{ display: "none" }}>you can custom body wrap element</span>
      {props.children}
    </div>
  );
}

//============================================================
class Content extends Component {
  constructor(props) {
    super(props);
    const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
    const getRowData = (dataBlob, sectionID, rowID) => {
      return dataBlob[sectionID][rowID];
    };
    const dataSource = new ListView.DataSource({
      getRowData,
      getSectionHeaderData: getSectionData,
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });

    this.state = {
      dataSource,
      isLoading: false,
      height: (document.documentElement.clientHeight * 3) / 4,
      testData: [],
      rowID: [],
      sectionID: [],
      current: 1,
      pageSize: 20,
      isAll: false,
      refreshing: false,
      backTopIsShow: false,
    };
  }
  backTopShow = (e) => {
    if (e.srcElement.scrollTop > 1500) {
      this.setState({
        backTopIsShow: true,
      });
    } else {
      this.setState({
        backTopIsShow: false,
      });
    }
  };
  // 下拉刷新
  onRefresh = async () => {
    this.setState({ refreshing: true });
    // simulate initial Ajax
    await this.setState(
      {
        testData: [],
        rowID: [],
        sectionID: [],
        current: 1,
        pageSize: 20,
        isAll: false,
      },
      () => {
        this.getContent();
      }
    );
    this.setState({
      refreshing: false,
    });
  };
  getContent = () => {
    if (this.state.isAll) {
      return false;
    }
    if (this.state.isLoading) {
      return false;
    }
    this.setState({
      isLoading: true,
    });
    Axios.post("dailys/getContent", {
      current: this.state.current,
      pageSize: this.state.pageSize,
    }).then(async (res) => {
      if (res && res.data) {
        if (res.data.success) {
          let newRow = [];
          let rowID = this.state.rowID;
          let sectionID = this.state.sectionID;
          sectionID.push(this.state.current - 1);
          for (let index = 0; index < res.data.data.length; index++) {
            newRow.push(index);
          }
          rowID.push(newRow);
          let testData = this.state.testData;
          testData.push(res.data.data);
          console.log(res.data.data);
          if (res.data.data.length != this.state.pageSize) {
            this.setState({
              isAll: true,
            });
          }
          this.setState(
            {
              testData,
              rowID,
              sectionID,
              current: this.state.current + 1,
            },
            () => {
              this.setState(
                {
                  dataSource: this.state.dataSource.cloneWithRowsAndSections(
                    this.state.testData,
                    this.state.sectionID,
                    this.state.rowID
                  ),
                },
                () => {
                  this.setState({
                    isLoading: false,
                  });
                }
              );
            }
          );
        } else {
          Toast.info("获取失败", 2, () => {}, false);
        }
      }
    });
  };

  componentDidMount() {
    this.getContent();
    const hei =
      document.documentElement.clientHeight -
      ReactDOM.findDOMNode(this.lv).parentNode.offsetTop;
    setTimeout(() => {
      this.setState({
        isLoading: false,
        height: hei,
      });
    }, 600);
    this.props.contentRef(this);
  }

  render() {
    const separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
        style={{
          backgroundColor: "#F5F5F9",
          height: 8,
          borderTop: "1px solid #ECECED",
          borderBottom: "1px solid #ECECED",
        }}
      />
    );

    const row = (rowData, sectionID, rowID) => {
      return (
        <div key={rowID} style={{ padding: "0 15px" }}>
          <Card full>
            <Card.Header
              title={
                rowData.user && rowData.user.nickName
                  ? rowData.user.nickName
                  : "用户名未知"
              }
              thumb={
                <svg
                  class="icon"
                  aria-hidden="true"
                  style={{ width: "2rem", height: "2rem" }}
                >
                  <use
                    xlinkHref={
                      rowData.user.head ? rowData.user.head : "#iconqie-01"
                    }
                  ></use>
                </svg>
              }
              // extra={<span>this is extra</span>}
            />
            <Card.Body>
              <div
                style={{
                  padding: "15px",
                  width: "100%",
                  fontSize: "16px",
                  wordBreak: "break-all",
                  wordWrap: "break-word",
                  minHeight: "4rem",
                }}
              >
                <PhotoProvider>
                  {/* <div style={{display:"flex",width:'100%',flexWrap:'wrap',justifyContent:'space-between'}}> */}
                  <div style={{width:'100%',wordBreak:'break-all'}}>
                    {rowData.img && rowData.img.length == 1
                      ? rowData.img.map((item, index) => (
                          <PhotoConsumer key={index} src={item} intro={item}>
                            <img src={item} alt="" className="singleImg"/>
                          </PhotoConsumer>
                        ))
                      : rowData.img.map((item, index) => (
                          <PhotoConsumer key={index} src={item} intro={item} >
                            <img src={item} alt=""  className="listImg" />
                          </PhotoConsumer>
                        ))}
                  </div>
                </PhotoProvider>
                {/* <Zmage
                  src={rowData.img ? rowData.img[0].url : null}
                  set={
                    rowData.img
                      ? [
                          rowData.img.map((item) => {
                            item.url;
                          }),
                        ]
                      : null
                  }
                /> */}
                <div dangerouslySetInnerHTML={{ __html: rowData.html }}></div>
              </div>
            </Card.Body>
            <Card.Footer
              content={<div> {rowData.date}</div>}
              // extra={<div>extra footer content</div>}
            />
          </Card>
        </div>
      );
    };
    return (
      <div>
        <ListView
          ref={(el) => (this.lv = el)}
          dataSource={this.state.dataSource}
          renderHeader={() => (
            <div>
              <img src={plazaTop} style={{ width: "24rem" }}></img>
              <div
                style={{
                  fontSize: "1.7rem",
                  paddingLeft: "2rem",
                  paddingBottom: "1rem",
                  color: "#6399BF",
                }}
              >
                来广场说说话吧{" "}
                <svg
                  class="icon rotateIcon"
                  aria-hidden="true"
                  style={{ width: "2rem", height: "2rem", marginLeft: "3rem" }}
                >
                  <use xlinkHref={"#iconertongshouhui-xingxing"}></use>
                </svg>
              </div>
            </div>
          )}
          renderFooter={() => (
            <div style={{ padding: 30, textAlign: "center" }}>
              {this.state.isLoading ? "Loading..." : null}
              {this.state.isAll ? "没有更多东西了" : null}
            </div>
          )}
          // renderSectionHeader={(sectionData) => <div>test</div>}
          renderBodyComponent={() => <MyBody />}
          renderRow={row}
          renderSeparator={separator}
          style={{
            height: this.state.height,
            overflow: "auto",
          }}
          initialListSize={17}
          pageSize={10}
          onScroll={throttle((e) => {
            this.backTopShow(e);
          }, 500)}
          scrollRenderAheadDistance={500}
          // onEndReached={this.onEndReached}
          onEndReached={() => {
            this.getContent();
          }}
          onEndReachedThreshold={10}
          pullToRefresh={
            <PullToRefresh
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }
        />
        {this.state.backTopIsShow ? (
          <BackTop
            backTop={() => {
              this.lv.scrollTo(0);
            }}
          ></BackTop>
        ) : null}
        <div style={{ height: "4rem" }}></div>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user.user,
  };
};
export default connect(mapStateToProps)(Content);
