import React from "react";
import "./Add.css";
import net from "../../../utils/net";
import { Form, Select, Input, Button, Radio,  message,TreeSelect } from "antd";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
const { TreeNode } = TreeSelect;
function displayRender(label) {
  return label[label.length - 1];
}
class ExaminationAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      chapterId: -1,
      courses: [],
      textA: 'textA',
      textB: 'textB',
      textC: 'textC',
      textD:'textD',
      answer: '',
      deep: '',
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
      that.setState({
        courses: ob.object
      });
    });
  };
  handleSubmit = e => {
    console.log(e);
  };
  getValue = (event) => {
    let textA = this.refs.textA.state.value;
    let textB = this.refs.textB.state.value;
    let textC = this.refs.textC.state.value;
    let textD = this.refs.textD.state.value; 
    //获取单选框选中的值
    this.setState({
      textA: textA,
      textB: textB,
      textC: textC,
      textD: textD,
      answer: event.target.value,
      deep: event.target.value
    });
  };
  getId = (slectedKeys,e) => {
    this.setState({
      chapterId: slectedKeys
    })
  };
  upload = e => {
    let title = this.refs.title.state.value;
    let textA = this.refs.textA.state.value;
    let textB = this.refs.textB.state.value;
    let textC = this.refs.textC.state.value;
    let textD = this.refs.textD.state.value;
    let answer = this.state.answer;
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
        if (ob.code ===1) {
          message.success(ob.msg);
        } else {
          message.warning("添加失败！");
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
                <Radio value={this.state.textA} onChange={(e) => this.getValue(e)}>正确答案</Radio>
              </div>
              <Form.Item label="选项B" >
                <Input ref="textB" placeholder="" />
              </Form.Item>
              <div className="readySelect">
                <Radio value={this.state.textB} onChange={(e) => this.getValue(e)}>正确答案</Radio>
              </div>
              <Form.Item label="选项C" >
                <Input ref="textC" placeholder="" />
              </Form.Item>
              <div className="readySelect">
                <Radio value={this.state.textC} onChange={(e) => this.getValue(e)}>正确答案</Radio>
              </div>
              <Form.Item label="选项D" >
                <Input ref="textD" placeholder="" />
              </Form.Item>
              <div className="readySelect">
                <Radio value={this.state.textD} onChange={(e) => this.getValue(e)}>正确答案</Radio>
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
