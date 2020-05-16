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
        this.state = {
            userList: [],
            name: '',
            age: 0,
            sex: 'man',
            password:''
        }
    };
    componentDidMount() { 
        let user = JSON.parse(window.localStorage.getItem("user"));
        let userList = user.object;
        let name = user.object.name;
        let age = user.object.age;
        let sex = user.object.sex;
        let password = user.object.password;
        this.setState({
            userList: userList,
            name: name,
            age: age,
            sex:sex,
            password:'xxxxxxx'
        })
        console.log(userList);
        
    };
    onChangeName(e) {
        this.setState({
            name:e.target.value
        })
        console.log(this.refs.name.state.value);
    };
    onChangeAge(value) { 
        this.setState({
            age:value
        })
    };
    onChangeSex(value) { 
        this.setState({
            sex:value
        })
    };
    onChangePassword(e) { 
        this.setState({
            password:e.target.value
        })
    }
    render() {
        return (
            <div className="setUpView" >
                <div className="basicTitle">基本信息</div>
                <div className="basicBox">
                    <Form
                        name="nest-messages"
                        {...layout}
                        style={{ width: '50%' }}>
                        <Form.Item name={['user', 'name']} label="用户名：" rules={[{ required: true }]}>
                            <Input ref="name" value={this.state.name} onChange={this.onChangeName.bind(this)} />
                        </Form.Item>
                        <Form.Item name={['user', 'age']} label="年龄" rules={[{ type: 'number', min: 0, max: 99 }]}>
                            <InputNumber value={this.state.age} onChange={this.onChangeAge.bind(this)}/>
                        </Form.Item>
                        <Form.Item name="radio-button" label="性别">
                            <Radio.Group value={this.state.sex} onChange={this.onChangeSex.bind(this)}>
                                <Radio.Button value="man">男</Radio.Button>
                                <Radio.Button value="woman">女</Radio.Button>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item name="password" label="修改密码">
                            <Input.Password value={this.state.password} onChange={this.onChangePassword.bind(this)}/>
                        </Form.Item>
                        <Form.Item wrapperCol={{ span: 12, offset:10}}>
                            <Button type="primary" htmlType="submit">
                                提交
        </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}