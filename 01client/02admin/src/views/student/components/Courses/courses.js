import React, { Component } from "react";
import "./courses.css";
import Footer from "../Footer/footer"
import { Tabs, Collapse} from 'antd';
const { Panel } = Collapse;
export default class MyCourses extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabs: [
                {
                    id: 1,
                    tabName: '编程语言',
                },
                {
                    id: 2,
                    tabName: '前端开发'
                },
                {
                    id: 3,
                    tabName: '后端开发'
                },
                {
                    id: 4,
                    tabName: '移动开发'
                },
                {
                    id: 5,
                    tabName: '网络安全'
                }
            ],
            currentIndex: 1,
            // currentStyle: false
            courses: [
                {
                    id: 1,
                    name: 'C++',
                    introduce: '面向对象的编程语言',
                    url: '',
                    children: [
                        {
                            chapterId: 13,
                            name: '基础课程',
                            course_id:1
                        }, {
                            chapterId: 14,
                            name: '控制语句',
                            course_id: 1
                        }, {
                            chapterId: 15,
                            name: '函数',
                            course_id: 1
                        }
                    ]
                },
                {
                    id: 2,
                    name: '数据结构',
                    introduce: '一个面向对象语言',
                    url: ''
                },
                {
                    id: 3,
                    name: 'Java',
                    introduce: '一个面向对象的编程语言',
                    url: ''
                },
                {
                    id: 4,
                    name: 'Python',
                    introduce: 'python是个好课程',
                    url: ''
                }
            ]
        }
    }
    tabChoiced = (id) => {
        this.setState({
            currentIndex: id,
            currentStyle: true
        });
    }
    callback(key) {
        console.log(key);
    };
    render() {
        var _this = this;
        var isBox1Show = this.state.currentIndex == 1 ? 'block' : 'none';
        var isBox2Show = this.state.currentIndex == 2 ? 'block' : 'none';
        var isBox3Show = this.state.currentIndex == 3 ? 'block' : 'none';
        var isBox4Show = this.state.currentIndex == 4 ? 'block' : 'none';
        var isBox5Show = this.state.currentIndex == 5 ? 'block' : 'none';

        var tabList = this.state.tabs.map(function (res, index) {
            // 遍历标签页，如果标签的id等于tabid，那么该标签就加多一个active的className
            var tabStyle = res.id == this.state.currentIndex ? 'subCtrl active' : 'subCtrl';

            return <li key={index} onClick={this.tabChoiced.bind(_this, res.id)} className={tabStyle}>{res.tabName}</li>
        }.bind(_this));
        var coursesList = this.state.courses.map(function (res) {
            return <Panel header={res.name} key={res.id}>{res.introduce}</Panel>
        });
        return (
            <div className="coursesBox" >
                <div className="coursesContainer">
                    <div className="coursesType">
                        <ul className="coursesWrap">
                            {tabList}
                        </ul>
                        <div className="newsList">
                            <div style={{ "display": isBox1Show }} >
                                <Collapse bordered={false} defaultActiveKey={['1']}>
                                    {
                                        coursesList
                                    }
                                </Collapse>
                                </div>
                            <div style={{ "display": isBox2Show }}>
                                体育世界
                                </div>
                            <div style={{ "display": isBox3Show }}>
                                娱乐圈
                                </div>
                            <div style={{ "display": isBox4Show }}>
                                娱乐圈
                                </div>
                            <div style={{ "display": isBox5Show }}>
                                娱乐圈
                                </div>
                        </div>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        );
    }
}