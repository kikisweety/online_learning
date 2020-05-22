import React from "react";
import './courseInfo.css';
import net from "../../../../../../utils/net";
import { Form, Input, Button, Table, Upload, message, Icon, Select, Radio, Modal, Divider } from 'antd';
const { Option } = Select;
const { confirm } = Modal;
const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
};
function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
}
export default class CouresInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            imageUrl: '',
            name: '',
            introduce: '',
            type: '',
            fileList: [],
            chapterName: '',
            currentCourse: [],
            isAdd: true,
            columns: [
                {
                    title: '课程名称',
                    dataIndex: 'name',
                    key: 'name',
                    width: 100
                },
                {
                    title: "课程章节",
                    dataIndex: "chapters",
                    key: "chapters",
                    width: 150,
                    render: chapters => {
                        if (chapters.length < 1) {
                            return;
                        }
                        let temp = chapters[0].name;
                        return (
                            <Select
                                defaultValue={temp}
                                style={{ width: 120 }}
                                onSelect={this.handleChange}
                            >
                                {chapters.map(function (item) {
                                    return <Option value={item.id} key={item.id}>{item.name}</Option>;
                                })}
                            </Select>
                        )
                    }
                },
                {
                    title: '课程介绍',
                    dataIndex: 'introduce',
                    key: 'introduce',
                    width: 200,
                },
                {
                    title: "课程图片",
                    dataIndex: "url",
                    key: "url",
                    width: 200,
                    render: (url) => {
                        return (
                            <div>
                                <img src={url} style={{ width: 150, height: 100 }}></img>
                            </div>
                        )
                    }
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 200,
                    render: (record) => (
                        <span>
                            <a style={{ marginRight: 20 }} onClick={this.showChaper.bind(this, record)}>添加章节</a>
                            <Divider type="vertical" />
                            <a style={{ marginRight: 20 }} onClick={this.edit.bind(this, record)}>修改</a>
                            <Divider type="vertical" />
                            <a onClick={this.delete.bind(this,record)}>删除</a>
                        </span>
                    )
                }
            ]
        }
    };
    showForm() {
        this.refs.addForm.style.display = "block";
        this.refs.opacity.style.display = "block";
    };
    addForm() {
        this.setState({
            isAdd: true,
            name: '',
            introduce: '',
            type: '',
            imageUrl: ''
        })
        this.refs.addForm.style.display = "block";
        this.refs.opacity.style.display = "block";
    }
    showChaper(record) {
        this.refs.addChapters.style.display = "block";
        this.refs.opacity.style.display = "block";
        this.setState({
            currentCourse: record
        })
    };
    add() {
        let user = JSON.parse(window.localStorage.getItem("user"));
        let teacherName = user.object.name;
        let that = this;
        let name = this.state.name;
        let introduce = this.state.introduce;
        let fileList = this.state.fileList;
        let type = this.state.type;
        net.uploadFile("courses/add", { name: name, introduce: introduce, files: fileList, teacherName: teacherName, courseType: type }, function (ob) {
            if (ob.code == 1) {
                message.success(ob.msg);
                that.refs.addForm.style.display = "none";
                that.refs.opacity.style.display = "none";
                that.getCourses();
            }
        })
    };
    addChaper() {
        let that = this;
        let chapterName = this.state.chapterName;
        let id = this.state.currentCourse.id;
        net.uploadFile("chapter/add", { name: chapterName, courseId: id }, function (ob) {
            that.refs.addChapters.style.display = "none";
            that.refs.opacity.style.display = "none";
            that.getCourses();
        })
    };
    edit(record) {
        let name = record.name;
        let introduce = record.introduce;
        let type = record.courseType;
        let imageUrl = record.url;
        this.setState({
            isAdd: false,
            name: name,
            type: type,
            introduce: introduce,
            imageUrl: imageUrl,
            currentCourse: record
        })
        this.refs.addForm.style.display = "block";
        this.refs.opacity.style.display = "block";
    };
    onChangeName(e) {
        this.setState({
            name: e.target.value
        })
    };
    onChangeIntro(e) {
        this.setState({
            introduce: e.target.value
        })
    };
    onChangeType(e) {
        this.setState({
            type: e.target.value
        })
    };
    onChangeChapters(e) {
        this.setState({
            chapterName: e.target.value
        })
    }
    closeForm() {
        this.refs.addForm.style.display = "none";
        this.refs.opacity.style.display = "none";
    };
    closeChaper() {
        this.refs.addChapters.style.display = "none";
        this.refs.opacity.style.display = "none";
    }
    componentDidMount() {
        this.getCourses();
    };
    getCourses() {
        let that = this;
        let user = JSON.parse(window.localStorage.getItem("user"));
        let name = user.object.name;
        net.get("techerCourse", { name }, function (ob) {
            let dataSource = ob.data.object;
            that.setState({
                dataSource: dataSource
            })
        })
    };
    beforeUpload(file) {
        const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
        if (!isJpgOrPng) {
            message.error("You can only upload JPG/PNG file!");
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error("Image must smaller than 2MB!");
        }

        let fileList = this.state.fileList;

        if (fileList.length >= 1) {
            fileList.splice(0, 1, file);
        } else if (fileList.length == 0) {
            fileList.push(file)
        }
        this.setState({ fileList: fileList });
        return isJpgOrPng && isLt2M;
    };
    handleChangeimg = info => {
        if (info.file.status === "uploading") {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === "done") {
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false
                })
            );
        }
    };
    update() {
        let that = this;
        let id = this.state.currentCourse.id;
        let introduce = this.state.introduce;
        let name = this.state.name;
        let type = this.state.type;
        let fileList = this.state.fileList;
        net.uploadFile("courses/update", { id: id, introduce: introduce, name: name, files: fileList, courseType: type }, function (ob) {
            if (ob.code == 1) {
                message.success(ob.msg);
                that.getCourses();
                that.refs.addForm.style.display = "none";
                that.refs.opacity.style.display = "none";
            }
        })
    };
    delete(record) { 
        let that = this;
        let id = record.id;
        confirm({
            title: '提示',
            content: '确定删除吗？',
            onOk() {
                return net.get(
                    "courses/delete", { id: id },
                    function (res) {
                        console.log(res);
                        
                        message.success(res.msg);
                        that.getCourses();
                    }
                )
            },
            onCancel() { },
            okText: '确定',
            cancelText: '取消'
        })
    }
    render() {
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? "loading" : "plus"} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const { imageUrl } = this.state;

        return (
            <div className="setUpView">
                <div className="coursesAdd1">
                    <div className="basicTitle">课程信息</div>
                    <Button onClick={this.addForm.bind(this)} style={{ margin: '20px' }}>添加</Button>
                </div>
                <div className="basicBox">
                    <Table
                        bordered
                        rowKey={record => record.id}
                        className="table"
                        dataSource={this.state.dataSource}
                        columns={this.state.columns}
                        pagination={false}
                        scroll={{ y: 800 }}
                    />
                    <div className="opacity" ref="opacity"></div>
                    <div className="addChapters" ref="addChapters">
                        <div className="addTeacherTitle">课程章节添加</div>
                        <div className="flex">
                            <div>章节名称：</div>
                            <Input value={this.state.chapterName} onChange={this.onChangeChapters.bind(this)} className="input" />
                        </div>
                        <div className="button">
                            <Button onClick={this.addChaper.bind(this)}>提交</Button>
                            <Button type="primary" onClick={this.closeChaper.bind(this)}>
                                取消
            </Button>
                        </div>
                    </div>
                    <div className="addForm teacherForm" ref="addForm">
                        {
                            this.state.isAdd === true ? (<div className="addTeacherTitle">课程添加</div>) : (<div className="addTeacherTitle">课程修改</div>)
                        }
                        <Form
                            name="nest-messages"
                            {...layout}
                            style={{ marginTop: '10px' }}
                        >
                            <Form.Item name='name' label="课程名称" rules={[{ required: true }]}>
                                <Input ref="name" value={this.state.name} onChange={this.onChangeName.bind(this)} />
                            </Form.Item>
                            <Form.Item name='introduce' label="课程介绍" >
                                <Input ref="introduce" value={this.state.introduce} onChange={this.onChangeIntro.bind(this)} />
                            </Form.Item>
                            <Form.Item name="radio-button" label="课程类型">
                                <Radio.Group buttonStyle="solid" value={this.state.type} onChange={this.onChangeType.bind(this)}>
                                    <Radio.Button value={1}>编程语言</Radio.Button>
                                    <Radio.Button value={2}>前端开发</Radio.Button>
                                    <Radio.Button value={3}>后端开发</Radio.Button>
                                    <Radio.Button value={4}>移动开发</Radio.Button>
                                    <Radio.Button value={5}>网络安全</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item name="url" label="课程图片">
                                <Upload
                                    ref="uploadImg"
                                    name="avatar"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    showUploadList={false}
                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                    beforeUpload={this.beforeUpload.bind(this)}
                                    onChange={this.handleChangeimg}
                                >
                                    {imageUrl ? (
                                        <img src={imageUrl} alt="avatar" style={{ width: 70 }} />
                                    ) : (
                                            uploadButton
                                        )}
                                </Upload>
                            </Form.Item>
                            <Form.Item wrapperCol={{ span: 24, offset: 6 }}>
                                {this.state.isAdd === true ? (<Button type="primary" htmlType="submit" style={{ marginRight: 20 }} onClick={this.add.bind(this)}>
                                    保存
                                </Button>) : (<Button onClick={this.update.bind(this)}>提交更改</Button>)}

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