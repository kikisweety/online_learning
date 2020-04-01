import React from "react";
import "./StudentView.css";
import { Layout, Menu, Icon } from 'antd';
import { Link } from "react-router-dom";
import Content from "../components/Content/content"
const { Header, Footer } = Layout;
export default class StudentView extends React.Component {
    constructor(props) {
        super(props)
        this.state = { SelectedKeys: "1" }
    }
    componentWillMount() {
        if (this.props.history.location.pathname == "/student/index") {
            this.setState({ SelectedKeys: "1" })
        } else if (this.props.history.location.pathname == "/student/courses") {
            this.setState({ SelectedKeys: "2" })
        } else if (this.props.history.location.pathname == "/student/questions") {
            this.setState({ SelectedKeys: "3" })
        } else if (this.props.history.location.pathname == "/student/books") {
            this.setState({ SelectedKeys: "4" })
        }
        // console.log(this.state)
    }
    render() {
        return (
            <div className="studentBox">
                <Layout className="layout">
                    {/* 导航栏 */}
                    <Header style={{ width: '100%', height: '80px', backgroundColor: 'white' }}>
                        <div className="headerContainer">
                            <div className="logoBox" >
                                <img src="/imgs/logo.png"></img>
                                <span className="logoTitle">在线课堂</span>
                            </div>
                            <Menu
                                // theme="dark"
                                mode="horizontal"
                                defaultSelectedKeys={[this.state.SelectedKeys]}
                                style={{ lineHeight: '80px', fontSize: '18px', borderBottom: '2px solid white' }}
                            >
                                <Menu.Item key="1">
                                    <Link to={"/student/index"}>
                                        <span>首页</span>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="2">
                                    <Link to={"/student/courses"}>
                                        <span>课堂</span>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="3">
                                    <Link to={"/student/questions"}>
                                        <span>题库</span>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="4">
                                    <Link to={"/student/books"}>
                                        <span>商城</span>
                                    </Link></Menu.Item>
                            </Menu>
                            <div className="userBox">
                                <img src="/imgs/user.png"></img>
                                <span className="userInfo">个人中心</span>
                            </div>
                        </div>
                    </Header>
                    <Content></Content>
                </Layout>
            </div>
        );
    }
}