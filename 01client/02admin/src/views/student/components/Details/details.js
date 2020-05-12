import React, { Component } from 'react';
import "./details.css"
import { Button, message, InputNumber } from "antd"
import net from "../../../../utils/net"
class Detail extends Component {
    constructor(props, context) {
        super(props, context)
        this.booksList = props.location.state.booksList;
        this.state=({
            number:1
        })
    };
    toBooks() {
        this.props.history.push(`/student/books`);
    };
    handleAge(e) {
        this.setState({
            number: e
        })
    };
    toOrder = () => {
        let userList = JSON.parse(window.localStorage.getItem("user"));
        let name = userList.object.name;
        let amount = this.booksList.amount;
        let commodityDetails = this.booksList.commodityDetails;
        let commodityName = this.booksList.commodityName;
        let commodityPrice = this.booksList.commodityPrice;
        let url = this.booksList.url;
        let number = this.state.number;
        net.uploadFile("order/insert", { name, amount, commodityDetails, commodityName, commodityPrice, url, number }, function (ob) {
            message.success('成功加入购物车，请到个人中心支付！');
        })
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
                            <div className="booksAmount">
                                <div>
                                    <span>库存：</span>
                                    <span>{this.booksList.amount}件</span>
                                </div>
                                <div>
                                    <span>运费：</span>
                                    <span>￥0.00</span>
                                </div>
                                <div>
                                    <span>购买数量：</span>
                                    <InputNumber onChange={this.handleAge.bind(this)} />
                                </div>
                            </div>
                            <div className="booksCar">
                                <Button type="primary" shape="round" style={{ backgorundColor: '#f60' }} onClick={this.toOrder}>加入购物车</Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="booksContentDetail">
                    <div className="introBox">
                        <div className="detailTtile">商品介绍</div>
                        <img src={this.booksList.commodityDetails} style={{ width: '100%', marginBottom: '10px' }}></img>
                    </div>
                </div>
            </div>
        )
    }
}

export default Detail;