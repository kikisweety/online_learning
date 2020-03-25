import React from "react";
import "./studentIndex.css";
import { Carousel } from 'antd';
export default class MyIndex extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div className="indexBox">
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
                <div className="rightList">

                </div>
            </div>
        );
    }
}