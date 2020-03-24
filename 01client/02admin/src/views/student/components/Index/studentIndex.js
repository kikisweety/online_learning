import React from "react";
import "./studentIndex.css";
import { Carousel } from 'antd';
export default class MyIndex extends React.Component {
    render() {
        return (
            <div className="indexBox">
                <Carousel autoplay>
                    <div className="banner1">
                        <div className="bannerContain">
                            <img src="/imgs/banner1.png"></img>
                            <div className="bannerTitle">
                                <h1>React+Vue精品课程</h1>
                                <h3>前端教程入门到精通</h3>
                            </div>
                        </div>
                    </div>
                    <div className="banner2">
                        <div className="bannerContain">
                            <img src="/imgs/banner2.png"></img>
                            <div className="bannerTitle">
                                <h3>英语.数学.逻辑.写作</h3>
                                <h1>真题课程包</h1>
                                <h3>超高效的提分神器</h3>
                            </div>
                        </div>
                    </div>
                    <div className="banner3">
                        <div className="bannerContain">
                            <img src="/imgs/banner3.png"></img>
                        </div>
                    </div>
                </Carousel>
            </div>
        );
    }
}