import React, { Component } from 'react';
import "./details.css"
class Detail extends Component {
    constructor(props, context) {
        super(props, context)
        console.info(props)
        this.userList = props.location.state.userList
        console.log(this.userList);
    }
    render() {
        var userList = {}
        return (
            <div className="testBox">
                <p>详情页面</p>
                <li>姓名:{this.userList.name}--年龄:{this.userList.age}--ID:{this.userList.id}</li>
            </div>
        )
    }
}

export default Detail;