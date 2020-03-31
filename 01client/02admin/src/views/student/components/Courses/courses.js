import React, { Component } from "react";
import "./courses.css";
import Footer from "../Footer/footer"
import { Collapse,List,Card } from 'antd';
import net from "../../../../utils/net";
const { Panel } = Collapse;
const { Meta } = Card;
export default class MyCourses extends React.Component {
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
    componentDidMount() { 
        // let that = this;
        // net.get('courses/type', {}, function (ob) {
        //     that.setState({
        //         courses: ob.data.object
        //     })
        //     console.log(that.state.courses);
        // })
    }
    tabChoiced = (id) => {
        let that = this;
        this.setState({
            currentIndex: id,
            currentStyle: true
        });
        // net.get('courses/all', {}, function (ob) {
        //     console.log(ob);
        //     that.setState({
        //         courses: ob.data.object
        //     })
        // })
        net.get('courses/type', { courseType:id },function (ob) {
            console.log(ob);
            that.setState({
                courses: ob.data.object
            })
        })
    };

    callback(key) {
        console.log(key);
    };
    // routerTo(item) {
    //     this.props.history.push({ pathname: `/CoursesDetail/${item.id}`, state: { courses: item } })
    //     // console.log(this.state.data);
    // }
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
                                {/* <Collapse bordered={false} defaultActiveKey={['1']}>
                                    {
                                        coursesList
                                    }
                                </Collapse> */}
                                <List
                                    className="list"
                                    grid={{
                                        gutter: 16,
                                        column: 4
                                    }}
                                    itemLayout="horizontal"
                                    dataSource={this.state.courses}
                                    renderItem={item => (
                                        <List.Item>
                                            <Card
                                                key={item.id}
                                                // onClick={() => this.routerTo(item)}
                                                hoverable
                                                style={{ height: 290, borderRadius: 5 }}
                                                cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                                            >
                                                <Meta
                                                    title={item.name}
                                                    description={item.introduce} />
                                            </Card>
                                        </List.Item>
                                    )}
                                />
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