import React from "react";
import './courseInfo.css';
import net from "../../../../../../utils/net";
import { Form, Input, Button, Table, Upload, message, Icon, Select } from 'antd';
const { Option } = Select;
const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
};
const options = [];
function onChange(value) {
    console.log(value);
}
export default class CouresInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource:[],
            columns :[
                {
                    title: '课程名称',
                    dataIndex: 'name',
                    key: 'name',
                },
                {
                    title: "课程章节",
                    dataIndex: "chapters",
                    key: "chapters",
                },
                {
                    title: '课程介绍',
                    dataIndex: 'introduce',
                    key: 'introduce',
                },
                {
                    title: '操作',
                    key: 'action',
                    render: () => {
                        var that = this;
                        return (
                            <div>
                                <Button style={{ marginRight: 10 }} onClick={that.showForm.bind(this)}>修改</Button>
                                <Button>删除</Button>
                            </div>
                        )
                    }
                }
            ]
        }
    }
    showForm() {
        this.refs.addForm.style.display = "block"
    };
    closeForm() {
        this.refs.addForm.style.display = "none"
    };
    componentDidMount() { 
        this.getCourses();
    };
    getCourses() { 
        let that = this;
        let user = JSON.parse(window.localStorage.getItem("user"));
        let name = user.object.name;
        net.get("courses/selectTeacher", {name},function (ob) {
            that.setState({
                dataSource:ob.object
            })
        })
    };
    expandedRowRender = record => {
        const expendColumns = [
            { title: "视频名称", dataIndex: "name", key: "name" },
            {
                title: "视频链接",
                render: ob => {
                    let url = ob.url;
                    let id = ob.id;
                    if (url == 0) {
                        return (
                            <Upload
                                onRemove={this.removeFile}
                                beforeUpload={this.beforeUpload}
                                onChange={this.beforeUpload2.bind(null, id)}
                            >
                                <Button style={{ background: "#43BB60", color: "white", width: "120px" }}>
                                    <Icon type="upload" /> 上传视频
                  </Button>
                            </Upload>
                        );
                    } else {
                        return (
                            <Button
                                onClick={this.playVideo.bind(null, url)}
                                style={{ background: "#43BB60", color: "white", width: "120px" }}>播放视频</Button>
                        );
                    }
                }
            }
        ]
    };
    removeFile = file => {
        //获得文件的数据
        let fileList = this.state.fileList;
        //获得文件的下标
        const index = fileList.indexOf(file);
        //删除文件
        fileList.splice(index, 1);
        //覆盖数据
        this.setState({
            fileList: fileList
        });
    };
    beforeUpload = file => {
        //获得文件的数据
        let fileList = this.state.fileList;
        //添加文件
        fileList.push(file);
        //覆盖数据
        this.setState({
            fileList: fileList
        });
    };
    beforeUpload2 = (num) => {
        let id = num;
        let fileList = this.state.fileList
        let that = this;
        net.uploadFile(
            "video/update",
            {
                id: id,
                files: fileList
            },
            function (ob) {
                if (ob.msg == "更新成功！") {
                    console.log(ob);
                }
            }
        );

    };
    playVideo = (url, id) => {
        let source = url;
        console.log(source, id);
        if (source == 0) {
            this.setState({
                updataVideoId: id
            });
            alert("视频无效，请上传视频");
            this.refs.coursePlayVideo.style.display = "block";
            this.refs.uploadVideo.style.display = "block";
            return;
        }
        this.setState({
            source: source,
        });
        this.refs.source.src = source;
        let coursePlayVideo = this.refs.coursePlayVideo;
        let coursePlayVideoBox = this.refs.coursePlayVideoBox;
        let player = this.refs.player;
        coursePlayVideo.style.display = "block";
        coursePlayVideoBox.style.display = "block";
        player.load();
    }
    render() {
        const dataSource = [
            {
                key: '1',
                name: 'Python',
                introduce: 32,
                url: 'https://edu-image.nosdn.127.net/AB92B7251E042B89360B9BA58D21F2CC.png?imageView&quality=100&thumbnail=225y125&type=webp',
            },
            {
                key: '2',
                name: '胡彦祖',
                introduce: 42,
                url: 'https://edu-image.nosdn.127.net/AB92B7251E042B89360B9BA58D21F2CC.png?imageView&quality=100&thumbnail=225y125&type=webp',
            },
        ];


        const props = {
            name: 'file',
            action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            headers: {
                authorization: 'authorization-text',
            },
            onChange(info) {
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    message.success(`${info.file.name} 图片上传成功`);
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} 图片上传失败`);
                }
            },
        };

        return (
            <div className="setUpView">
                <div className="basicTitle">课程信息</div>
                <div className="basicBox">
                    <Table
                        dataSource={this.state.dataSource}
                        columns={this.state.columns}
                        pagination={false}
                        scroll={{ y: 800 }}
                        expandedRowRender={this.expandedRowRender}
                    />
                    <Button onClick={this.showForm.bind(this)} style={{ margin: '20px' }}>添加</Button>
                    <div className="addForm teacherForm" ref="addForm">
                        <div className="addTeacherTitle">老师添加</div>
                        <Form
                            name="nest-messages"
                            {...layout}
                            style={{ marginTop: '10px' }}
                        >
                            <Form.Item name='name' label="课程名称" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name='introduce' label="课程介绍" >
                                <Input />
                            </Form.Item>
                            <Form.Item name="url" label="课程图片">
                                <Upload {...props}>
                                    <Button>
                                        上传图片
                                    </Button>
                                </Upload>
                            </Form.Item>
                            <Form.Item wrapperCol={{ span: 24, offset: 6 }}>
                                <Button type="primary" htmlType="submit" style={{ marginRight: 20 }}>
                                    保存
                            </Button>
                                <Button type="primary" onClick={this.closeForm.bind(this)}>
                                    取消
                            </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}