import React from "react";
import "./courseRecommend.css";
import { Col, Row, List, Avatar, Card } from 'antd';
import net from "../../../../../utils/net";
const { Meta } = Card;
export default class courseRecommend extends React.Component {
    constructor() {
        super();
        this.state = {
            data: []
        }
    };
    componentDidMount() {
        let that = this;
        net.get("teachers", {}, function (ob) {
            that.setState({
                data: ob.data.object
            });
            console.log(that.state.data);
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
                                <Card>
                                    <Meta
                                        avatar={
                                            <Avatar className="avatar" src={item.tkey} />
                                        }
                                        title={item.name}
                                        description={item.introduce}
                                    />
                                    哈哈哈
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
                    <List
                        className="list"
                        grid={{
                            gutter: 16,
                            column:3
                        }}
                        itemLayout="horizontal"
                        dataSource={this.state.data}
                        renderItem={item => (
                            <List.Item>
                                <Card>
                                    <Meta
                                        avatar={
                                            <Avatar className="avatar" src={item.tkey} />
                                        }
                                        title={item.name}
                                        description={item.introduce}
                                    />
                                </Card>
                            </List.Item>
                        )}
                    />
                </div>

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
                                <Card style={{borderRadius:"5px"}}>
                                    <Meta
                                        avatar={
                                            <Avatar className="avatar" src={item.tkey} />
                                        }
                                        title={item.name}
                                        description={item.introduce}
                                    />
                                </Card>
                            </List.Item>
                        )}
                    />
                </div>
            </div >
        )
    }

}