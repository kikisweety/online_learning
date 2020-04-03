import React, { Component } from 'react';
import "./details.css"
import { Button } from "antd"
class Detail extends Component {
    constructor(props, context) {
        super(props, context)
        // console.info(props)
        this.booksList = props.location.state.booksList
        // console.log(this.booksList);
    }
    toBooks() {
        this.props.history.push(`/student/books`);
    }
    render() {
        var booksList = {}
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
                        <img src={this.booksList.url} className="booksImg"></img>
                        <div className="infoBox">
                            <h4 className="booksTitle">{this.booksList.commodityName}</h4>
                            <div className="booksPrice">￥{this.booksList.commodityPrice}</div>
                            <div className="booksAmout">
                                <div>
                                    <span>库存：</span>
                                    <span>{this.booksList.amount}件</span>
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
                        <img src={this.booksList.commodityDetails} style={{ width: '100%',marginBottom:'10px'}}></img>
                    </div>
                </div>
            </div>
        )
    }
}

export default Detail;