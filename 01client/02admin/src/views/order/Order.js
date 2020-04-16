import React from "react";
import "./Order.css";
import {
    Button, Table, Upload, Input, Select
} from "antd";
const { Option } = Select;
const { TextArea } = Input;
export default class Order extends React.Component {
    constructor() {
        super();
        this.state = {
            columns: [
                {
                    title: '商品名称',
                    dataIndex: 'commodity_name',
                    key: 'commodity_name',
                    render: text => <a>{text}</a>,
                },
                {
                    title: '商品价格',
                    dataIndex: 'commodity_price',
                    key: 'commodity_price'
                },
                {
                    title: '购买人',
                    dataIndex: 'buy_user',
                    key: 'buy_user'
                },
                {
                    title: '购买日期',
                    dataIndex: 'bug_data',
                    key: 'bug_data'
                },
                {
                    title: '数量',
                    dataIndex: 'amount',
                    key: 'amount'
                },
                {
                    title: '总价',
                    dataIndex: 'total_price',
                    key: 'total_price'
                },
            ],
            allUser: [
                {
                    id: 1,
                    commodity_name: '【配套视频】python基础教程零基础学Python3.5',
                    commodity_price: 66.8,
                    buy_user: '杨欢',
                    bug_data: '2020.4月5日',
                    amount: 1,
                    total_price:66.8,
                },
                {
                    id: 2,
                    commodity_name: '【配套视频】python基础教程零基础学Python3.5',
                    commodity_price: 66.8,
                    buy_user: '田震琪',
                    bug_data: '2020.4月10日',
                    amount: 2,
                    total_price: 133.6,
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
                        <span>订单信息</span>
                        <Button
                            type="primary"
                            style={{ background: "#43BB60" }}
                        // onClick={this.displayAddForm.bind(this)}
                        >添加订单</Button>
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
                    <div className="addTeacherTitle">订单添加</div>
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
