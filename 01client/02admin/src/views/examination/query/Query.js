import React from "react";
import "./Query.css";
import net from "../../../utils/net";
import { Button, Table, TreeSelect, Modal } from "antd";
const { TreeNode } = TreeSelect;
const { confirm } = Modal;
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
      columns: [
        {
          title: '题目',
          dataIndex: 'title',
          key: 'title',
          render: text => <a>{text}</a>,
        },
        {
          title: '选项A',
          dataIndex: 'textA',
          key: 'textA'
        },
        {
          title: '选项B',
          dataIndex: 'textB',
          key: 'textB'
        },
        {
          title: '选项C',
          dataIndex: 'textC',
          key: 'textC'
        },
        {
          title: '选项D',
          dataIndex: 'textD',
          key: 'textD'
        },
        {
          title: '答案',
          dataIndex: 'answer',
          key: 'answer'
        },
        {
          title: '操作',
          dataIndex: 'action',
          render: (text, record) => {
            return (
              <div>
                <Button style={{ background: "#43BB60", color: 'white', marginRight: 10 }} onClick={this.toBankAdd.bind(this, record)}>修改</Button>
                <Button type="danger" style={{ color: 'white' }} onClick={this.delete.bind(this, record)}>删除</Button>
              </div>
            )
          }
        },

      ]
    };

  };
  componentDidMount = e => {
    let that = this;
    net.post("courses/and/chapters", {}, function (ob) {
      console.log(ob);
      that.setState({
        courses: ob.object
      });
    });
    this.getQuestions();
  };
  getQuestions() {
    let that = this;
    net.post("question/all", {}, function (params) {
      console.log(params);
      that.setState({
        allQuestions: params.object
      })
    })
  };
  toBankAdd(record) {
    this.props.history.push({ pathname: `/home/examination/add`, state: { examList: record } })
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
              // treeDefaultExpandAll
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
            rowKey={record => record.id}
            rowSelection={rowSelection}
            columns={this.state.columns}
            dataSource={this.state.allQuestions}
            style={{ width: "100%", height: 500, margin: "0 auto" }}
            pagination={{ pageSize: 8 }}
            scroll={{ y: 500 }}
          ></Table>
        </div>
      </div>
    );
  }
}
