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
                        </div>
                        <div className="aboutTitle">
                            <img src="/imgs/微信.png"></img>
                            <span>关注微信</span>
                        </div>
                    </div>
                    <div className="describeBox"></div>
                </div>
            </div>
        )
    }
} 