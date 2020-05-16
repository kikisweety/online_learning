import React from "react";
import "./myOrder.css";
import { Table, Button, Modal, message, InputNumber } from 'antd';
import net from "../../../../../../utils/net"
const { confirm } = Modal;
export default class MyOrder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [],
            dataSource: [],
            totalPrice: 0,
            currentData: {},
            number: 0,
            columns: [
                {
                    title: '商品名称',
                    dataIndex: 'commodityName',
                    key: 'commodityName',
                    render: (text) => {
                        return <div style={{ width: "200px" }}>{text}</div>
                    }
                },
                {
                    title: '单价（元）',
                    dataIndex: 'commodityPrice',
                    key: 'commodityPrice',
                },
                {
                    title: '购买数量',
                    dataIndex: 'amount',
                    key: 'amount',
                },
                {
                    title: '总价',
                    dataIndex: 'totalPrice',
                    key: 'totalPrice',
                },
                {
                    title: '操作',
                    key: 'action',
                    render: (text, record) => {
                        return (
                            <div>
                                <Button style={{ background: "#43BB60", color: 'white', marginRight: 10 }} onClick={this.edit.bind(this, record)}>修改</Button>
                                <Button type="danger" style={{ color: 'white' }} onClick={this.delete.bind(this, record)}>删除</Button>
                            </div>
                        )
                    }
                }
            ]
        }
    };
    componentDidMount() {
        this.getOrder();
    };
    onSelectChange = (selectedRowKeys, selectedRows) => {
        this.setState({ selectedRowKeys });
        let totalPrice = 0;
        for (let index = 0; index < selectedRows.length; index++) {
            totalPrice += selectedRows[index].totalPrice;
        }
        this.setState({
            totalPrice: totalPrice
        })
    };
    getOrder() {
        let userList = JSON.parse(window.localStorage.getItem("user"));
        let name = userList.object.name;
        let that = this;
        net.get("order/selectByName", { name: name }, function (params) {
            let orders = params.data.object;
            that.setState({
                dataSource: orders
            })
        })
    };
    onChange(e) {
        this.setState({
            number:e
        })
    }
    edit(record) {
        let that = this;
        let number = record.amount;
        this.setState({
            number: number,
            currentData:record
        })
        this.refs.editForm.style.display = "block";
        this.refs.opacity.style.display = "block";
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
                        message.success("成功删除订单！");
                        that.getOrder();
                    }
                )
            },
            onCancel() { },
            okText: '确定',
            cancelText: '取消'
        })
    };
    update() { 
        let that = this;
        let id = this.state.currentData.id;
        let amount = this.state.number;
        let buyUser = this.state.currentData.buyUser;
        let commodityName = this.state.currentData.commodityName;
        let commodityPrice = this.state.currentData.commodityPrice;
        let totalPrice = this.state.currentData.totalPrice;
        net.uploadFile("/order/update", { id,amount, buyUser, commodityName, commodityPrice, totalPrice }, function (ob) {
            if (ob.msg=="ok") {
                that.getOrder();
                that.refs.editForm.style.display = "none";
                that.refs.opacity.style.display = "none";
                message.success("修改成功，请点击支付！")
            }
        })
    };
    addFormNone() {
        this.refs.editForm.style.display = "none";
        this.refs.opacity.style.display = "none";
    }
    render() {
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        return (
            <div className="setUpView">
                <div className="basicTitle">订单记录</div>
                <div className="basicBox">
                    <Table
                        rowKey={record => record.id}
                        pagination={false}
                        rowSelection={rowSelection}
                        dataSource={this.state.dataSource}
                        columns={this.state.columns}
                    />
                    <div className="paymentBox">
                        <div style={{ marginLeft: 20 }}>合计：{this.state.totalPrice}元</div>
                        <div className="paymentNowBox">
                            <div>支付方式：暂只支持微信支付</div>
                            <Button type="primary" style={{ height: 60, width: 100, marginLeft: 20, backgroundColor: '#FF8000' }}>立即支付</Button>
                        </div>
                    </div>
                </div>
                <div className="opacity" ref="opacity"></div>
                <div className="editForm" ref="editForm">
                    <div className="editTitle">修改订单</div>
                    <div className="flex" style={{
                        marginTop: '20px'
                    }}>
                        <div>购买数量：</div>
                        <InputNumber ref="amount" value={this.state.number} onChange={this.onChange.bind(this)} />
                    </div>
                    <div className="button" style={{
                        marginTop:'20px'
                    }}>
                        <Button onClick={this.update.bind(this)}>提交</Button>
                        <Button type="primary" onClick={this.addFormNone.bind(this)}>
                            取消
            </Button>
                    </div>
                </div>
            </div>
        )
    }
}