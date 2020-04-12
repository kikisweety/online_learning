import React from "react";
import "./dressManage.css";
import { Form, Input, Button, Cascader, Table } from 'antd';
const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
};
const options = [
    {
        value: '重庆市',
        label: '重庆市',
        children: [
            {
                value: '万州区',
                label: '万州区'
            },
            {
                value: '涪陵区',
                label: '涪陵区'
            },
            {
                value: '渝中区',
                label: '渝中区'
            },
            {
                value: '渝北区',
                label: '渝北区'
            },
            {
                value: '大渡口区',
                label: '大渡口区'
            },
            {
                value: '江北区',
                label: '江北区'
            },
            {
                value: '沙坪坝区',
                label: '沙坪坝区'
            },
        ],
    },
    {
        value: '四川省',
        label: '四川省',
        children: [
            {
                value: '成都市',
                label: '成都市',
                children: [
                    {
                        value: '锦江区',
                        label: '锦江区',
                    },
                    {
                        value: '青羊区',
                        label: '青羊区',
                    },
                    {
                        value: '金牛区',
                        label: '金牛区',
                    },
                    {
                        value: '武侯区',
                        label: '武侯区',
                    },
                    {
                        value: '成华区',
                        label: '成华区',
                    },
                    {
                        value: '龙泉驿区',
                        label: '龙泉驿区',
                    },
                ],
            },
        ],
    },
];

function onChange(value) {
    console.log(value);
}
export default class DressManage extends React.Component {
    constructor(props) {
        super(props);
    }
    showForm() {
        // console.log(111);
        this.refs.form.style.display = "block"
    }
    closeForm() { 
        this.refs.form.style.display="none"
    }
    render() {
        const dataSource = [
            {
                key: '1',
                name: '胡彦斌',
                number: 32,
                address: '西湖区湖底公园1号',
            },
            {
                key: '2',
                name: '胡彦祖',
                number: 42,
                address: '西湖区湖底公园1号',
            },
        ];

        const columns = [
            {
                title: '收货人',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '手机号码',
                dataIndex: 'number',
                key: 'number',
            },
            {
                title: '详细地址',
                dataIndex: 'address',
                key: 'address',
            },
            {
                title: '操作',
                key: 'action',
                render: () => {
                    var that = this;
                    return (
                        <div>
                            <Button style={{ marginRight: 10 }} onClick={that.showForm.bind(this)}>修改</Button>
                            <Button>删除</Button>
                        </div>
                    )
                }
            }
        ];
        return (
            <div className="setUpView">
                <div className="basicTitle">地址管理</div>
                <div className="basicBox">
                    <Table dataSource={dataSource} columns={columns} pagination={false} />
                    <Button onClick={this.showForm.bind(this)} style={{margin:'20px'}}>添加</Button>
                    <div className="form" ref="form">
                        <Form
                            name="nest-messages"
                            {...layout}
                            >
                            <Form.Item name='name' label="收货人" rules={[{ required: true }]}>
                                <Input placeholder="真实姓名" />
                            </Form.Item>
                            <Form.Item name='number' label="手机号码" >
                                <Input placeholder="请输入11位数字" />
                            </Form.Item>
                            <Form.Item name="city" label="所在地区">
                                <Cascader options={options} onChange={onChange} placeholder="请选择省/市" />
                            </Form.Item>
                            <Form.Item name="dress" label="详细地址">
                                <Input.TextArea style={{ height: 150 }} placeholder="街道、小区门牌等详细地址" />
                            </Form.Item>
                            <Form.Item wrapperCol={{ span: 24, offset: 6 }}>
                                <Button type="primary" htmlType="submit" style={{ marginRight: 20 }}>
                                    保存
                            </Button>
                                <Button type="primary" onClick={this.closeForm.bind(this)}>
                                    取消
                            </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}