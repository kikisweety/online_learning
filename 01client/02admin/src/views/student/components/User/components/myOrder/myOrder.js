import React from "react";
import "./myOrder.css";
import { Table, Button } from 'antd';
const dataSource = [
    {
        key: '1',
        commodity_name: '【配套视频】python基础教程零基础学Python3.5',
        commodity_price: 66.8,
        amount: 20,
    },
    {
        key: '2',
        commodity_name: 'PHP项目开发实战入门（全彩版）',
        commodity_price: 54.4,
        amount: 10,
    },
];

const columns = [
    {
        title: '商品名称',
        dataIndex: 'commodity_name',
        key: 'commodity_name',
    },
    {
        title: '单价（元）',
        dataIndex: 'commodity_price',
        key: 'commodity_price',
    },
    {
        title: '当前库存',
        dataIndex: 'amount',
        key: 'amount',
    },
    {
        title: '操作',
        key: 'action',
        render: () => {
            return (
                <div>
                    <Button>修改</Button>
                    <Button>删除</Button>
                </div>
            )
        }
    }
];

export default class MyOrder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: []
        }
    }
    onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };
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
                        pagination={false}
                        rowSelection={rowSelection}
                        dataSource={dataSource} columns={columns}
                    />
                    <div className="paymentBox">
                        <div style={{ marginLeft: 20 }}>合计：121.10元</div>
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