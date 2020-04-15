import React from "react";
import "./courseRecommend.css";
import { Col, Row, List, Avatar, Card } from 'antd';
import net from "../../../../../utils/net";
const { Meta } = Card;
export default class courseRecommend extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            coursesList: [],
            booksList: [],
            newBooks: []
        }
    };
    componentDidMount() {
        let that = this;
        net.get("teachers", {}, function (ob) {
            that.setState({
                data: ob.data.object
            });
            let list = [];
            that.state.data.map((item) => {
                if (item.id <= 11) {
                    list.push(item);
                }
            });
            that.setState({
                data: list
            })
        });
        net.get('courses/type', { courseType: 1 }, function (ob) {
            that.setState({
                coursesList: ob.data.object
            })
        });
        net.get('commodity/All', {}, function (ob) {
            that.setState({
                booksList: ob.data.object
            })
            let list = [];
            that.state.booksList.map((item) => {
                if (item.id <= 4) {
                    list.push(item);
                }
            });
            // console.log(list);
            that.setState({
                newBooks: list
            })
        });
    };
    render() {
        return (
            < div className="recommendBox">
                <div className="selectTeacher">
                    <div className="selectJingpin">
                        <h2>优质讲师</h2>
                        <p>特别甄选优质讲师</p>
                    </div>
                    <List
                        className="list"
                        grid={{
                            gutter: 16,
                            column: 3
                        }}
                        itemLayout="horizontal"
                        dataSource={this.state.data}
                        renderItem={item => (
                            <List.Item>
                                <Card
                                    hoverable
                                    style={{ height: 150, borderRadius: 5 }}
                                >
                                    <Meta
                                        avatar={
                                            <Avatar className="avatar" src={item.tkey} />
                                        }
                                        title={item.name}
                                        description={item.introduce}
                                    />
                                    {item.tType}
                                </Card>
                            </List.Item>
                        )}
                    />
                </div>

                <div className="selectTeacher">
                    <div className="selectJingpin">
                        <h2>精选好课</h2>
                        <p>名师由浅入深带你夯实学习</p>
                    </div>
                    <div >
                        <List
                            className="list"
                            grid={{
                                gutter: 16,
                                column: 4
                            }}
                            itemLayout="horizontal"
                            dataSource={this.state.coursesList}
                            renderItem={item => (
                                <List.Item>
                                    <Card
                                        hoverable
                                        style={{ height: 270, borderRadius: 5 }}
                                        cover={<img alt="example" src={item.url} />}
                                    >
                                        <Meta
                                            title={item.name}
                                            description={item.introduce} />
                                    </Card>
                                </List.Item>
                            )}
                        />
                    </div>
                </div>

                <div className="selectTeacher">
                    <div className="selectJingpin">
                        <h2>好书推荐</h2>
                        <p>搭配课程学习效果更佳</p>
                    </div>
                    <List
                        className="list"
                        grid={{
                            gutter: 16,
                            column: 4
                        }}
                        itemLayout="horizontal"
                        dataSource={this.state.newBooks}
                        renderItem={item => (
                            <List.Item style={{ border: 'red' }}>
                                <Card
                                    key={item.id}
                                    hoverable
                                    style={{ borderRadius: 5, color: '#f60', fontSize: 16 }}
                                    // cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                                    cover={<img alt="example" src={item.url} />}
                                >
                                    <Meta
                                        title={item.commodityName}
                                        style={{ marginBottom: 10 }}
                                    ></Meta>
                                                        ￥{item.commodityPrice}元
                                                    </Card>
                            </List.Item>
                        )}
                    />
                </div>
            </div >
        )
    }

}