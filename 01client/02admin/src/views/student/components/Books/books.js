import React from "react";
import "./books.css";
import { List, Card } from 'antd';
import Footer from "../Footer/footer"
import net from "../../../../utils/net"
const { Meta } = Card;
export default class MyBooks extends React.Component {
    constructor() { 
        super()
        this.state = {
            booksList: [
                // {
                //     id: 1,
                //     commodity_name: '【配套视频】python基础教程零基础学Python3.5编程从入门到实践计算机程序设计pathon3核心技术网络爬虫书籍数据分析实战教程教材',
                //     commodity_details:'https://img.alicdn.com/imgextra/i4/859515618/TB20A65k4SYBuNjSspjXXX73VXa_!!859515618.jpg',
                //     commodity_price: 66.80,
                //     amout:20,
                //     url:'https://img.alicdn.com/imgextra/i4/2049420857/O1CN01aBgC4b1ICY16PcD55_!!0-item_pic.jpg_430x430q90.jpg'
                // }, {
                //     id: 2,
                //     commodity_name: 'PHP项目开发实战入门（全彩版）',
                //     commodity_details: 'https://img30.360buyimg.com/vc/jfs/t14218/213/1074510332/1030848/3fd1a906/5a44569fN6fda04f7.jpg',
                //     commodity_price: 54.40,
                //     amout: 10,
                //     url: 'https://img13.360buyimg.com/n1/jfs/t7372/154/1512499739/509566/252ba408/599d524eN22498259.jpg'
                // }, {
                //     id: 3,
                //     commodity_name: '【套装2本】java编程思想 第4版+数据结构与算法分析：Java语言描述 原书第3版 thinking in java计算机程序设计从入门到精通书籍',
                //     commodity_details: 'https://img.alicdn.com/imgextra/i3/2049420857/O1CN01YiEDVL1ICXyUVH5Nf_!!2049420857.jpg',
                //     commodity_price: 126.80,
                //     amout: 2,
                //     url: 'https://img.alicdn.com/imgextra/i1/2049420857/O1CN01RnYbpF1ICXxDFJ9rn_!!2049420857.jpg_430x430q90.jpg'
                // }, {
                //     id: 4,
                //     commodity_name: '【清华】C语言从入门到精通 (第4版) c语言程序设计电脑编程入门零基础自学c ++primer plus计算机软件程序员开发教程教材书籍2019',
                //     commodity_details: 'https://img.alicdn.com/imgextra/i1/2406931838/O1CN01SmXkXn1PRqUfRkuy3_!!2406931838.jpg',
                //     commodity_price: 34.90,
                //     amout: 5,
                //     url: 'https://img.alicdn.com/imgextra/i4/2406931838/O1CN01FxC7ux1PRqTQs6yO0_!!2406931838.jpg_430x430q90.jpg'
                // },
                // {
                //     id: 5,
                //     commodity_name:'C++ Primer中文版 第5版 C++编程从入门到精通C++11标准 C++经典教程语言程序设计软件计算机开发书籍c primer plus',
                //     commodity_details: 'https://img.alicdn.com/imgextra/i1/101450072/TB2HqcQgZrI8KJjy0FhXXbfnpXa-101450072.jpg',
                //     commodity_price: 89.60,
                //     amout: 10,
                //     url:'https://img.alicdn.com/imgextra/i4/101450072/O1CN01Vs97Yw1CP13tBMwBM-101450072.jpg_430x430q90.jpg'
                // }, {
                //     id: 6,
                //     commodity_name: 'JavaScript高级程序设计(第3版)JS入门到精通书籍JavaScript权威指南配套前端开发工程师书web开发HTML网站JavaScript实战工具书',
                //     commodity_details: 'http://img56.ddimg.cn/99999990002625676.jpg',
                //     commodity_price: 73.70,
                //     amout:66,
                //     url:'http://img3m3.ddimg.cn/2/21/22628333-1_u_2.jpg'
                // }
            ]
        }
    }
    routerTo(item) {
        this.props.history.push({ pathname: `/Detail/${item.id}`, state: { booksList: item } })
        // console.log(this.state.data);
    }
    componentDidMount() {
        let that = this;
        net.get('commodity/All', { }, function (ob) {
            // console.log(ob);
            that.setState({
                booksList: ob.data.object
            })
        });
    }
    render() {
        return (
            <div className="booksBox">
                <div className="bookContainer">
                    <List
                        className="list"
                        grid={{
                            gutter: 16,
                            column: 4
                        }}
                        itemLayout="horizontal"
                        dataSource={this.state.booksList}
                        renderItem={item => (
                            <List.Item style={{border:'red'}}>
                                <Card
                                    key={item.id}
                                    onClick={() => this.routerTo(item)}
                                    hoverable
                                    style={{ borderRadius: 5, color:'#f60',fontSize:16 }}
                                    cover={<img alt="example" src={item.url}/>}
                                >
                                    <Meta
                                        title={item.commodityName}
                                        style={{marginBottom:10}}
                                    ></Meta>
                                    ￥{item.commodityPrice}元
                                </Card>
                            </List.Item>
                        )}
                    />
                </div>
                <Footer></Footer>
            </div>
        );
    }
}