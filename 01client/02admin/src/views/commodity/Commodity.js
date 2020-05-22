import React from "react";
import "./Commodity.css";
import net from "../../utils/net";
import {
    Button, Table, Upload, Input, message,Modal, Icon, Form, InputNumber
} from "antd";
const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
};
const { confirm } = Modal;
function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
}
export default class Commodity extends React.Component {
    constructor() {
        super();
        this.state = {
            fileList: [],
            fileList1: [],
            loading: false,
            isLoading: false,
            commodityName: '',
            commodityPrice: null,
            amount: null,
            searchName: '',
            isAdd: true,
            currentCommodity:[],
            columns: [
                {
                    title: '商品名称',
                    dataIndex: 'commodityName',
                    key: 'commodityName',
                    width: 200,
                    render: text => <a>{text}</a>,
                },
                {
                    title: '商品图片',
                    dataIndex: 'url',
                    key: 'url',
                    width: 200,
                    render: text => { 
                        return <div style={{ overflow: 'hidden',whiteSpace: 'nowrap',textOverflow:'ellipsis'}}>{text}</div>
                    }
                },
                {
                    title: '价格',
                    dataIndex: 'commodityPrice',
                    key: 'commodityPrice',
                    width: 200,
                    render: text => {
                        return <div>{text}元</div>
                    }
                },
                {
                    title: '库存',
                    dataIndex: 'amount',
                    key: 'amount',
                    width: 200,
                },
                {
                    title: '商品详情',
                    dataIndex: 'commodityDetails',
                    key: 'commodityDetails',
                    width: 200,
                    render: text => {
                        return <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{text}</div>
                    }
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 200,
                    render: (text, record) => {
                        return (
                            <div>
                                <Button style={{ marginRight: 10, background: "#43BB60", color: 'white' }} onClick={this.edit.bind(this,record)}>修改</Button>
                                <Button type="danger" style={{ color: 'white' }} onClick={this.delete.bind(this, record)}>删除</Button>
                            </div>
                        )
                    }
                }
            ],
            allCommodity: []
        };
    }
    displayAddForm() {
        this.setState({
            isAdd:true,
            commodityName: '',
            commodityPrice: null,
            amount: '',
            imageUrl: '',
            imageUrl1:''
        })
        this.refs.commodityForm.style.display = "block";
        this.refs.opacity.style.display = "block";
    }
    closeForm() {
        this.refs.commodityForm.style.display = "none"
        this.refs.opacity.style.display = "none";
    }
    beforeUpload(file) {
        const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
        if (!isJpgOrPng) {
            message.error("你只能传图片格式为JPG/PNG!");
        }
        let fileList = this.state.fileList;
        fileList.push(file);
        this.setState({ fileList: fileList });
        return isJpgOrPng;
    }
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
    beforeUpload1(file) {
        const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
        if (!isJpgOrPng) {
            message.error("你只能传图片格式为JPG/PNG!");
        }
        let fileList = this.state.fileList;
        fileList.push(file);
        this.setState({ fileList: fileList });
        return isJpgOrPng;
    }
    handleChangeimg1 = info => {
        if (info.file.status === "uploading") {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === "done") {
            getBase64(info.file.originFileObj, imageUrl1 =>
                this.setState({
                    imageUrl1,
                    loading: false
                })
            );
        }
    };
    uploadDetail(file) {
        let fileList = this.state.fileList;
        fileList.push(file);
        this.setState({ fileList: fileList });
    };
    changeImg(info) { 
    }
    handlePrice(e) { 
        this.setState({
            commodityPrice:e
        })
    };
    handleAmount(e) {
        this.setState({
            amount: e
        })
    };
    upload() {
        let commodityName = this.refs.inputName.state.value;
        let commodityPrice = this.state.commodityPrice;
        let amount = this.state.amount;
        let fileList = this.state.fileList;
        let that = this;
        net.uploadFile("commodity/insert", { commodityName: commodityName , commodityPrice:commodityPrice, amount:amount, files: fileList},
            function (ob) {
                if (ob.code==1) {
                    that.refs.commodityForm.style.display = "none";
                    that.refs.opacity.style.display = "none";
                    message.success("添加商品成功！！");
                    that.getCommodity();
                }
        })
    };
    componentDidMount() {
        this.getCommodity();
    };
    getCommodity() {
        let that = this;
        net.get("commodity/All", {},function (ob) {
            let allCommodity = ob.data.object;
            that.setState({ allCommodity: allCommodity });
        })
    };
    onChangeName(e) { 
        this.setState({
            commodityName:e.target.value
        })
    };
    edit(record) {
        console.log(record);
        let commodityName = record.commodityName;
        let amount = record.amount;
        let commodityPrice = record.commodityPrice;
        let imageUrl = record.url;
        let imageUrl1 = record.commodityDetails;
        this.setState({
            isAdd: false,
            commodityName: commodityName,
            amount: amount,
            commodityPrice: commodityPrice,
            imageUrl: imageUrl,
            imageUrl1:imageUrl1,
            currentCommodity: record
        });
        this.refs.commodityForm.style.display = "block";
        this.refs.opacity.style.display = "block";
     };
    update() {
        let that = this;
        let commodityName = this.state.commodityName;
        let commodityPrice = this.state.commodityPrice;
        let amount = this.state.amount;
        let fileList = this.state.fileList;
        let id = this.state.currentCommodity.id;
        net.uploadFile("commodity/update", {
            id: id,
            commodityName: commodityName,
            commodityPrice: commodityPrice,
            amount:amount,
            files:fileList
        }, function (ob) {
            if (ob.code==1) {
                message.success(ob.msg);
                that.refs.commodityForm.style.display = "none";
                that.refs.opacity.style.display = "none";
                that.getCommodity();
            }
            
        })
     }
    delete(record) {
        let that = this;
        let id = record.id;
        confirm({
            title: '提示',
            content: '确定删除吗？',
            onOk() {
                return net.get(
                    "commodity/delete", { id: id },
                    function (res) {
                        that.getCommodity();
                    }
                )
            },
            onCancel() { },
            okText: '确定',
            cancelText: '取消'
        })
    };
    changeSearch(e) {
        this.setState({
            searchName: e.target.value
        })
    };
    onSearch() {
        let that = this;
        let name = this.state.searchName;
        net.post("commodity/byName", { commodityName:name }, function (ob) {
            that.setState({
                allCommodity: ob.object
            })
        })
    };
    onReset() {
        this.setState({
            searchName: ''
        })
        this.getCommodity();
    };

    render() {
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? "loading" : "plus"} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const { imageUrl } = this.state;
        const uploadButton1 = (
            <div>
                <Icon type={this.state.loading ? "loading" : "plus"} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const { imageUrl1 } = this.state;
        return (
            <div className="addView">
                <div className="addCourseList" ref="box">
                    <div className="opacity" ref="opacity"></div>
                    <div className="addCourseTitle">
                        <span>商品信息</span>
                        <Button
                            type="primary"
                            style={{ background: "#43BB60" }}
                            onClick={this.displayAddForm.bind(this)}
                        >添加商品</Button>
                    </div>
                    <div className="BankSeletBox" style={{ margin: '10px', padding: '0px' }}>
                        <div className="left-Select">
                            <div style={{ fontSize: '14px' }}>用户查询</div>
                            <Input
                                placeholder="请输入用户名关键字"
                                allowClear
                                value={this.state.searchName} onChange={this.changeSearch.bind(this)}
                                style={{ width: '70%', marginRight: '5px' }}
                            />
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
                    <Table
                        bordered
                        rowKey={record => record.id}
                        columns={this.state.columns}
                        dataSource={this.state.allCommodity}
                        style={{ width: "100%", height: 500, margin: "10px auto" }}
                        pagination={{ pageSize: 8 }}
                        scroll={{ y: 500 }}
                    ></Table>
                </div>
                {/* 商品添加 */}
                <div className="addForm" ref="commodityForm">
                    {this.state.isAdd == true ? (<div className="addTeacherTitle">商品添加</div>) : (<div className="addTeacherTitle">商品修改</div>)}
                    <Form
                        name="nest-messages"
                        {...layout}
                        style={{ width: '100%', marginTop: 20 }}>
                        <Form.Item name={['commodity_name']} label="商品名称：" rules={[{ required: true }]}>
                            <Input value={this.state.commodityName} onChange={this.onChangeName.bind(this)} placeholder="请输入商品名称" ref="inputName" />
                        </Form.Item>
                        <Form.Item name={['url']} label="商品图片：">
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
                        <Form.Item name={['commodity_price']} label="价格：" rules={[{ type: 'number', min: 0, max: 99 }]}>
                            <InputNumber value={this.state.commodityPrice} onChange={this.handlePrice.bind(this)}/>
                        </Form.Item>
                        <Form.Item name={['amount']} label="库存：">
                            <InputNumber value={this.state.amount} onChange={this.handleAmount.bind(this)}/>
                        </Form.Item>
                        <Form.Item name={['commodity_detail']} label="商品详情：">
                            <Upload
                                ref="uploadImg1"
                                name="avatar1"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                beforeUpload={this.beforeUpload1.bind(this)}
                                onChange={this.handleChangeimg1}
                            >
                                {imageUrl1 ? (
                                    <img src={imageUrl1} alt="avatar" style={{ width: 70,height:70 }} />
                                ) : (
                                        uploadButton1
                                    )}
                            </Upload>
                        </Form.Item>
                        <Form.Item name="button" className="formButton" style={{ margin:'auto'}}>
                            {this.state.isAdd == true ? (<Button type="primary" style={{ marginRight: 20 }} onClick={this.upload.bind(this)}>保存</Button>) : (<Button type="primary" style={{ marginRight: 20 }} onClick={this.update.bind(this)}>提交修改</Button>)}
                            <Button type="primary"
                                onClick={this.closeForm.bind(this)}
                            >
                                取消
            </Button>
                        </Form.Item>
                    </Form>
                    <div className="button">
                    </div>
                </div>
            </div>
        );
    }
}
