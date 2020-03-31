import React from "react";
import "./books.css";
import { List, Card } from 'antd';
import Footer from "../Footer/footer"
const { Meta } = Card;
export default class MyBooks extends React.Component {
    constructor() { 
        super()
        this.state = {
            userList: [
                {
                    id: 100,
                    introduce: '林xx',
                    price: 18,
                    imgUrl:'https://img.yzcdn.cn/upload_files/2020/02/21/FrbgUSCsGc2HfuBrMkJp1tupEN6u.png!280x280.jpg'
                }, {
                    id: 104,
                    introduce: '黄xx',
                    price: 20,
                    imgUrl:'https://img.yzcdn.cn/upload_files/2020/03/14/Fn5xKi_Ib2H1g296mgyVpDsXldx2.png!280x280.jpg'
                }, {
                    id: 106,
                    introduce: '王xx',
                    price: 30,
                    imgUrl:'https://img.yzcdn.cn/upload_files/2019/11/04/FosuJNo--UQuosMDmtynm370xKiv.jpg!280x280.jpg'
                }, {
                    id: 108,
                    introduce: '田xx',
                    price: 30,
                    imgUrl:'https://img.yzcdn.cn/upload_files/2019/12/06/Fi94B-7fp9g-YYC-jC7sVvC461gG.jpg!280x280.jpg'
                } 
            ]
        }
    }
    routerTo(v) {
        this.props.history.push({ pathname: `/Detail/${v.id}`, state: { userList: v } })
        // console.log(this.state.data);
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
                        dataSource={this.state.userList}
                        renderItem={item => (
                            <List.Item style={{border:'red'}}>
                                <Card
                                    key={item.id}
                                    onClick={() => this.routerTo(item)}
                                    hoverable
                                    style={{  borderRadius: 5 }}
                                    // cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                                    cover={<img alt="example" src={item.imgUrl} />}
                                >
                                    <Meta
                                        title={item.introduce}
                                        description={item.price} />
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