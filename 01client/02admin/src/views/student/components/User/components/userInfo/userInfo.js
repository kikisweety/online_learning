import React from 'react'
import "./userInfo.css";
import { Form, Input, Button, Checkbox, InputNumber, Radio } from 'antd';
import net from '../../../../../../utils/net';
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
            password: ''
        };
    };
    componentDidMount() { 
        var user = JSON.parse(window.localStorage.getItem("user"));
        let userList = user.object;
        let name = user.object.name;
        let age = user.object.age;
        let sex = user.object.sex;
        this.setState({
            userList: userList,
            name: name,
            age: age,
            sex:sex,
            password:'xxxxxxx'
        })
    };
    onChangeName(e) {
        this.setState({
            name:e.target.value
        })
    };
    onChangeAge(value) { 
        this.setState({
            age:value
        })
    };
    onChangePassword(e) { 
        this.setState({
            password:e.target.value
        })
    };
    update() { 
        let that = this;
        let user = JSON.parse(window.localStorage.getItem("user"));
        let userList = user.object;
        console.log(userList);
        let userId = userList.userId;
        let name = this.state.name;
        let age = this.state.age;
        let sex = this.refs.sex.state.value;
        let password = this.state.password;
        console.log(userId,name,age,sex,password);
        net.uploadFile("user/update", {  userId, name, age, sex, password }, function (ob) {
            console.log(ob);
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
                            <Radio.Group defaultValue={this.state.sex} ref="sex">
                                <Radio.Button value="man">男</Radio.Button>
                                <Radio.Button value="woman">女</Radio.Button>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item name="password" label="修改密码">
                            <Input.Password value={this.state.password} onChange={this.onChangePassword.bind(this)}/>
                        </Form.Item>
                        <Form.Item wrapperCol={{ span: 12, offset:10}}>
                            <Button type="primary" htmlType="submit" onClick={this.update.bind(this)}>
                                提交
        </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}