import React from "react";
import "./questions.css";
import Footer from "../Footer/footer"
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
            courses: [],
        }
    }
    tabChoiced = (id) => {
        let that = this;
        this.setState({
            currentIndex: id,
            currentStyle: true
        });
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
                    <div className="newsList">
                        <div style={{ "display": isBox1Show }} >
                            哈斯试试
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
                <Footer></Footer>
            </div>
        );
    }
}