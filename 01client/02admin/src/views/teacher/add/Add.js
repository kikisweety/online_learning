import React from "react";
import "./Add.css";
import {
  Upload,
  Input,
  Icon,
  Button,
  message,
  Table,
  Radio,
  Select,
  Modal
} from "antd";
import net from "../../../utils/net";
import reqwest from "reqwest";
const { confirm } = Modal;
const { Option } = Select;
const { TextArea } = Input;
const fakeDataUrl =
  "https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo";
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}
export default class Add extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      hasMore: true,
      fileList: [],
      loading: false,
      subject: "",
      introduceText: "",
      teacherData: [],
      courses: [],
      isLoading: false,
      currentData: {},
      currentFile: {},
      isAdd:true,
      name: '',
      type: '',
      searchName:'',
      columns: [
        {
          title: "姓名",
          dataIndex: "name",
          key: "name"
        },
        {
          title: "照片",
          dataIndex: "tkey",
          key: "tkey",
          render: (tkey) => {
            return (
              <img src={tkey} style={{ width: 50, height: 50 }} />
            );
          }
        },
        {
          title: "介绍",
          dataIndex: "introduce",
          key: "introduce"
        },
        {
          title: "职称",
          dataIndex: "tType",
          key: "tType",
        },
        {
          title: '操作',
          key: 'action',
          render: (text, record) => {
            return (
              <div>
                <Button style={{ marginRight: 10, background: "#43BB60", color: 'white' }} onClick={this.edit.bind(this, record)}>修改</Button>
                <Button type="danger" style={{ color: 'white' }} onClick={this.delete.bind(this, record)}>删除</Button>
              </div>
            )
          }
        }
      ]
    };
  }

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
  }
  handleChange(value) {
    this.setState({ subject: value });
  }
  displayAddForm() {
    this.setState({
      isAdd: true,
        name: '',
        introduceText: '',
        type: '',
        imageUrl: ''
    })
    this.refs.addform.style.display = "block";
    this.refs.opacity.style.display = "block";
  }
  addFormNone() {
    this.refs.addform.style.display = "none";
    this.refs.opacity.style.display = "none";
  }
  upload = e => {
    this.setState({
      isLoading: true
    })
    //获得姓名
    let name = this.refs.inputName.state.value; //姓名
    let t_type = this.refs.inputType.state.value; //性别
    let subject = this.state.subject; //科目
    let introduce = this.refs.inputIntroduce.props.value; //介绍
    let fileList = this.state.fileList;
    let that = this;
    net.uploadFile(
      "teacherAdd",
      { name: name, introduce: introduce, files: fileList, tType: t_type },
      function (ob) {
        if (ob.code == -1) {
          message.warning("上传失败");
        } else {
          message.success("上传成功");
          that.refs.addform.style.display = "none";
          that.refs.opacity.style.display = "none";
          that.getTeachers();
        }
      }
    );
  };
  componentDidMount() {
    let that = this;
    this.getTeachers();
    this.fetchData(res => {
      this.setState({
        data: res.results
      });
    });
    net.get("courses/and/chapters", {}, function (params) {
      that.setState({
        courses: params.data.object
      })
    })
  };
  getTeachers() {
    let that = this;
    net.get("teachers", {}, function (ob) {
      let teacherdata = ob.data.object;
      that.setState({ teacherData: teacherdata });
    });
  };
  fetchData = callback => {
    reqwest({
      url: fakeDataUrl,
      type: "json",
      method: "get",
      contentType: "application/json",
      success: res => {
        callback(res);
      }
    });
  };

  handleInfiniteOnLoad = () => {
    let { data } = this.state;
    this.setState({
      loading: true
    });
    if (data.length > 14) {
      message.warning("Infinite List loaded all");
      this.setState({
        hasMore: false,
        loading: false
      });
      return;
    }
    this.fetchData(res => {
      data = data.concat(res.results);
      this.setState({
        data,
        loading: false
      });
    });
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
  edit(record) {
    
    let name = record.name;
    let type = record.tType;
    let introduceText = record.introduce;
    let imageUrl = record.tkey;
    this.setState({
      isAdd:false,
      name: name,
      type: type,
      introduceText: introduceText,
      imageUrl:imageUrl,
      currentData: record,
    })
    this.refs.addform.style.display = "block";
    this.refs.opacity.style.display = "block"
  };
  changeName(e) {
    this.setState({
      name: e.target.value
    })
  };
  changeType(e) {
    this.setState({
      type: e.target.value
    })
  };
  changeSearch(e) {
    this.setState({
      searchName: e.target.value
    })
   };
  handleInfo = e => {
    this.setState({
      introduceText: e.target.value
    });
  };
  onSearch() {
    let that = this;
    let name = this.state.searchName;
    console.log(name);
    
    // net.post("question/chapterid", { chapterId: this.state.chapterId }, function (params) {
    //   that.setState({
    //     allQuestions: params.object
    //   })
    // })
  };
  onReset() {
    this.getTeachers();
  };
  update() { 
    let that = this;
    let id = this.state.currentData.id;
    let introduce = this.state.introduceText;
    let name = this.state.name;
    let type = this.state.type;
    let fileList = this.state.fileList;
    net.uploadFile("techerUpdate", { id: id, introduce: introduce, name: name, tType: type, files: fileList }, function (ob) {
      if (ob.code==1) {
        message.success('修改老师信息成功！');
        that.getTeachers();
        that.refs.addform.style.display = "none";
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
          "delTeacher", { id: id },
          function (res) {
            message.success("成功删除订单！")
            that.getTeachers();
          }
        )
      },
      onCancel() { },
      okText: '确定',
      cancelText: '取消'
    })
    net.get("teachers", {}, function (ob) {
      let teacherdata = ob.data.object;
      that.setState({ teacherData: teacherdata });
    });
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
      <div className="addView">
        <div className="addCourseList" ref="box">
          <div className="opacity" ref="opacity"></div>
          <div className="addCourseTitle teacherView">
            <span>老师管理</span>
            <Button
              type="primary"
              style={{ background: "#43BB60" }}
              onClick={this.displayAddForm.bind(this)}
            >添加老师</Button>
          </div>
          <div className="BankSeletBox" style={{margin:'10px',padding:'0px'}}>
            <div className="left-Select">
              <div style={{fontSize:'14px'}}>老师查询</div>
              <input
                value={this.state.searchName} onChange={this.changeSearch.bind(this)}
                style={{ width: '70%', marginRight: '5px' }} size="large"></input>
            </div>
            <Button
              value="small"
              type="primary"
              onClick={this.onSearch.bind(this)}
              style={{ background: "#43BB60", margin: "0px 8px 0px 0px" }}
            >
              搜索
          </Button>
            <Button
              value="small"
              type="primary"
              // onClick={this.onReset.bind(this)}
              style={{ background: "#43BB60", margin: "0px 8px 0px 0px" }}
            >
              重置
          </Button>
          </div>
          <Table
            rowKey={record => record.id}
            isLoading={this.state.isLoading}
            columns={this.state.columns}
            dataSource={this.state.teacherData}
            pagination={{
              pageSize: 6
            }}
            scroll={{ y: 580 }}
            className="table"
          />
        </div>
        {/* 老师添加 ******************************/}
        <div className="addForm" ref="addform">
          {this.state.isAdd === true ? (<div className="addTeacherTitle">老师添加</div>) : (<div className="addTeacherTitle">老师修改</div>) }
          <div className="flex">
            <div>姓名：</div>
            <Input value={this.state.name} onChange={this.changeName.bind(this)} placeholder="请输入姓名" className="input" ref="inputName" />
          </div>
          <div className="flex">
            <div>职称：</div>
            <Input value={this.state.type} onChange={this.changeType.bind(this)} placeholder="请输入职称" className="input" ref="inputType" />
          </div>
          <div className="flex">
            <div>选择课程：</div>
            <Select
              value={this.state.subject}
              style={{ width: 120 }}
              onChange={this.handleChange.bind(this)}
              ref="subject"
            >
              {this.state.courses.map((item) => {
                return (
                  <Option value={item.name} key={item.id}>{item.name}</Option>
                )
              })}
            </Select>
          </div>
          <div className="flex">
            <div>个人介绍：</div>
            <TextArea
              rows={2}
              ref="inputIntroduce"
              value={this.state.introduceText}
              onChange={this.handleInfo}
              style={{ width: '80%', height: '100px' }}
            />
          </div>
          <div className="flex">
            <div style={{ width: 50 }}>照片:</div>
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
          </div>

          <div className="button">
            {this.state.isAdd === true ? (<Button onClick={this.upload.bind(this)}>提交</Button>) : (<Button onClick={this.update.bind(this)}>保存</Button>)}
            <Button type="primary" onClick={this.addFormNone.bind(this)}>
              取消
            </Button>
          </div>
        </div>
      </div>
    );
  }
}




