import React, { Component } from 'react';
import "./questionsDetail.css"
import { Button, Radio, Modal } from "antd"
const { confirm } = Modal;
class QuestionsDetail extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            value: '',
        };
        this.list = props.location.state.questions
        console.log(this.list);
    }
    toQuestions() {
        this.props.history.push(`/student/questions`);
    }
    onChange = e => {
        // console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
        });
    };
    // /确认框/ 
    showConfirm() {
        confirm({
            title: '您确定是否要交卷?',
            onOk() {
                return new Promise((resolve, reject) => {
                    setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
                }).catch(() => console.log('Oops errors!'));
            },
            onCancel() { },
        });
    };
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
                        <div className="toBooks" onClick={this.toQuestions.bind(this)} className="toBooks">返回商城</div>
                    </div>
                </div>
                <div className="questionsDeatail">
                    <div className="chaptersTitle">
                        <div className="questionsChapter">{this.list.name}</div>
                        <div style={{ fontSize: 16, padding: 10 }}>单项选择题</div>
                    </div>
                    <div className="questionsList">
                        {this.list.questions.map((item, index) => {
                            return <div className="questionsContentBox" key={item.id}>
                                <div className="questionsId">第{index+1}道选择题</div>
                                <div className="questionsTitle">{item.title}</div>
                                <div className="questionschoice">
                                    <Radio.Group
                                        name="radiogroup"
                                        onChange={this.onChange}
                                        value={this.state.value}
                                    >
                                        <Radio value={1} style={radioStyle}>A、 {item.textA}</Radio>
                                        <Radio value={2} style={radioStyle}>B、{item.textB}</Radio>
                                        <Radio value={3} style={radioStyle}>C、{item.textC}</Radio>
                                        <Radio value={4} style={radioStyle}>D、{item.textD}</Radio>
                                    </Radio.Group>
                                </div>
                            </div>
                        })}
                    </div>
                    <div className="submit">
                        <Button type="primary" shape="round" onClick={this.showConfirm}>交卷</Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default QuestionsDetail;