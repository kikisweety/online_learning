import React, { Component } from 'react';
import "./questionsDetail.css";
import net from "../../../../../utils/net"
import { Button, Radio, Modal, Progress, message } from "antd"
const { confirm } = Modal;
class QuestionsDetail extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            value1: '',
            value2: '',
            value3: '',
            value4: '',
        };
        this.list = props.location.state.questions
    }
    toQuestions() {
        this.props.history.push(`/student/questions`);
    }
    onChange1 = e => {
        this.setState({
            value1: e.target.value,
        });
    };
    onChange2 = e => {
        this.setState({
            value2: e.target.value,
        });

    };
    onChange3 = e => {
        this.setState({
            value3: e.target.value,
        });

    };
    onChange4 = e => {
        this.setState({
            value4: e.target.value,
        });

    };
    // /确认框/ 
    showConfirm() {
        let that = this;
        let value1 = this.state.value1;
        if (this.list.questions[0]) {
            var answer1 = this.list.questions[0].answer
        }
        let value2 = this.state.value2;
        if (this.list.questions[1]) {
            var answer2 = this.list.questions[1].answer
        }
        let value3 = this.state.value3;
        if (this.list.questions[2]) {
            var answer3 = this.list.questions[2].answer
        }
        let value4 = this.state.value4;
        if (this.list.questions[3]) {
            var answer4 = this.list.questions[3].answer
        }
        var jsonList = [
            { value: value1, answer: answer1 },
            { value: value2, answer: answer2 },
            { value: value3, answer: answer3 },
            { value: value4, answer: answer4 }
        ]
        confirm({
            title: '您是否确定交卷？',
            onOk() {
                net.post("question/result", { jsonList}, function (params) {
                    console.log(params);
                })
                message.warning("请将所有试题完成！")
                that.refs.resultBox.style.display = "block";
            },
            onCancel() { },
            okText: '确定',
            cancelText: '取消'
        })
    };
    closeResultBox() {
        this.refs.resultBox.style.display = "none";
    }
    render() {
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
                        <div style={{ fontSize: 12, padding: 10 }}>每道题25分，总分100</div>
                    </div>
                    {
                        this.list.questions[0] ? (
                            <div className="questionsList">
                                <div className="questionsContentBox">
                                    <div className="questionsId">第一道选择题</div>
                                    <div className="questionsTitle">{this.list.questions[0].title}</div>
                                    <div className="questionschoice">
                                        <Radio.Group
                                            name="radio checked"
                                            onChange={this.onChange1.bind(this)}
                                        >
                                            <Radio value={this.list.questions[0].textA} style={radioStyle}>A、{this.list.questions[0].textA}</Radio>
                                            <Radio value={this.list.questions[0].textB} style={radioStyle}>B、{this.list.questions[0].textB}</Radio>
                                            <Radio value={this.list.questions[0].textC} style={radioStyle}>C、{this.list.questions[0].textC}</Radio>
                                            <Radio value={this.list.questions[0].textD} style={radioStyle}>D、{this.list.questions[0].textD}</Radio>
                                        </Radio.Group>
                                    </div>
                                </div>
                            </div>
                        ) : null
                    }
                    {
                        this.list.questions[1] ? (
                            <div className="questionsList">
                                <div className="questionsContentBox">
                                    <div className="questionsId">第二道选择题</div>
                                    <div className="questionsTitle">{this.list.questions[1].title}</div>
                                    <div className="questionschoice">
                                        <Radio.Group
                                            name="radio checked"
                                            onChange={this.onChange2}
                                        >
                                            <Radio value={this.list.questions[1].textA} style={radioStyle}>A、{this.list.questions[1].textA}</Radio>
                                            <Radio value={this.list.questions[1].textB} style={radioStyle}>B、{this.list.questions[1].textB}</Radio>
                                            <Radio value={this.list.questions[1].textC} style={radioStyle}>C、{this.list.questions[1].textC}</Radio>
                                            <Radio value={this.list.questions[1].textD} style={radioStyle}>D、{this.list.questions[1].textD}</Radio>
                                        </Radio.Group>
                                    </div>
                                </div>
                            </div>
                        ) : null
                    }
                    {
                        this.list.questions[2] ? (
                            <div className="questionsList">
                                <div className="questionsContentBox">
                                    <div className="questionsId">第三道选择题</div>
                                    <div className="questionsTitle">{this.list.questions[2].title}</div>
                                    <div className="questionschoice">
                                        <Radio.Group
                                            name="radio checked"
                                            onChange={this.onChange3}
                                        >
                                            <Radio value={this.list.questions[2].textA} style={radioStyle}>A、{this.list.questions[2].textA}</Radio>
                                            <Radio value={this.list.questions[2].textB} style={radioStyle}>B、{this.list.questions[2].textB}</Radio>
                                            <Radio value={this.list.questions[2].textC} style={radioStyle}>C、{this.list.questions[2].textC}</Radio>
                                            <Radio value={this.list.questions[2].textD} style={radioStyle}>D、{this.list.questions[2].textD}</Radio>
                                        </Radio.Group>
                                    </div>
                                </div>
                            </div>

                        ) : null
                    }
                    {
                        this.list.questions[3] ? (
                            <div className="questionsList">
                                <div className="questionsContentBox">
                                    <div className="questionsId">第四道选择题</div>
                                    <div className="questionsTitle">{this.list.questions[3].title}</div>
                                    <div className="questionschoice">
                                        <Radio.Group
                                            name="radio checked"
                                            onChange={this.onChange4}
                                        >
                                            <Radio value={this.list.questions[3].textA} style={radioStyle}>A、{this.list.questions[3].textA}</Radio>
                                            <Radio value={this.list.questions[3].textB} style={radioStyle}>B、{this.list.questions[3].textB}</Radio>
                                            <Radio value={this.list.questions[3].textC} style={radioStyle}>C、{this.list.questions[3].textC}</Radio>
                                            <Radio value={this.list.questions[3].textD} style={radioStyle}>D、{this.list.questions[3].textD}</Radio>
                                        </Radio.Group>
                                    </div>
                                </div>
                            </div>

                        ) : null
                    }
                    <div className="submit">
                        <Button type="primary" shape="round" onClick={this.showConfirm.bind(this)}>交卷</Button>
                        <div className="resultBox" ref='resultBox'>
                            <img src="/imgs/取消.png" onClick={this.closeResultBox.bind(this)} style={{ position: 'absolute', right: 0, cursor: 'pointer' }}></img>
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