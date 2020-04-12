import React from "react";
import "./Query.css";
import net from "../../../utils/net";
import { Button, Cascader, Table, Radio, TreeSelect} from "antd";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
const { TreeNode } = TreeSelect;
const columns = [
  {
    title: '题目',
    dataIndex: 'title',
    key:'title',
    render: text => <a>{text}</a>,
  },
  {
    title: '选项A',
    dataIndex: 'textA',
    key:'textA'
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
    render: () => {
      var that = this;
      return (
        <div>
          <Button style={{ marginRight: 10 }}>修改</Button>
          <Button>删除</Button>
        </div>
      )
    }
  },

];

// rowSelection object indicates the need for row selection
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
    // console.log(this.props);
    this.state = {
      data: [],
      options: [],
      value: undefined,
      chapterId: -1,
      courses: [],
      allQuestions:[]
    };

  };
  componentDidMount = e => {
    // this.getId();
    let that = this;
    net.post("courses/and/chapters", {}, function (ob) {
      console.log(ob);
      // let courses = StringUtil.CascaderData(ob.object);
      that.setState({
        courses: ob.object
      });
    });
    
    net.post("questions/all", {},function (ob) {
      console.log(ob);
      that.setState({
        allQuestions:ob.object
      })
    })
  };
  toBankAdd() {
    this.props.history.push(`/home/examination/add`);
  };
  onChange = value => {
    this.setState({ value });
  };
  getId = (slectedKeys, e) => {
    console.log(slectedKeys,e);
    this.setState({
      chapterId: slectedKeys
    })
  };
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
              style={{ width: '50%' }}
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
            style={{ background: "#43BB60", margin: "0px 8px 0px 0px" }}
          >
            搜索
          </Button>
        </div>
        {/* 题库表单 */}
        <div className="table-Bank">
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={this.state.allQuestions}
          ></Table>
          {/* 删除按键 */}

          <div className="bank-button">
            <Radio className="bk-butten">全选</Radio>
            <Button type="primary" style={{ background: "#ECECEC", color: "black" }}>删除</Button>
          </div>

        </div>
      </div>
    );
  }
}
