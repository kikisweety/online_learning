import React from "react";
import "./myOrder.css";
import { Table, Button, Modal, message } from 'antd';
import net from "../../../../../../utils/net"
const { confirm } = Modal;
export default class MyOrder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [],
            dataSource: [],
            totalPrice: 0,
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
                                <Button style={{ background: "#43BB60", color: 'white', marginRight: 10 }}>修改</Button>
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
            </div>
        )
    }
}