import React from "react";
import "./books.css";
import Detail from "../Details/details"
export default class MyBooks extends React.Component {
    routerTo(v) {
        this.props.history.push({ pathname: `/Detail/${v.id}`, state: { userList: v } })
        // console.log(this.state.data);
    }
    render() {
        var userList = [
            {
                id: 100,
                name: '林xx',
                age: 18
            }, {
                id: 104,
                name: '黄xx',
                age: 20
            }, {
                id: 106,
                name: '王xx',
                age: 30
            }
        ]
        return (
            <div className="booksBox">
                <div>
                    <ul>
                    {
                        userList.map(v => {
                            return <li key={v.id}>
                                <button onClick={() => this.routerTo(v)}>跳转到详情页面</button>
                            </li>
                        })
                    }
                    </ul>
                </div>
            </div>
        );
    }
}