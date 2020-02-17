import React from "react";
import "./Register.css";
import { Row, Col, Input, Icon, Tooltip, Button } from "antd";
import net from "../../utils/net";
export default class RegisterView extends React.Component {
  constructor() {
    super();
  }
  toLoginView() {
    this.props.history.push({
      pathname: "/login",
      state: {}
    })
  }
  render() {
    return (
      <div className="view">
        <div className="content">
          <p>您好，欢迎来到在线教育系统</p>
          <h4>注册界面</h4>
          <div className="loginVeiw">
            <div className="content1">
              <Row className="row">
                <Col span={20}>
                  <Input
                    className="input"
                    placeholder="请输入您的用户名"
                    style={{width:300}}
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    // suffix={
                    //   <Tooltip title="">
                    //     <Icon
                    //       type="info-circle"
                    //       style={{ color: "rgba(0,0,0,.45)" }}
                    //     />
                    //   </Tooltip>
                    // }
                  />
                </Col>
              </Row>
              <Row className="row">
                <Col span={20}>
                  <Input.Password
                    style={{ width: 300 }}
                    placeholder="请设置密码"
                    className="input"
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  />
                </Col>
              </Row>
              <Row className="row">
                <Col span={12} className="col">
                  <Button type="primary" style={{ width: 150, marginRight: 2 }}>完成注册</Button>
                </Col>
                <Col span={12} className="col">
                  <Button id="toLogin" onClick={this.toLoginView.bind(this)} style={{ width: 150}}>登录页面</Button>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
