import React from "react";
import "./Order.css";
import {
    Button, Table, Upload, Input, Select, Modal, message
} from "antd";
import net from "../../utils/net";
const { confirm } = Modal;
export default class Order extends React.Component {
    constructor() {
        super();
        this.state = {
            columns: [
                {
                    title: '商品名称',
                    dataIndex: 'commodityName',
                    key: 'commodityName',
                    render: text => <a>{text}</a>,
                },
                {
                    title: '商品价格',
                    dataIndex: 'commodityPrice',
                    key: 'commodityprice'
                },
                {
                    title: '购买人',
                    dataIndex: 'buyUser',
                    key: 'buyUser'
                },
                {
                    title: '购买日期',
                    dataIndex: 'buyDate',
                    key: 'buyDate'
                },
                {
                    title: '数量',
                    dataIndex: 'amount',
                    key: 'amount'
                },
                {
                    title: '总价',
                    dataIndex: 'totalPrice',
                    key: 'totalPrice'
                },
                {
                    title: '操作',
                    key: 'action',
                    render: (text, record) => {
                        var that = this;
                        return (
                            <div>
                                <Button type="danger" style={{ color: 'white' }} onClick={this.delete.bind(this, record)}>删除</Button>
                            </div>
                        )
                    }
                }
            ],
            searchName: '',
            allOrder: []
        };
    }
    showAddForm() {
        this.refs.userForm.style.display = "block"
    }
    componentDidMount() {
        this.getOrder();
    };
    getOrder() {
        let that = this;
        net.get("order/all", {}, function (ob) {
            let allOrder = ob.data.object;
            that.setState({
                allOrder: allOrder
            })

        })
    };
    changeSearch(e) {
        this.setState({
            searchName: e.target.value
        })
    };
    onSearch() {
        let that = this;
        let name = this.state.searchName;
        net.post("/order/selectByName", { name }, function (ob) {
            that.setState({
                allOrder: ob.object
            })
        })
    };
    onReset() {
        this.setState({
            searchName: ''
        })
        this.getOrder();
    };
    delete(record) {
        let that = this;
        let id = record.id;
        confirm({
            title: '提示',
            content: '确定删除吗？',
            onOk() {
                return net.get(
                    "order/delete", { id: id },
                    function (res) {
                        message.success("删除订单成功！");
                        that.getOrder();
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
                        <span>订单信息</span>
                    </div>
                    <div className="BankSeletBox" style={{ margin: '10px', padding: '0px' }}>
                        <div className="left-Select">
                            <div style={{ fontSize: '14px' }}>订单查询</div>
                            <Input
                                placeholder="请输入订购人"
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
                        dataSource={this.state.allOrder}
                        style={{ width: "100%", height: 500, margin: "10px auto" }}
                        pagination={{ pageSize: 8 }}
                        scroll={{ y: 500 }}
                    ></Table>
                </div>
            </div>
        );
    }
}
