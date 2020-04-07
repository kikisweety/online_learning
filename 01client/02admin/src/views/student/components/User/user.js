import React from "react";
import "./user.css";
import Footer from "../Footer/footer";
import { Route, Switch, Link, Router } from "react-router-dom";
import { Menu } from 'antd';
import UserInfo from "./components/userInfo/userInfo";
import MyOrder from "./components/myOrder/myOrder";
import DressManage from "./components/dressManage/dressManage";
import UserRight from "./components/userRight/userRight"
export default class MyUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false
        }
    }
    to
    render() {
        return (
            <div className="userViewBox">
                <div className="userContainer">
                    <div className="userLeft">
                        <Menu theme="light" mode="inline" defaultSelectedKeys={['1']} style={{ height: '100%' }}>
                            <Menu.Item key="1">
                                <Link to={"/student/userCenter/userInfo"}>
                                    <span>基本信息</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Link to={"/student/userCenter/myOrder"}>
                                    <span>订单记录</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Link to={"/student/userCenter/dressManage"}>
                                    <span>地址管理</span>
                                </Link>
                            </Menu.Item>
                        </Menu>
                    </div>
                    {/* <UserRight></UserRight> */}
                    {/* <div className="userRight"> */}
                    <Switch>
                        <div className="userRight">
                            <Route
                                exact
                                path={"/student/userCenter/userInfo"}
                                component={UserInfo}
                            />
                            <Route
                                exact
                                path={"/student/userCenter/myOrder"}
                                component={MyOrder} />
                            <Route
                                exact
                                path={"/student/userCenter/dressManage"}
                                component={DressManage} />
                        </div>
                    </Switch>
                </div>
                {/* </div> */}
                <Footer></Footer>
            </div>
        )
    }
}