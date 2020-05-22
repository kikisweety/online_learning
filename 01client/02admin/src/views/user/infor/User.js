import React from "react";
import "./User.css";
import net from "../../../utils/net";
import {
  Button, Table, Select, Popconfirm, Form, Input, InputNumber, Radio, Modal, message
} from "antd";
const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};
const { confirm } = Modal;
export default class User extends React.Component {
  constructor() {
    super();
    this.state = {
      age: null,
      userId: "",
      searchName: '',
      isAdd: true,
      name: '',
      loginName:'',
      age: '',
      sex: '',
      currentUser:[],
      columns: [
        {
          title: '用户名',
          dataIndex: 'name',
          key: 'name',
          editable: true,
          render: text => <a>{text}</a>,
        },
        {
          title: '年龄',
          dataIndex: 'age',
          key: 'age',
          editable: true,
        },
        {
          title: '性别',
          dataIndex: 'sex',
          key: 'sex',
          editable: true,
          render: text => {
            if (text == 'woman') {
              return "女";
            } else if (text == 'man') {
              return "男";
            }
          }
        },
        {
          title: '登录名',
          dataIndex: 'loginName',
          key: 'loginName',
          editable: true,
        },
        {
          title: '操作',
          dataIndex: 'action',
          key: 'action',
          render: (text, record) => {
            var that = this;
            return (
                <div>
                  <Button style={{ marginRight: 10, background: "#43BB60", color: 'white' }} onClick={this.edit.bind(this, record)} >修改</Button>
                  <Button type="danger" style={{ color: 'white' }} onClick={this.delete.bind(this, record.userId)}>删除</Button>
              </div>
            )
          }
        }
      ],
      allUser: []
    };
  };
  changeSearch(e) {
    this.setState({
      searchName: e.target.value
    })
  };
  onSearch() {
    let that = this;
    let name = this.state.searchName;
    net.post("user/selectByName", { name }, function (ob) {
      that.setState({
        allUser: ob.object
      })
    })
  };
  onReset() {
    this.setState({
      searchName: ''
    })
    this.getUser();
  };
  displayAddForm() {
    this.setState({
      isAdd:true,
      name: '',
      age: '',
      sex: '',
      loginName:''
    })
    this.refs.userForm.style.display = "block";
    this.refs.opacity.style.display = "block";
  }
  closeForm() {
    this.refs.userForm.style.display = "none";
    this.refs.opacity.style.display = "none";
  }
  handleAge(e) {
    this.setState({
      age: e
    })
  }
  componentDidMount() {
    this.getUser();
  };
  getUser() { 
    let that = this;
    net.get("user/all", {}, function (ob) {
      let userList = ob.data.object;
      that.setState({
        allUser: userList
      })
    })
  };
  upload() {
    let name = this.refs.inputName.state.value;
    let age = this.state.age;
    let sex = this.refs.sex.state.value;
    let loginName = this.refs.inputLoginName.state.value;
    let that = this;
    net.uploadFile(
      "user/add", { name, age, sex, loginName },
      function (params) {
        if (params.code == -1) {
          alert("上传失败");
        } else {
          alert("上传成功");
          that.refs.userForm.style.display = "none";
        }
      }
    )
  }
  changeName(e) {
    this.setState({
      name: e.target.value
    })
  };
  changeAge(value) {
    this.setState({
      age: value
    })
  };
  changeSex(e) {
    this.setState({
      sex: e.target.value
    })
  }
  edit(record) {
    let name = record.name;
    let age = record.age;
    let sex = record.sex;
    let loginName = record.loginName;
    this.setState({
      isAdd: false,
      name: name,
      age: age,
      sex: sex,
      loginName:loginName,
      currentUser:record
    })
    this.refs.userForm.style.display = "block";
    this.refs.opacity.style.display = "block"
  };
  update() { 
    let that = this;
    let name = this.state.name;
    let age = this.state.age;
    let sex = this.state.sex;
    let userId = this.state.currentUser.userId;
    console.log(name,age,sex,userId);
    net.uploadFile("user/update", {userId,name,age,sex},function (ob) {
      if (ob.code==1) {
        message.success(ob.msg);
        that.refs.userForm.style.display = "none";
        that.refs.opacity.style.display = "none";
        that.getUser();
      }
      
    })
  }
  delete(userId) {
    confirm({
      title: '提示',
      content: '确定删除吗？',
      onOk() {
        return net.get(
          "user/delete", { userId: userId },
          function (res) {
            console.log(res);
          }
        )
      },
      onCancel() { },
      okText: '确定',
      cancelText: '取消'
    })
  }
  render() {
    return (
      <div className="addView">
        <div className="addCourseList" ref="box">
          <div className="opacity" ref="opacity"></div>
          <div className="addCourseTitle">
            <span>用户信息</span>
            <Button
              type="primary"
              style={{ background: "#43BB60" }}
              onClick={this.displayAddForm.bind(this)}
            >添加用户</Button>
          </div>
          <div className="BankSeletBox" style={{ margin: '10px', padding: '0px' }}>
            <div className="left-Select">
              <div style={{ fontSize: '14px' }}>用户查询</div>
              <Input
                placeholder="请输入用户名关键字"
                allowClear
                value={this.state.searchName} onChange={this.changeSearch.bind(this)}
                style={{ width: '70%', marginRight: '5px' }}
              />
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
              onClick={this.onReset.bind(this)}
              style={{ background: "#43BB60", margin: "0px 8px 0px 0px" }}
            >
              重置
          </Button>
          </div>
          <Table
            rowKey={record => record.id}
            columns={this.state.columns}
            dataSource={this.state.allUser}
            style={{ width: "100%", height: 500, margin: "10px auto" }}
            pagination={{ pageSize: 8 }}
            scroll={{ y: 500 }}
          ></Table>
        </div>
        {/* 用户添加 */}
        <div className="addForm" ref="userForm">
          {this.state.isAdd == true ? (<div className="addTeacherTitle">用户添加</div>) : (<div className="addTeacherTitle">用户修改</div>)}
          <Form
            name="nest-messages"
            {...layout}
            style={{ width: '100%', marginTop: 20 }}>
            <Form.Item name={['user', 'name']} label="姓名：" rules={[{ required: true }]}>
              <Input value={this.state.name} onChange={this.changeName.bind(this)} placeholder="请输入姓名"  ref="inputName" />
            </Form.Item>
            <Form.Item name={['user', 'age']} label="年龄" rules={[{ type: 'number', min: 0, max: 99 }]}>
              <InputNumber value={this.state.age} onChange={this.changeAge.bind(this)} onChange={this.handleAge.bind(this)} />
            </Form.Item>
            <Form.Item name="radio-button" label="性别">
              <Radio.Group buttonStyle="solid" ref="sex" value={this.state.sex} onChange={this.changeSex.bind(this)}>
                <Radio.Button value="man">男</Radio.Button>
                <Radio.Button value="woman">女</Radio.Button>
              </Radio.Group>
            </Form.Item>
            <Form.Item name={['user', 'loginName']} label="昵称：">
              <Input value={this.state.loginName} placeholder="请输入昵称" ref="inputLoginName" />
            </Form.Item>
            <Form.Item name="button" className="formButton">
              {this.state.isAdd == true ? (<Button onClick={this.upload.bind(this)} type="primary" style={{ marginRight: 20 }}>保存</Button>) : (<Button onClick={this.update.bind(this)} type="primary" style={{ marginRight: 20 }}>提交修改</Button>)}
              <Button type="primary"
                onClick={this.closeForm.bind(this)}
              >
                取消
            </Button>
            </Form.Item>
          </Form>
          <div className="button">
          </div>
        </div>
      </div>
    );
  }
}
