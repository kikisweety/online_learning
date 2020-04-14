import React from "react";
import "./Commodity.css";
import {
    Button, Table, Upload, Input, Select
} from "antd";
const { Option } = Select;
const { TextArea } = Input;
export default class Commodity extends React.Component {
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
                },
                {
                    title: '密码',
                    dataIndex: 'password',
                    key: 'password'
                }
            ],
            allUser: [
                {
                    id: 1,
                    name: '杨欢',
                    age: 23,
                    sex: '男',
                    login_name: '杨凡凡',
                    password: '12456789'
                },
                {
                    id: 2,
                    name: '阿田',
                    age: 22,
                    sex: '女',
                    login_name: '阿田sweet',
                    password: '12345879'
                }
            ]
        };
    }
    showAddForm() {
        this.refs.userForm.style.display = "block"
    }
    render() {
        return (
            <div className="addView">
                <div className="addCourseList" ref="box">
                    <div className="opacity" ref="opacity"></div>
                    <div className="addCourseTitle">
                        <span>商品信息</span>
                        <Button
                            type="primary"
                            style={{ background: "#43BB60" }}
                        // onClick={this.displayAddForm.bind(this)}
                        >添加商品</Button>
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
                    <div className="addTeacherTitle">老师添加</div>
                    <div className="flex">
                        <div>姓名：</div>
                        <Input placeholder="请输入姓名" className="input" ref="inputName" />
                    </div>
                    <div className="flex">
                        <div>职称：</div>
                        <Input placeholder="请输入职称" className="input" ref="inputType" />
                    </div>
                    <div className="flex">
                        <div>选择课程：</div>
                        <Select
                            // defaultValue={this.state.courses[0].name}
                            // value={this.state.subject}
                            style={{ width: 120 }}
                            // onChange={this.handleChange.bind(this)}
                            ref="subject"
                        >
                            {/* {this.state.courses.map((item) => {
                return (
                  <Option value={item.name} key={item.id}>{item.name}</Option>
                )
              })} */}
                        </Select>
                    </div>
                    <div className="flex">
                        <div>个人介绍：</div>
                        <TextArea
                            rows={2}
                            ref="inputIntroduce"
                            // value={this.state.introduceText}
                            // onChange={this.handleInfo}
                            style={{ width: '80%', height: '100px' }}
                        />
                    </div>

                    <div className="button">
                        <Button onClick={this.upload}>提交</Button>
                        <Button type="primary"
                            onClick={this.showAddForm.bind(this)}
                        >
                            取消
            </Button>
                    </div>
                </div>
            </div>
        );
    }
}
