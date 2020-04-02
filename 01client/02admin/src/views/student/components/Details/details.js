import React, { Component } from 'react';
import "./details.css"
import { Button } from "antd"
class Detail extends Component {
    constructor(props, context) {
        super(props, context)
        console.info(props)
        this.userList = props.location.state.userList
        console.log(this.userList);
    }
    toBooks() {
        this.props.history.push(`/student/books`);
    }
    render() {
        var userList = {}
        return (
            <div className="booksDetailBox">
                <div className="detailHeader">
                    <div className="datailContainer">
                        <div className="datailTitle">商品详情</div>
                        <div className="toBooks" onClick={this.toBooks.bind(this)} className="toBooks">返回商城</div>
                    </div>
                </div>
                <div className="booksDetailTop">
                    <div className="booksInfo">
                        <img src={this.userList.url} className="booksImg"></img>
                        <div className="infoBox">
                            <h4 className="booksTitle">{this.userList.commodity_name}</h4>
                            <div className="booksPrice">￥{this.userList.commodity_price}</div>
                            <div className="booksAmout">
                                <div>
                                    <span>库存：</span>
                                    <span>{this.userList.amout}件</span>
                                </div>
                                <div>
                                    <span>运费：</span>
                                    <span>￥0.00</span>
                                </div>
                            </div>
                            <div className="booksCar">
                                <Button type="primary" shape="round" style={{ backgorundColor: '#f60' }}>加入购物车</Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="booksContentDetail">
                    <div className="introBox">
                        <div className="detailTtile">商品介绍</div>
                        <img src={this.userList.commodity_details} style={{ width: '100%' }}></img>
                    </div>
                </div>
            </div>
        )
    }
}

export default Detail;