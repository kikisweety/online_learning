import React from "react";
import "./Login.css";
import { Row, Col, Input, Button, message ,Icon} from "antd";
import net from "../../utils/net";
export default class LoginView extends React.Component {
  constructor() {
    super();
    this.state = {
      inputPasswd: ""
    };
  }

  toRegisterView() {
    this.props.history.push({ pathname: "/register", state: {} });
  }

  checkUser() {
    let that = this;
    //1,获得用户提交的数据
    let userName = this.refs.inputUser.state.value;

    //2,如果用户名是空，就提醒用户输入数据
    if (userName == null || userName.length < 1) {
      message.error("请输入用户名！");
      return;
    }
    //3,获得密码
    let inputPasswd = this.state.inputPasswd;
    if (inputPasswd == null || inputPasswd.length < 1) {
      message.error("请输入密码！");
      return;
    }
    //2，提交数据到后台服务器
    net.post("adminCheck", { name: userName, passwd: inputPasswd }, function (
      data
    ) {
      console.log(data);
      let code = data.code;
      //3，根据后台服务器返回的数据进行相关的操作
      if (code === 1) {
        //把用户的数据保存起来
        localStorage.setItem("user", data.user);
        that.props.history.push({ pathname: "/home/courses/add", state: {} });
      } else {
        message.error(data.msg);
      }
    });
  }

  passwdChange(e) {
    //获得密码框里面的数据
    let passwd = e.target.value;
    //保存当前的密码到state
    this.setState({
      inputPasswd: passwd
    });
  }

  render() {
    return (
      <div className="view">
        <div className="content">
          <p>您好，欢迎来到在线教育系统</p>
          <h4>登录界面</h4>
          <div className="loginVeiw">
            <div className="content1">
              <Row className="row">
                {/* <Col span={4}>用户名</Col> */}
                <Col span={20}>
                  <Input
                    id="input"
                    ref="inputUser"
                    style={{ width: 300}}
                    placeholder="输入用户名"
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  />
                </Col>
              </Row>
              <Row className="row">
                {/* <Col span={4}>密码</Col> */}
                <Col span={20}>
                  <Input.Password
                    id="input"
                    onChange={this.passwdChange.bind(this)}
                    ref="inputPasswd"
                    placeholder="输入密码"
                    style={{ width: 300 }}
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  />
                </Col>
              </Row>
              <Row className="row">
                <Col span={12} className="col">
                  <Button type="primary" onClick={this.checkUser.bind(this)} style={{width:150,marginRight:2}}>
                    登录
                  </Button>
                </Col>
                <Col span={12} className="col">
                  <Button id="test" onClick={this.toRegisterView.bind(this)} style={{ width: 150 }}>注册</Button>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
