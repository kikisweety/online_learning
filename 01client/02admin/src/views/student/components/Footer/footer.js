import React from "react";
import "./footer.css";

export default class MyFooter extends React.Component { 
    render() { 
        return (
            <div className="footerBox">
                <div className="footerContainer">
                    <div className="aboutBox">
                        <div className="aboutTitle">
                            <img src="/imgs/微博.png"></img>
                            <span>关注微博</span>
                            <img src="/imgs/weibo.png" style={{ width: '80px',height:'80px',marginLeft:10 }}/>
                        </div>
                        <div className="aboutTitle">
                            <img src="/imgs/微信.png"></img>
                            <span>关注微信</span>
                            <img src="/imgs/wechat.png" style={{ width: '80px', height: '80px', marginLeft: 10  }} />
                        </div>
                        <div style={{position:'absolute',right:0}}>
                            <span style={{fontSize:'16px',color:'#ccc',fontWeight:'bold'}}>关于我们：</span>
                            <span style={{fontSize:'14px',color:'#ccc'}}>重庆三峡学院2020级应届毕业生</span>
                        </div>
                    </div>
                    <div className="describeBox">
                        <img src="/imgs/课堂.png" style={{ width: 35, height: 35 }}></img>
                        <div>为了保证您获得更好的学习体验，请首选谷歌浏览器，也可使用360浏览器(极速模式)、Edge内核浏览器</div>
                    </div>
                </div>
            </div>
        )
    }
} 