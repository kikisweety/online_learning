import React from "react";
import "./myOrder.css";
import { Table, Button } from 'antd';
const dataSource = [
    {
        key: '1',
        commodity_name: '胡彦斌',
        commodity_price: 32,
        amount: '西湖区湖底公园1号',
    },
    {
        key: '2',
        commodity_name: '胡彦祖',
        commodity_price: 42,
        amount: '西湖区湖底公园1号',
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
                <Button>删除</Button>
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
                        dataSource={dataSource} columns={columns} />
                    <div className="paymentBox">
                        <div style={{marginLeft:20}}>合计：500.00元</div>
                        <div className="paymentNowBox">
                            <div>支付方式：暂只支持微信支付</div>
                            <Button type="primary" style={{ height: 60, width: 100, marginLeft: 20, backgroundColor:'#FF8000'}}>立即支付</Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}