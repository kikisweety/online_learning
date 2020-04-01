import React, { Component } from 'react';
import "./coursesDetail.css"
import { Button, Collapse } from 'antd';
import net from "../../../../../utils/net"
const { Panel } = Collapse;
const text = (
    <p style={{ paddingLeft: 24 }}>
        A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found
        as a welcome guest in many households across the world.
    </p>
);
class CoursesDetail extends Component { 
    constructor(props, context) { 
        super(props, context)
        this.courses = this.props.location.state.courses;
        console.log(this.courses);
        this.state = {
            videoList: [],
            key:0
        }
    }
    componentDidMount() {
        let that = this;
        net.get("videosByChapterId", { id: this.state.key },function (ob) {
            that.setState({
                videoList: ob.data.object
            });
            console.log(that.state.videoList);
        })
    }
    showVideos(id) { 
        console.log(id);
        
    }
    toBooks() { 
        this.props.history.push(`/student/courses`);
    }
    render() {
        return (
            <div className="coursesDetailBox">
                <div className="detailHeader">
                    <div className="datailContainer">
                        <div className="datailTitle">课程详情</div>
                        <div onClick={this.toBooks.bind(this)} className="toBooks">返回课堂首页</div>
                    </div>
                    <div className="detailBox">
                        <div className="coursesInfo">
                            <img src={this.courses.url} className="coursesImg"></img>
                            <div className="infoBox">
                                <h3>{this.courses.name}</h3>
                                <div className="infoIntro">{this.courses.introduce}</div>
                                <span>免费</span>
                                <Button type="primary" shape="round" style={{position:"absolute",bottom:0}}>立即学习</Button>
                            </div>
                        </div>
                        <div className="coursesContentDetail">
                            <div className="contentLeft">
                                <div className="contentTitle">课程章节目录</div>
                                <Collapse bordered={false} defaultActiveKey={['1']} style={{backgroundColor:'white',fontSize:16}}>
                                    {/* <Panel header="This is panel header 1" key="1">
                                        {text}
                                    </Panel> */}
                                    {this.courses.chapters.map((item) => {
                                        console.log(item.id);
                                        return <Panel
                                            header={item.name}
                                            key={item.id}
                                        >
                                        {this.state.videoList}
                                    </Panel> 
                                    })
                                }
                                </Collapse>
                            </div>
                            <div className="contentRight"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default CoursesDetail;