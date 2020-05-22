import React from "react";
import "./Query.css";
import net from "../../../utils/net";
import { Button, Table, TreeSelect, Modal,Input,Form, message } from "antd";
const { TreeNode } = TreeSelect;
const { confirm } = Modal;
const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
  getCheckboxProps: record => ({
    disabled: record.name === "Disabled User", // Column configuration not to be checked
    name: record.name
  })
};

export default class ExaminationQuery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      options: [],
      value: undefined,
      chapterId: -1,
      courses: [],
      allQuestions: [],
      title:'',
      textA: '',
      textB: '',
      textC: '',
      textD: '',
      answer: '',
      currentQuestion:[],
      columns: [
        {
          title: '题目',
          dataIndex: 'title',
          key: 'title',
          width:200,
          render: text => <a>{text}</a>,
        },
        {
          title: '选项A',
          dataIndex: 'textA',
          key: 'textA',
          width:200
        },
        {
          title: '选项B',
          dataIndex: 'textB',
          key: 'textB',
          width:200
        },
        {
          title: '选项C',
          dataIndex: 'textC',
          key: 'textC',
          width:200
        },
        {
          title: '选项D',
          dataIndex: 'textD',
          key: 'textD',
          width:200
        },
        {
          title: '答案',
          dataIndex: 'answer',
          key: 'answer',
          width:200
        },
        {
          title: '操作',
          dataIndex: 'action',
          width:200,
          render: (text, record) => {
            return (
              <div>
                <Button style={{ background: "#43BB60", color: 'white', marginRight: 10 }} onClick={this.edit.bind(this, record)}>修改</Button>
                <Button type="danger" style={{ color: 'white' }} onClick={this.delete.bind(this, record)}>删除</Button>
              </div>
            )
          }
        },

      ]
    };

  };
  onChangeTitle(e) {
    this.setState({
      title:e.target.value
    })
  };
  onChangeTextA(e) {
    this.setState({
      textA: e.target.value
    })
  };
  onChangeTextB(e) {
    this.setState({
      textB: e.target.value
    })
  };
  onChangeTextC(e) {
    this.setState({
      textC: e.target.value
    })
  };
  onChangeTextD(e) {
    this.setState({
      textD: e.target.value
    })
  };
  onChangeAnswer(e) {
    this.setState({
      answer: e.target.value
    })
  };
  componentDidMount (){
    let that = this;
    net.post("courses/and/chapters", {}, function (ob) {
      that.setState({
        courses: ob.object
      });
    });
    this.getQuestions();
  };
  getQuestions() {
    let that = this;
    net.post("question/all", {}, function (params) {
      that.setState({
        allQuestions: params.object
      })
    })
  };
  edit(record) { 
    let title = record.title;
    let textA = record.textA;
    let textB = record.textB;
    let textC = record.textC;
    let textD = record.textD;
    let answer = record.answer;
    let chapterId = record.chapterId;
    this.setState({
      title: title,
      textA: textA,
      textB: textB,
      textC: textC,
      textD: textD,
      answer: answer,
      chapterId:chapterId,
      currentQuestion:record
    });
    this.refs.addForm.style.display = "block";
    this.refs.opacity.style.display = "block";
  };
  update() { 
    let that = this;
    let id = this.state.currentQuestion.id;
    let title = this.state.title;
    let textA = this.state.textA;
    let textB = this.state.textB;
    let textC = this.state.textC;
    let textD = this.state.textD;
    let answer = this.state.answer;
    let chapterId = this.state.chapterId;
    net.uploadFile("question/update", {id,title,textA,textB,textC,textD,answer,chapterId},function (ob) {
      if (ob.code==1) {
        message.success(ob.msg);
        that.refs.addForm.style.display = "none";
        that.refs.opacity.style.display = "none";
        that.getQuestions();
      }
    })
  }
  closeForm() {
    this.refs.addForm.style.display = "none";
    this.refs.opacity.style.display = "none";
  };
  onChange = value => {
    this.setState({ value });
  };
  getId = (slectedKeys, e) => {
    this.setState({
      chapterId: slectedKeys
    })
  };
  onSearch(chapterId) {
    let that = this;
    net.post("question/chapterid", { chapterId: this.state.chapterId }, function (params) {
      that.setState({
        allQuestions: params.object
      })
    })
  };
  onReset() {
    this.getQuestions();
  };
  delete(record) {
    let that = this;
    let id = record.id;
    confirm({
      title: '提示',
      content: '确定删除吗？',
      onOk() {
        return net.get(
          "question/delete", { id: id },
          function (res) {
            that.getQuestions();
          }
        )
      },
      onCancel() { },
      okText: '确定',
      cancelText: '取消'
    })
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
      <div className="coursesBankBox">
        {/* 头部 */}
        <div className="banktitle-2">试题查询</div>
        {/* 选择器 */}
        <div className="BankSeletBox">
          <div className="left-Select">
            <div>课程章节</div>
            <TreeSelect
              showSearch
              style={{ width: '70%' }}
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
          </div>
          <Button
            value="small"
            type="primary"
            onClick={this.onSearch.bind(this)}
            style={{ background: "#43BB60", margin: "0px 8px 0px 0px" }}
          >
            搜索
          </Button>
          <Button
            value="small"
            type="primary"
            onClick={this.onReset.bind(this)}
            style={{ background: "#43BB60", margin: "0px 8px 0px 0px" }}
          >
            重置
          </Button>
        </div>
        {/* 题库表单 */}
        <div className="table-Bank">
          <Table
            bordered
            rowKey={record => record.id}
            rowSelection={rowSelection}
            columns={this.state.columns}
            dataSource={this.state.allQuestions}
            style={{ width: "100%", height: 500, margin: "0 auto" }}
            pagination={{ pageSize: 8 }}
            scroll={{ y: 500 }}
          ></Table>
          <div className="opacity" ref="opacity"></div>
          <div className="addForm teacherForm" ref="addForm">
            <div className="addTeacherTitle">题目修改</div>
            <Form
              name="nest-messages"
              {...layout}
              style={{ marginTop: '10px' }}
            >
              <Form.Item name='title' label="题目" rules={[{ required: true }]}>
                <Input value={this.state.title} onChange={this.onChangeTitle.bind(this)} />
              </Form.Item>
              <Form.Item name='textA' label="选项A" >
                <Input value={this.state.textA} onChange={this.onChangeTextA.bind(this)} />
              </Form.Item>
              <Form.Item name='textB' label="选项B" >
                <Input value={this.state.textB} onChange={this.onChangeTextB.bind(this)} />
              </Form.Item>
              <Form.Item name='textC' label="选项C" >
                <Input value={this.state.textC} onChange={this.onChangeTextC.bind(this)} />
              </Form.Item>
              <Form.Item name='textD' label="选项D" >
                <Input value={this.state.textD} onChange={this.onChangeTextD.bind(this)} />
              </Form.Item>
              <Form.Item name='answer' label="答案" >
                <Input value={this.state.answer} onChange={this.onChangeAnswer.bind(this)} />
              </Form.Item>
              <Form.Item wrapperCol={{ span: 24, offset: 6 }}>
                <Button onClick={this.update.bind(this)}>提交更改</Button>
                <Button type="primary" onClick={this.closeForm.bind(this)}>
                  取消
                            </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}
