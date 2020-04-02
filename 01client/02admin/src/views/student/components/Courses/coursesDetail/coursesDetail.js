import React, { Component } from 'react';
import "./coursesDetail.css"
import { Button, Collapse,Icon } from 'antd';
import net from "../../../../../utils/net"
import { Player } from "video-react";
// import "/node_modules/video-react/dist/video-react.css";
const { Panel } = Collapse;
class CoursesDetail extends Component { 
    constructor(props, context) { 
        super(props, context)
        this.courses = this.props.location.state.courses;
        this.state = {
            source:''
        }
    }
    componentDidMount() {}
    toBooks() { 
        this.props.history.push(`/student/courses`);
    }
    playVideo(url, id) { 
        let source = url;
        console.log(source, id);
        this.setState({
            source:source
        })
        this.refs.source.src = source;
        let coursePlayVideo = this.refs.playVideo;
        let coursePlayVideoBox = this.refs.coursePlayVideoBox;
        let player = this.refs.player;
        coursePlayVideo.style.display = "block";
        coursePlayVideoBox.style.display="block"
        player.load();
        // console.log(111);
        
    }
    closeVideo = () => { 
        let coursePlayVideo = this.refs.playVideo;
        let coursePlayVideoBox = this.refs.coursePlayVideoBox;
        let player = this.refs.player;
        coursePlayVideo.style.display = "none";
        coursePlayVideoBox.style.display = "none";
        player.pause();
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
                                    {this.courses.chapters.map((item) => {
                                        // console.log(item.videos);
                                        return <Panel
                                            header={item.name}
                                            key={item.id}
                                        >
                                            {item.videos.map((v) => {
                                                // console.log(v.url);
                                                return <div className="videoBox" style={{display:'flex',position:'relative',padding:10}}>
                                                    <span>{v.name}</span>
                                                    <img
                                                        src="/imgs/视频.png"
                                                        style={{ position: 'absolute', right: 0 }}
                                                        onClick={this.playVideo.bind(this,v.url)}
                                                    />
                                                    <div className="coursePlayVideoBox" ref="coursePlayVideoBox">
                                                        <Icon
                                                            className="closeVideo"
                                                            type="close-circle"
                                                            onClick={this.closeVideo}
                                                        />
                                                        <Player
                                                            fluid={false}
                                                            width={800}
                                                            height={700}
                                                            ref="player"
                                                            videoId="video-1">
                                                            <source ref="source" src={this.state.source}></source>
                                                        </Player>
                                                    </div>
                                                </div>
                                             })}
                                    </Panel> 
                                    })
                                }
                                    <div className="playVideo" ref="playVideo"></div>
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