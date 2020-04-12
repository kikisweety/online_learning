import React from "react";
import ReactDOM from "react-dom";
import "./Add.css";
import net from "../../../utils/net";
import StringUtil from "../../../utils/StringUtil";
import { Form, Select, Input, Button, Radio, Cascader, message,TreeSelect } from "antd";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
const { TreeNode } = TreeSelect;
// const { TextArea } = Input;

// Just show the latest item.
function displayRender(label) {
  return label[label.length - 1];
}
class ExaminationAdd extends React.Component {
  constructor(props) {
    super(props);
    // this.handleTextareaChange = this.handleTextareaChange.bind(this);
    this.state = {
      data: [],
      chapterId: -1,
      courses: [],
      answer: "0",
      deep: "a",
      value: undefined
    };
  }
  onChange = value => {
    this.setState({ value });
  };
  componentDidMount = e => {
    this.getId();
    let that = this;
    net.post("courses/and/chapters", {}, function (ob) {
      console.log(ob);
      // let courses = StringUtil.CascaderData(ob.object);
      that.setState({
        courses: ob.object
      });
    });
  };
  handleSubmit = e => {
    console.log(e);
  };
  getValue = (event) => {
    //获取单选框选中的值
    this.setState({
      answer: event.target.value,
      deep: event.target.value
    })
  };
  getId = (slectedKeys,e) => {
    // console.log(slectedKeys,e);
    this.setState({
      chapterId: slectedKeys
    })
  };
  upload = e => {
    let form = this.refs.form;
    //获得题干
    let title = this.refs.title.state.value;
    console.log(title);
    //获得选项A
    let textA = this.refs.textA.state.value;
    //获得选项B
    let textB = this.refs.textB.state.value;
    //获得选项C
    let textC = this.refs.textC.state.value;
    //获得选项D
    let textD = this.refs.textD.state.value;
    //获得答案
    let answer =this.state.answer;
    //章节id
    console.log(this.state.chapterId);
    let chapterId = this.state.chapterId;

    net.uploadFile(
      "question/add",
      {
        title: title,
        textA: textA,
        textB: textB,
        textC: textC,
        textD: textD,
        answer: answer,
        chapterId: chapterId
      },
      function (ob) {
        if (ob.code === -1) {
          alert("保存失败");
        } else {
          alert("保存成功");
        }

      }
    );
  };

  handleSelectChange = value => {
    this.props.form.setFieldsValue({
      note: `Hi, ${value === "本课程" ? "其他课程" : "本课程"}!`
    });
  };
  toQuery() {
    this.props.history.push(`/home/examination/query`);
  }

  onCascaderChange(value) {
    if (value.length <= 1) {
      message.error("请选择章节！");
    }
    this.setState({
      chapterId: value[1]
    });
  }
  render() {
    var treeNodeList = this.state.courses.map((item) => { 
      return <TreeNode value={item.name} title={item.name} key={item.name}>
        {item.chapters.map((v) => {
          return <TreeNode value={v.id} title={v.name} key={v.name} ></TreeNode>
        })}
      </TreeNode>
    });

    return (
      <div className="coursesBankBox-2">
        <div className="banktitle-2">试题添加</div>
        <div className="bank-content">
          <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} ref="form" style={{padding:30}}>
            <Form.Item label="课程章节">
              <TreeSelect
                showSearch
                style={{ width: '100%' }}
                value={this.state.value}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                placeholder="请选择课程章节"
                allowClear
                showSearch={false}
                // treeDefaultExpandAll
                onChange={this.onChange}
                onSelect={this.getId}
              >
                {treeNodeList}
              </TreeSelect>
            </Form.Item>
            <Form.Item label="题目">

              <Input ref="title" placeholder="" />

            </Form.Item>

            <Radio.Group
              name="radiogroup"
              defaultValue={1}
              className="bankSelectcontent"
            >
              <Form.Item label="选项A" >

                <Input ref="textA" placeholder="" />

              </Form.Item>
              <div className="readySelect">
                <Radio value="textA" onChange={(e) => this.getValue(e)}>正确答案</Radio>
              </div>
              <Form.Item label="选项B" >
                <Input ref="textB" placeholder="" />
              </Form.Item>
              <div className="readySelect">
                <Radio value="textB" onChange={(e) => this.getValue(e)}>正确答案</Radio>
              </div>
              <Form.Item label="选项C" >
                <Input ref="textC" placeholder="" />
              </Form.Item>
              <div className="readySelect">
                <Radio value="textC" onChange={(e) => this.getValue(e)}>正确答案</Radio>
              </div>
              <Form.Item label="选项D" >
                <Input ref="textD" placeholder="" />
              </Form.Item>
              <div className="readySelect">
                <Radio value="textD" onChange={(e) => this.getValue(e)}>正确答案</Radio>
              </div>
              {/* <Form.Item label="答案" >
                <Input ref="answer" placeholder="请输入答案" />
              </Form.Item> */}
            </Radio.Group>
          </Form>
        </div>

        <div className="bank2-buttom">
          <Button
            type="primary"
            style={{ background: "#43BB60" }}
            className="Bank2ButtonCenter"
            // onClick={this.toQuery.bind(this)}
            onClick={this.upload}
          >
            保存
          </Button>
        </div>
      </div>
    );
  }
}
export default Form.create()(ExaminationAdd);
