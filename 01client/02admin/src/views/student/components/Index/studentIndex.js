import React from "react";
import "./studentIndex.css";
import CourseRecommend from "./courseRecommend/courseRecommend"
import { Carousel, Menu, Dropdown, Button, Drawer } from 'antd';
const menu1 = (
    <Menu className="dropdownBox">
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer">
                Python
            </a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer">
                PHP
      </a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer">
                Java
      </a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer">
                C
            </a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer">
                C++
            </a>
        </Menu.Item>
    </Menu>
);
const menu2 = (
    <Menu className="dropdownBox menu2">
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer">
                语言基础
            </a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer">
                前端框架
            </a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer">
                开发实践
            </a>
        </Menu.Item>

    </Menu>
);
const menu3 = (
    <Menu className="dropdownBox menu3">
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer">
                Java Web
            </a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer">
                Python
            </a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer">
                PHP Web
            </a>
        </Menu.Item>
    </Menu>
);
const menu4 = (
    <Menu className="dropdownBox menu4">
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer">
                微信开发
            </a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer">
                IOS
            </a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer">
                Android
            </a>
        </Menu.Item>

    </Menu>
);
const menu5 = (
    <Menu className="dropdownBox menu5">
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer">
                信息安全
            </a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer">
                测试运维
            </a>
        </Menu.Item>
    </Menu>
);
export default class MyIndex extends React.Component {
    constructor() {
        super();
        this.state = {
            visible: false
        }
    }

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };
    render() {
        return (
            <div className="indexBox">
                {/* 轮播图 */}
                <Carousel autoplay>
                    <div className="banner1">
                        <div className="bannerContain">
                            <img src="/imgs/banner4.jpg"></img>
                        </div>
                    </div>
                    <div className="banner2">
                        <div className="bannerContain">
                            <img src="/imgs/banner5.jpg"></img>
                        </div>
                    </div>
                    <div className="banner3">
                        <div className="bannerContain">
                            <img src="/imgs/banner6.jpg"></img>
                        </div>
                    </div>
                </Carousel>
                {/* 课程类型选择 */}
                <div className="rightList">
                    <ul className="typeBox">
                        <li>
                            <Dropdown overlay={menu1} placement="bottomCenter">
                                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                    编程语言
                                </a>
                            </Dropdown>
                        </li>
                        <li>
                            <Dropdown overlay={menu2} placement="bottomCenter">
                                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                    前端开发
                                </a>
                            </Dropdown>
                        </li><li>
                            <Dropdown overlay={menu3} placement="bottomCenter">
                                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                    后端开发
                                </a>
                            </Dropdown>
                        </li><li>
                            <Dropdown overlay={menu4} placement="bottomCenter">
                                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                    移动开发
                                </a>
                            </Dropdown>
                        </li><li>
                            <Dropdown overlay={menu5}>
                                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                    网络安全
                                </a>
                            </Dropdown>
                        </li>
                    </ul>
                </div>
                <CourseRecommend></CourseRecommend>
            </div>
        );
    }
}