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
            booksList: []
        }
    }
    routerTo(item) {
        this.props.history.push({ pathname: `/Detail/${item.id}`, state: { booksList: item } })
    }
    componentDidMount() {
        this.getCommodity();
    }
    getCommodity() { 
        let that = this;
        net.get('commodity/All', { }, function (ob) {
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