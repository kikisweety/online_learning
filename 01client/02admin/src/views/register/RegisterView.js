import React from "react";
import "./Register.css";
import { Row, Col, Input, Icon, message, Button } from "antd";
import net from "../../utils/net";
export default class RegisterView extends React.Component {
  constructor() {
    super();
    this.state = {
      password: '',
      checkPassword:''
    }
  }
  toLoginView() {
    this.props.history.push({
      pathname: "/login",
      state: {}
    })
  };
  password(e) {
    let password = e.target.value;
    this.setState({
      password: password
    })
  }
  checkPassword(e) {
    let checkPassword = e.target.value;
    this.setState({
      checkPassword: checkPassword
    })
  }
  toRegister() { 
    let that = this;
    let login_name = this.refs.login_name.state.value;
    let name = this.refs.name.state.value;
    if (login_name == null || login_name.length < 1) {
      message.error("请输入用户名！");
      return;
    };
    if (name == null || name.length < 1) {
      message.error("请输入昵称！");
      return;
    };
    let password = this.state.password;
    let checkPassword = this.state.checkPassword;
    if (password == null || password.length < 1) {
      message.error("请输入密码！");
      return;
    };
    if (password !=checkPassword) {
      message.error("请输入相同的密码");
      return;
    };
    net.post("user/add", {loginName:login_name,name:name,password:password},function (data) {
      let code = data.code;
      if (code === 1) {
        //把用户的数据保存起来
        message.success("注册成功，请前往登录！")
      } else {
        message.error(data.msg);
      }
    })
    
  };
  render() {
    return (
      <div className="view">
        <div className="registerContent">
          <div className="systemTitle">在线教育系统</div>
          <h5 style={{ color: '#2730D3', fontWeight: "bold" }}>注册界面</h5>
          <div className="loginVeiw">
            <div className="content1">
              <Row className="row">
                <Col span={20}>
                  <Input
                    className="input"
                    ref="login_name"
                    placeholder="请输入登录名"
                    style={{width:300}}
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                  />
                </Col>
              </Row>
              <Row className="row">
                <Col span={20}>
                  <Input
                    className="input"
                    ref="name"
                    placeholder="请输入用户名"
                    style={{ width: 300 }}
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                  />
                </Col>
              </Row>
              <Row className="row">
                <Col span={20}>
                  <Input.Password
                    style={{ width: 300 }}
                    placeholder="请设置密码"
                    className="input"
                    onChange={this.password.bind(this)}
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  />
                </Col>
              </Row>
              <Row className="row">
                <Col span={20}>
                  <Input.Password
                    style={{ width: 300 }}
                    placeholder="确认密码"
                    className="input"
                    onChange={this.checkPassword.bind(this)}
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  />
                </Col>
              </Row>
              <Row className="row">
                <Col span={12} className="col">
                  <Button type="primary" style={{ width: 150, marginRight: 2 }}
                    onClick={this.toRegister.bind(this)}>注册</Button>
                </Col>
                <Col span={12} className="col">
                  <Button id="toLogin" onClick={this.toLoginView.bind(this)} style={{ width: 150 }}>去登录<Icon type="double-right" /></Button>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
