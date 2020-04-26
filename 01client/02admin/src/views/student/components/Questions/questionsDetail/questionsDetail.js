import React, { Component } from 'react';
import "./questionsDetail.css"
import { Button, Radio, Modal, Progress } from "antd"
const { confirm } = Modal;
class QuestionsDetail extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            value: '',
        };
        this.list = props.location.state.questions
    }
    toQuestions() {
        this.props.history.push(`/student/questions`);
    }
    onChange = e => {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
        });
    };
    // /确认框/ 
    showConfirm() {
        let that = this;
        confirm({
            title: '您确定是否要交卷?',
            onOk() {
                that.refs.resultBox.style.display = "block";
            },
            onCancel() { },
        });
    };
    closeResultBox() {
        this.refs.resultBox.style.display = "none";
    }
    render() {
        var questions = {}
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };
        return (
            <div className="questionsDetailBox">
                <div className="detailHeader">
                    <div className="datailContainer">
                        <div className="datailTitle">章节练习</div>
                        <div className="toBooks" onClick={this.toQuestions.bind(this)} className="toBooks">返回题库</div>
                    </div>
                </div>
                <div className="questionsDeatail">
                    <div className="chaptersTitle">
                        <div className="questionsChapter">{this.list.name}</div>
                        <div style={{ fontSize: 16, padding: 10 }}>单项选择题</div>
                    </div>
                    <div className="questionsList">
                        {this.list.questions.map((item, index) => {
                            // console.log(item);
                            return <div className="questionsContentBox" key={item.id}>
                                <div className="questionsId">第{index+1}道选择题</div>
                                <div className="questionsTitle">{item.title}</div>
                                <div className="questionschoice">
                                    <Radio.Group
                                        name="radio checked"
                                        onChange={this.onChange}
                                        // value={this.state.value}
                                        // id={item.id}
                                    >
                                        <Radio value={item.title+item.textA}  style={radioStyle}>A、{item.textA}</Radio>
                                        <Radio value={item.title + item.textB}   style={radioStyle}>B、{item.textB}</Radio>
                                        <Radio value={item.title + item.textC}   style={radioStyle}>C、{item.textC}</Radio>
                                        <Radio value={item.title + item.textD}   style={radioStyle}>D、{item.textD}</Radio>
                                    </Radio.Group>
                                </div>
                            </div>
                        })}
                    </div>
                    <div className="submit">
                        <Button type="primary" shape="round" onClick={this.showConfirm.bind(this)}>交卷</Button>
                        <div className="resultBox" ref='resultBox'>
                            <img src="/imgs/取消.png" onClick={this.closeResultBox.bind(this)} style={{ position: 'absolute', right: 0, cursor: 'pointer'}}></img>
                            <div className="resultTitle">练习报告</div>
                            <Progress type="circle" percent={75} />
                            <div className="resultTotal">总分：</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default QuestionsDetail;