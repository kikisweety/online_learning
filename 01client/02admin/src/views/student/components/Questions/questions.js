import React from "react";
import "./questions.css";
import Footer from "../Footer/footer"
export default class MyQuestions extends React.Component {
    render() {
        return (
            <div className="questionsBox">
                <div className="questionContainer">我是首页</div>
                <Footer></Footer>
            </div>
        );
    }
}