import React, { Component } from 'react';
import "./coursesDetail.css"
import { Button } from 'antd';
class CoursesDetail extends Component { 
    constructor(props, context) { 
        super(props, context)
        console.log(props);
        this.courses=this.props.location.state.courses
    }
    toBooks() { 
        this.props.history.push(`/student/courses`);
    }
    render() { 
        var courses = {}
        return (
            <div className="coursesDetailBox">
                <div className="detailHeader">
                    <div className="datailContainer">
                        <div className="datailTitle">课程详情</div>
                        <div onClick={this.toBooks.bind(this)} className="toBooks">返回课堂首页</div>
                    </div>
                    <div className="detailBox">
                        <div>{this.courses.name}</div>
                        <div></div>
                    </div>
                </div>
                {/* <p>{this.courses.name}</p> */}
            </div>
        )
    }
}
export default CoursesDetail;