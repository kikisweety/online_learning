import React from "react";
import "./courseCreate.css";
import { Button, Input, Table, TreeSelect } from "antd";
import net from "../../utils/net";
import StringUtil from "../../utils/StringUtil";
import {
  Link
} from 'react-router-dom';
const { TreeNode } = TreeSelect;
export default class MyCourseCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorContent: '',
      courses:[],
      allQuestions: [],
      value1: null,
      value2: null,
      questionData: [],
      value: undefined,
      fileList:[],
      columns: [
        {
          title: "题目",
          dataIndex: "title",
          render: text => <a>{text}</a>
        },
        {
          title: '选项A',
          dataIndex: 'textA',
        },
        {
          title: '选项B',
          dataIndex: 'textB',
        },
        {
          title: '选项C',
          dataIndex: 'textC',
        },
        {
          title: '选项D',
          dataIndex: 'textD',
        },
        {
          title: '正确答案',
          dataIndex: 'answer',
        }
      ],
      chapterId: -1,
      questionIds: []
    };
  };

  componentDidMount = e => {
    let that = this;
    net.post("courses/and/chapters", {}, function (ob) {
      that.setState({
        courses: ob.object
      });
    });
  };
  handleChange = value => {
    let that = this;
    net.get("question/chapterid", {
      id: value,
    },
      function (ob) {
        that.setState({
          questionData: ob.data.object,
          chapterId: value
        })
        // console.log(ob.data.object);
      }
    )
  };
  upload =e=> {
    let chapterId = this.state.chapterId;
    // console.log(chapterId);
    let questionData = this.state.questionData;
    let questionIds=[];
    questionData.map(function (item) {
      questionIds.push(item.id);
      console.log(questionIds);
      return questionIds;
    });
   
    net.post(
      "insert/exam/chapter",
      {
        chapterId: chapterId, questionIds: questionIds
      },
      function (ob) {
        // console.log(ob);
      }
    )
  };
  onChange = value => {
    this.setState({ value });
  };
  getId = (selectedKeys, e) => {
    let that = this;
    net.get("question/chapterid", {chapterId:selectedKeys},function (ob) {
        that.setState({
          questionData: ob.data.object,
          chapterId: selectedKeys
        })
      }
    )
  };
  render() {
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
    var treeNodeList = this.state.courses.map((item) => {
      return <TreeNode value={item.name} title={item.name} key={item.name}>
        {item.chapters.map((v) => {
          return <TreeNode value={v.id} title={v.name} key={v.name} ></TreeNode>
        })}
      </TreeNode>
    });
    return (
      <div className="courseTestBox">
        <div className="testHeader">
          <h1 className="testTitle">创建试卷</h1>
          <div className="keepBtn">
            <Button
              style={{ backgroundColor: "#43BC60", width: "120px", textAlign: "center", color: "white",marginRight:10}}
              onClick={this.upload}
            >保存</Button>
            <Link to={"/home/courses/add"}>
              <Button className="backToCreate">返回</Button>
            </Link>
          </div>
        </div>
        <div className="createBox">
          <div className="createHeader">
            <div className="createHeaderLeft">
              <span className="leftVideo">课程章节</span>
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
                onSelect={this.getId.bind(this)}
              >
                {treeNodeList}
              </TreeSelect>
            </div>
          </div>
          <Table
            rowSelection={rowSelection}
            columns={this.state.columns}
            dataSource={this.state.questionData}
            style={{ width: "100%", height: 500, margin: "0 auto" }}
            pagination={{ pageSize: 8}}
            scroll={{ y: 500 }}
          />
        </div>
      </div>
    );
  }
}
