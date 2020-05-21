/* eslint-disable eqeqeq */
import React from "react";
import { Table, Divider, Button, Select, Icon,Radio,message,Modal,Form,Input,Upload } from "antd";
import "./CourseListCpt.css";
import net from "../../utils/net";
import { Link } from "react-router-dom";
const { confirm } = Modal;
const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}
export default class MyUserAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      imageUrl: '',
      name: '',
      introduce: '',
      type: '',
      fileList: [],
      currentCourse: [],
      columns :[
        {
          title: "课程编号",
          dataIndex: "id",
          key: "id"
        },
        {
          title: "课程状态",
          dataIndex: "state",
          key: "state",
          render: text => {
            if (text == 0) {
              return "未发布";
            } else if (text == 1) {
              return "更新中";
            } else if (text == 2) {
              return "已发布";
            }
          }
        },
        {
          title: "名称",
          dataIndex: "name",
          key: "name"
        },
        {
          title: "介绍",
          dataIndex: "introduce",
          key: "introduce"
        },
        {
          title: "课程图片",
          dataIndex: "url",
          key: "url",
          render: (url) => {
            return (
              <div>
                <img src={url} style={{ width: 225, height: 125 }}></img>
              </div>
            )
          }
        },
        {
          title: "操作",
          dataIndex: "action",
          key: "action",
          render: (text, record) => {
            return (
              <div>
                <Button
                  style={{ backgroundColor: "#43BB60", color: "white" }}
                  onClick={this.edit.bind(this, record)}
                >
                  修改
              </Button>
                <Divider type="vertical" />
                <Button type="danger" style={{ color: "white" }} onClick={this.delete.bind(this,record)}>删除</Button>
              </div>
            )
          }
        }
      ]
    };
  };
  onChangeName(e) {
    this.setState({
      name: e.target.value
    })
  };
  onChangeIntro(e) {
    this.setState({
      introduce: e.target.value
    })
  };
  onChangeType(e) {
    this.setState({
      type: e.target.value
    })
  };
  beforeUpload(file) {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }

    let fileList = this.state.fileList;

    if (fileList.length >= 1) {
      fileList.splice(0, 1, file);
    } else if (fileList.length == 0) {
      fileList.push(file)
    }
    this.setState({ fileList: fileList });
    return isJpgOrPng && isLt2M;
  };
  handleChangeimg = info => {
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false
        })
      );
    }
  };
  componentDidMount() {
    this.getCourses();
  };
  getCourses() {
    let that = this;
    net.get("courses/all", {}, function (ob) {
      that.setState({
        courses: ob.data.object
      });
    });
  }
  edit(record) {
    console.log(record);
    let name = record.name;
    let introduce = record.introduce;
    let type = record.courseType;
    let imageUrl = record.url;
    this.setState({
      isAdd: false,
      name: name,
      type: type,
      introduce: introduce,
      imageUrl: imageUrl,
      currentCourse: record
    })
    this.refs.addForm.style.display = "block";
    this.refs.opacity.style.display = "block";
  };
  closeForm() {
    this.refs.addForm.style.display = "none";
    this.refs.opacity.style.display = "none";
  };
  update() { 
    let that = this;
    let id = this.state.currentCourse.id;
    let introduce = this.state.introduce;
    let name = this.state.name;
    let type = this.state.type;
    let fileList = this.state.fileList;
    net.uploadFile("courses/update", { id: id, introduce: introduce, name: name, files: fileList, courseType: type }, function (ob) {
      if (ob.code == 1) {
        message.success(ob.msg);
        that.getCourses();
        that.refs.addForm.style.display = "none";
        that.refs.opacity.style.display = "none";
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
            console.log(res);

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
  // 已发布个数
  releasedNum() {
    var releasedNum = 0;
    var courses = this.state.courses;
    for (let i = 0; i < courses.length; i++) {
      if (courses[i].state == 2) {
        releasedNum++;
      }
    }
    return releasedNum;
  }
  // 更新中个数
  updatingNum() {
    var updatingNum = 0;
    var courses = this.state.courses;
    for (let i = 0; i < courses.length; i++) {
      if (courses[i].state == 1) {
        updatingNum++;
      }
    }
    return updatingNum;
  }
  // 未发布个数
  unreleasedNum() {
    var unreleasedNum = 0;
    var courses = this.state.courses;
    for (let i = 0; i < courses.length; i++) {
      if (courses[i].state == 0) {
        unreleasedNum++;
      }
    }
    return unreleasedNum;
  }
  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? "loading" : "plus"} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { imageUrl } = this.state;
    return (
      <div>
        <div className="textMul">
          <span>
            课程：
            <strong className="mulNum">{this.state.courses.length}</strong>个
          </span>
          <span>
            已发布：
            <strong className="mulNum">{this.releasedNum()}</strong>个
          </span>
          <span>
            更新中：
            <strong className="mulNum">{this.updatingNum()}</strong>个
          </span>
          <span>
            未发布：
            <strong className="mulNum">{this.unreleasedNum()}</strong>个
          </span>
        </div>

        <Table
          rowKey={record => record.id}
          dataSource={this.state.courses}
          columns={this.state.columns}
          style={{
            width: "100%",
            margin: "0 auto",
            position: "relative"
          }}
          pagination={{ pageSize: 5 }}
        />
        <div className="opacity" ref="opacity"></div>
        <div className="addForm teacherForm" ref="addForm">
          <div className="addTeacherTitle">课程添加</div>
          <Form
            name="nest-messages"
            {...layout}
            style={{ marginTop: '10px' }}
          >
            <Form.Item name='name' label="课程名称" rules={[{ required: true }]}>
              <Input ref="name" value={this.state.name} onChange={this.onChangeName.bind(this)} />
            </Form.Item>
            <Form.Item name='introduce' label="课程介绍" >
              <Input ref="introduce" value={this.state.introduce} onChange={this.onChangeIntro.bind(this)} />
            </Form.Item>
            <Form.Item name="radio-button" label="课程类型">
              <Radio.Group buttonStyle="solid" value={this.state.type} onChange={this.onChangeType.bind(this)}>
                <Radio.Button value={1}>编程语言</Radio.Button>
                <Radio.Button value={2}>前端开发</Radio.Button>
                <Radio.Button value={3}>后端开发</Radio.Button>
                <Radio.Button value={4}>移动开发</Radio.Button>
                <Radio.Button value={5}>网络安全</Radio.Button>
              </Radio.Group>
            </Form.Item>
            <Form.Item name="url" label="课程图片">
              <Upload
                ref="uploadImg"
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={this.beforeUpload.bind(this)}
                onChange={this.handleChangeimg}
              >
                {imageUrl ? (
                  <img src={imageUrl} alt="avatar" style={{ width: 70 }} />
                ) : (
                    uploadButton
                  )}
              </Upload>
            </Form.Item>
            <Form.Item wrapperCol={{ span: 24, offset: 6 }}>
              <Button onClick={this.update.bind(this)}>提交更改</Button>
              <Button type="primary" onClick={this.closeForm.bind(this)}>
                取消
                            </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}
