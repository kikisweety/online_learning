import React from 'react'
import "./userInfo.css";
import { Form, Input, Button, Checkbox, InputNumber, Radio } from 'antd';
const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
};


export default class UserInfo extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="setUpView" >
                <div className="basicTitle">基本信息</div>
                <div className="basicBox">
                    {/* <div>姓名：</div>
                    <Input placeholder="请输入姓名"></Input> */}
                    <Form
                        name="nest-messages"
                        {...layout}
                        style={{ width: '50%' }}>
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
                        <Form.Item name="password" label="修改密码">
                            <Input.Password />
                        </Form.Item>
                        <Form.Item wrapperCol={{ span: 12, offset:10}}>
                            <Button type="primary" htmlType="submit">
                                提交更改
        </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}