import React, { Component } from 'react';
import "./coursesDetail.css"
class CoursesDetail extends Component { 
    constructor(props, context) { 
        super(props, context)
        console.log(props);
        this.courses=props.location.state.courses
    }
    render() { 
        var courses = {}
        return (
            <div className="coursesDetailBox">
                <p>{this.courses.name}</p>
            </div>
        )
    }
}
export default CoursesDetail;