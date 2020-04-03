import React from "react";
import "./questions.css";
import Footer from "../Footer/footer"
import { Button, Collapse } from 'antd';
import net from "../../../../utils/net"
const { Panel } = Collapse;
export default class MyQuestions extends React.Component {
    constructor() {
        super();
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
            questions: [],
        }
    }
    tabChoiced = (id) => {
        let that = this;
        this.setState({
            currentIndex: id,
            currentStyle: true
        });
        net.get('courses/questionByType', { courseType: id }, function (ob) {
            // console.log(ob);
            that.setState({
                questions: ob.data.object
            })
        })
    }
    componentDidMount() {
        var that = this;
        net.get('courses/questionByType', { courseType: 1 }, function (ob) {
            // console.log(ob);
            that.setState({
                questions: ob.data.object
            })
        });
    }
    routerTo(v) { 
        this.props.history.push({
            pathname: `/QuestionsDetail/${v.id}`,
            state: {questions:v}
        })
    }
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
        return (
            <div className="questionsBox">
                <div className="questionContainer">
                    <ul className="coursesWrap">
                        {tabList}
                    </ul>
                    <div className="coursesByChapterList">
                        <div style={{ "display": isBox1Show }} >
                            <Collapse accordion bordered={false} style={{ backgroundColor: 'white', fontSize: 16 }}>
                                {this.state.questions.map((item) => {
                                    return <Panel
                                        header={item.name}
                                        key={item.id}
                                    >
                                        {item.chapters.map((v) => {
                                            return <div className="videoBox"
                                                key={v.id}
                                                style={{ display: 'flex', position: 'relative', padding: 20, alignItems: 'center' }}>
                                                <span style={{ width: 5, height: 5, backgroundColor: '#1F9DFF',borderRadius:5,marginRight:20 }}></span>
                                                <span>{v.name}</span>
                                                <Button
                                                    type="primary"
                                                    shape="round"
                                                    onClick={() => this.routerTo(v)}
                                                    style={{ position: 'absolute', right: 0 }}>开始做题</Button>
                                            </div>
                                        })}
                                    </Panel>
                                })
                                }
                            </Collapse>
                        </div>
                        <div style={{ "display": isBox2Show }}>
                            <Collapse accordion bordered={false} style={{ backgroundColor: 'white', fontSize: 16 }}>
                                {this.state.questions.map((item) => {
                                    return <Panel
                                        header={item.name}
                                        key={item.id}
                                    >
                                        {item.chapters.map((v) => {
                                            return <div className="videoBox"
                                                key={v.id}
                                                style={{ display: 'flex', position: 'relative', padding: 20, alignItems: 'center' }}>
                                                <span style={{ width: 5, height: 5, backgroundColor: '#1F9DFF', borderRadius: 5, marginRight: 20 }}></span>
                                                <span>{v.name}</span>
                                                <Button
                                                    type="primary"
                                                    shape="round"
                                                    onClick={() => this.routerTo(v)}
                                                    style={{ position: 'absolute', right: 0 }}>开始做题</Button>
                                            </div>
                                        })}
                                    </Panel>
                                })
                                }
                            </Collapse>
                                </div>
                        <div style={{ "display": isBox3Show }}>
                            <Collapse accordion bordered={false} style={{ backgroundColor: 'white', fontSize: 16 }}>
                                {this.state.questions.map((item) => {
                                    return <Panel
                                        header={item.name}
                                        key={item.id}
                                    >
                                        {item.chapters.map((v) => {
                                            return <div className="videoBox" key={v.id} style={{ display: 'flex', position: 'relative', padding: 20, alignItems: 'center' }}>
                                                <span style={{ width: 5, height: 5, backgroundColor: '#1F9DFF', borderRadius: 5, marginRight: 20 }}></span>
                                                <span>{v.name}</span>
                                                <Button
                                                    type="primary"
                                                    shape="round"
                                                    onClick={() => this.routerTo(v)}
                                                    style={{ position: 'absolute', right: 0 }}>开始做题</Button>
                                            </div>
                                        })}
                                    </Panel>
                                })
                                }
                            </Collapse>
                                </div>
                        <div style={{ "display": isBox4Show }}>
                            <Collapse accordion bordered={false} style={{ backgroundColor: 'white', fontSize: 16 }}>
                                {this.state.questions.map((item) => {
                                    return <Panel
                                        header={item.name}
                                        key={item.id}
                                    >
                                        {item.chapters.map((v) => {
                                            return <div className="videoBox" key={v.id} style={{ display: 'flex', position: 'relative', padding: 20, alignItems: 'center' }}>
                                                <span style={{ width: 5, height: 5, backgroundColor: '#1F9DFF', borderRadius: 5, marginRight: 20 }}></span>
                                                <span>{v.name}</span>
                                                <Button
                                                    type="primary"
                                                    shape="round"
                                                    onClick={() => this.routerTo(v)}
                                                    style={{ position: 'absolute', right: 0 }}>开始做题</Button>
                                            </div>
                                        })}
                                    </Panel>
                                })
                                }
                            </Collapse>
                                </div>
                        <div style={{ "display": isBox5Show }}>
                            <Collapse accordion bordered={false} style={{ backgroundColor: 'white', fontSize: 16 }}>
                                {this.state.questions.map((item) => {
                                    return <Panel
                                        header={item.name}
                                        key={item.id}
                                    >
                                        {item.chapters.map((v) => {
                                            return <div className="videoBox" key={v.id} style={{ display: 'flex', position: 'relative', padding: 20, alignItems: 'center' }}>
                                                <span style={{ width: 5, height: 5, backgroundColor: '#1F9DFF', borderRadius: 5, marginRight: 20 }}></span>
                                                <span>{v.name}</span>
                                                <Button
                                                    type="primary"
                                                    shape="round"
                                                    onClick={() => this.routerTo(v)}
                                                    style={{ position: 'absolute', right: 0 }}>开始做题</Button>
                                            </div>
                                        })}
                                    </Panel>
                                })
                                }
                            </Collapse>
                                </div>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        );
    }
}