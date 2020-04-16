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
                    title: '商品名称',
                    dataIndex: 'commodity_name',
                    key: 'commodity_name',
                    render: text => <a>{text}</a>,
                },
                {
                    title: '商品图片',
                    dataIndex: 'url',
                    key: 'url'
                },
                {
                    title: '价格',
                    dataIndex: 'commodity_price',
                    key: 'commodity_price'
                },
                {
                    title: '库存',
                    dataIndex: 'amount',
                    key: 'amount'
                },
                {
                    title: '商品详情',
                    dataIndex: 'commodity_detail',
                    key: 'commodity_detail'
                }
            ],
            allUser: [
                {
                    id: 1,
                    commodity_name: '【配套视频】python基础教程零基础学Python3.5',
                    url: '/noi/image/2020-04-03-python详情.png',
                    commodity_price: 66.8,
                    amount: 20,
                    commodity_detail: '/noi/image/2020-04-03-python商品.png'
                },
                {
                    id: 2,
                    commodity_name: 'PHP项目开发实战入门（全彩版）',
                    url: '/noi/image/2020-04-03-php详情.png',
                    commodity_price: 54.4,
                    amount: 10,
                    commodity_detail: '/noi/image/2020-04-03-php商品.png'
                },
                {
                    id: 3,
                    commodity_name: '【套装2本】java编程思想 第4版+数据结构与算法分析：Java语言描述 原书第3版 thinking in java计算机程序设计从入门到精通书籍',
                    url: '/noi/image/2020-04-03-php详情.png',
                    commodity_price: 54.4,
                    amount: 10,
                    commodity_detail: '/noi/image/2020-04-03-php商品.png'
                },
                {
                    id: 4,
                    commodity_name: '【清华】C语言从入门到精通 (第4版) c语言程序设计电脑编程入门零基础自学c ++primer plus计算机软件程序员开发教程教材书籍2019',
                    url: '/noi/image/2020-04-03-php详情.png',
                    commodity_price: 54.4,
                    amount: 10,
                    commodity_detail: '/noi/image/2020-04-03-php商品.png'
                },
                {
                    id: 5,
                    commodity_name: 'C++ Primer中文版 第5版 C++编程从入门到精通C++11标准 C++经典教程语言程序设计软件计算机开发书籍c primer plus',
                    url: '/noi/image/2020-04-03-php详情.png',
                    commodity_price: 54.4,
                    amount: 10,
                    commodity_detail: '/noi/image/2020-04-03-php商品.png'
                },
                {
                    id: 6,
                    commodity_name: 'JavaScript高级程序设计(第3版)JS入门到精通书籍JavaScript权威指南配套前端开发工程师书web开发HTML网站JavaScript实战工具书',
                    url: '/noi/image/2020-04-03-php详情.png',
                    commodity_price: 54.4,
                    amount: 10,
                    commodity_detail: '/noi/image/2020-04-03-php商品.png'
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
