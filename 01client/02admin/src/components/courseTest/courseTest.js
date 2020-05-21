import React from "react";
import "./courseTest.css";
import { Icon, Button, Table, message,Input,Modal} from "antd";
import net from "../../utils/net";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
const {confirm } = Modal;
export default class MyCourseTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allLeaf: [],
      chapterId:'',
      questionData: [],
      chapterName: '',
      currentCourse: [],
      isAdd:true,
      newColumns:[
        { title: '课程名称', dataIndex: 'name', key: 'name' },
        { title: '课程介绍', dataIndex: 'introduce', key: 'introduce' },
        {
          title: '操作',
          dataIndex: 'action',
          render: (text,record) => (
            <span>
              <Button style={{ backgroundColor: "#43BB60", color: "white", marginRight: 10 }} onClick={this.showChaper.bind(this, record)}>添加章节</Button>
            </span>
          )
        }
      ]
    };
   };

  changeQuestionByChapter = value => {
    this.setState({
      chapterId: value
    });
  };
  onChangeChapters(e) {
    this.setState({
      chapterName: e.target.value
    })
  }
  componentDidMount() {
    this.getChapter();
  };
  getChapter() { 
    let that = this;
    net.get("courses/and/chapters", {}, function (ob) {
      that.setState({
        allLeaf: ob.data.object
      });
    });
  };
  showChaper(record) {
    this.refs.addChapters.style.display = "block";
    this.refs.opacity.style.display = "block";
    this.setState({
      chapterName:'',
      currentCourse: record
    })
  };
  closeChaper() {
    this.refs.addChapters.style.display = "none";
    this.refs.opacity.style.display = "none";
  }
  addChaper() {
    let that = this;
    let chapterName = this.state.chapterName;
    let id = this.state.currentCourse.id;
    net.uploadFile("chapter/add", { name: chapterName, courseId: id }, function (ob) {
      if (ob.code == 1) {
        message.success(ob.msg);
        that.refs.addChapters.style.display = "none";
        that.refs.opacity.style.display = "none";
        that.getChapter();
      }
    })
  };
  edit(record) { 
    console.log(record);
    let name = record.name;
    let id = record.id;
    this.setState({
      chapterName: name,
      chapterId:id
    })
    this.refs.addChapters.style.display = "block";
    this.refs.opacity.style.display = "block";
  };
  updata() {
    let that = this;
    let name = this.state.chapterName;
    let chapterId = this.state.chapterId;
    net.uploadFile("", {name:name,chapterId:chapterId},function (ob) {
      if (ob.code==1) {
        message.success(ob.msg);
        that.refs.addChapters.style.display = "none";
        that.refs.opacity.style.display = "none";
        that.getChapter();
      }
    })
   };
  delete(record) { 
    let that = this;
    let id = record.id;
    confirm({
      title: '提示',
      content: '确定删除吗？',
      onOk() {
        return net.get(
          "courses/delete", { id: id },
          function (res) {
            message.success(res.msg);
            that.getCourses();
          }
        )
      },
      onCancel() { },
      okText: '确定',
      cancelText: '取消'
    })
  }
  expandedRowRender = (record) => {
    const columns = [
      { title: "章节名称", dataIndex: "name", key: "name" },
      {
        title: '操作',
        key: 'action',
        render: (record) => (
          <span>
            <Button style={{ backgroundColor: "#43BB60", color: "white", marginRight: 10 }} onClick={this.edit.bind(this,record)}>修改</Button>
            <Button type="danger" style={{ color: "white" }} onClick={this.delete.bind(this,record)}>删除</Button>
          </span>
        ) }
    ];
    return <Table columns={columns}
      dataSource={record.chapters}
      pagination={false} />;
  };
  render() {
    return (
      <div className="courseTestBox">
        <div className="testHeader">
          <span className="testTitle">课程章节</span>
          <div className="btnBox">
            <Link to={`/home/courses/add/created`}
              style={{ color: "white" }}>
              <Button
                style={{
                  backgroundColor: "#278BF5",
                  color: "white",
                  width: 100,
                  fontSize: "12px"
                }}
              >
                <Icon type="plus" />
                <span>创建试卷</span>
              </Button>
            </Link>
          </div>
        </div>
        <Table
          rowKey={record => record.id}
          className="components-table-demo-nested courseTable"
          columns={this.state.newColumns}
          style={{ width: "98.5%",height:500, margin: "0 auto", margin: "10px" }}
          expandedRowRender={this.expandedRowRender}
          dataSource={this.state.allLeaf}
          pagination={{ pageSize: 8 }}
          scroll={{y:500}}
        />
        <div className="opacity" ref="opacity"></div>
        <div className="addChapters" ref="addChapters">
          {
            this.state.isAdd == true ? (<div className="addTeacherTitle">课程章节添加</div>) : (<div className="addTeacherTitle">课程章节修改</div>)
          }
          <div className="flex">
            <div>章节名称：</div>
            <Input value={this.state.chapterName} onChange={this.onChangeChapters.bind(this)} className="input" />
          </div>
          <div className="button">
            {
              this.state.isAdd == true ? (<Button onClick={this.addChaper.bind(this)}>保存</Button>) : (<Button onClick={this.updata.bind(this)}>提交更改</Button>)
            }
            <Button type="primary" onClick={this.closeChaper.bind(this)}>
              取消
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
