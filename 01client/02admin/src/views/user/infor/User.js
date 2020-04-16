import React from "react";
import "./User.css";
import {
  Button, Table, Select, Form, Input, InputNumber, Radio
} from "antd";
const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};
export default class User extends React.Component {
  constructor() {
    super();
    this.state = {
      columns: [
        {
          title: '姓名',
          dataIndex: 'name',
          key: 'name',
          render: text => <a>{text}</a>,
        },
        {
          title: '年龄',
          dataIndex: 'age',
          key: 'age'
        },
        {
          title: '性别',
          dataIndex: 'sex',
          key: 'sex'
        },
        {
          title: '昵称',
          dataIndex: 'login_name',
          key: 'login_name'
        }
      ],
      allUser: [
        {
          id: 1,
          name: '杨欢',
          age: 23,
          sex: '男',
          login_name: '杨欢',
        },
        {
          id: 2,
          name: '田震琪',
          age: 22,
          sex: '女',
          login_name: 'kikisweety',
        }
      ]
    };
  }
  displayAddForm() {
    this.refs.userForm.style.display = "block"
  }
  closeForm() {
    this.refs.userForm.style.display = "none"
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
          <Table
            // rowSelection={rowSelection}
            columns={this.state.columns}
            dataSource={this.state.allUser}
            style={{ width: "100%", height: 500, margin: "10px auto" }}
            pagination={{ pageSize: 8 }}
            scroll={{ y: 500 }}
          ></Table>
        </div>
        {/* 用户添加 */}
        <div className="addForm" ref="userForm">
          <div className="addTeacherTitle">用户添加</div>
          <Form
            name="nest-messages"
            {...layout}
            style={{ width: '100%', marginTop: 20 }}>
            <Form.Item name={['user', 'name']} label="姓名：" rules={[{ required: true }]}>
              <Input placeholder="请输入姓名" />
            </Form.Item>
            <Form.Item name={['user', 'age']} label="年龄" rules={[{ type: 'number', min: 0, max: 99 }]}>
              <InputNumber />
            </Form.Item>
            <Form.Item name="radio-button" label="性别">
              <Radio.Group>
                <Radio.Button value="man">男</Radio.Button>
                <Radio.Button value="woman">女</Radio.Button>
              </Radio.Group>
            </Form.Item>
            <Form.Item name={['user', 'loginName']} label="昵称：">
              <Input placeholder="请输入昵称" />
            </Form.Item>
            <Form.Item name="button" className="formButton">
              <Button onClick={this.upload} type="primary" style={{marginRight:20}}>提交</Button>
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
