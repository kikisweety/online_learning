import React from "react";
import { Menu, Icon, Layout } from "antd";
import "./Sider.css";
import { Link } from "react-router-dom";
import toggleAction from "../../redux/actions/sider";
import { connect } from "react-redux";
const { SubMenu } = Menu;
const { Sider } = Layout;
class MySider extends React.Component {
  // constructor(props) {
  //   super(props)
  //   this.state = { SelectedKeys: "sub11" }
  // }
  // componentWillMount() {
  //   if (this.props.history.location.pathname == "/home/courses/add") {
  //     this.setState({ SelectedKeys: "sub11" })
  //   } else if (this.props.history.location.pathname == "/home/courses/list") {
  //     this.setState({ SelectedKeys: "sub12" })
  //   } else if (this.props.history.location.pathname == "/home/examination/add") {
  //     this.setState({ SelectedKeys: "sub21" })
  //   } else if (this.props.history.location.pathname == "/home/examination/query") {
  //     this.setState({ SelectedKeys: "sub22" })
  //   } else if (this.props.history.location.pathname == "/home/teacher/add") {
  //     this.setState({ SelectedKeys: "sub31" })
  //   } else if (this.props.history.location.pathname == "/home/teacher/query") {
  //     this.setState({ SelectedKeys: "sub32" })
  //   } 
  //   }
    // console.log(this.state)
  onCollapse() {}
  render() {
    return (
      <div className="siderBox">
        <div className="headView">在线教育后台管理</div>
        <Sider
          className="sider"
          trigger={null}
          collapsible
          collapsed={this.props.collapsed}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={"sub11"}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
          >
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="play-circle" />
                  <span>课程管理</span>
                </span>
              }
            >
              <Menu.Item key="sub11">
                <Link to={"/home/courses/add"}>
                  <Icon type="pie-chart" />
                  <span> 课程添加 </span>
                </Link>
              </Menu.Item>

              <Menu.Item key="sub12">
                <Link to={"/home/courses/list"}>
                  <Icon type="pie-chart" />
                  <span> 课程列表 </span>
                </Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={
                <span>
                  <Icon type="edit" />
                  <span>题库管理</span>
                </span>
              }
            >
              <Menu.Item key="sub21">
                <Link to={"/home/examination/add"}>
                  <Icon type="pie-chart" />
                  <span> 试题添加 </span>
                </Link>
              </Menu.Item>

              <Menu.Item key="sub22">
                <Link to={"/home/examination/query"}>
                  <Icon type="pie-chart" />
                  <span> 试题查询 </span>
                </Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub3"
              title={
                <span>
                  <Icon type="user" />
                  <span>老师管理</span>
                </span>
              }
            >
              <Menu.Item key="sub31">
                <Link to={"/home/teacher/add"}>
                  <Icon type="pie-chart" />
                  <span> 老师添加 </span>
                </Link>
              </Menu.Item>

              <Menu.Item key="sub32">
                <Link to={"/home/teacher/query"}>
                  <Icon type="pie-chart" />
                  <span> 老师列表 </span>
                </Link>
              </Menu.Item>
            </SubMenu>

            <SubMenu
              key="sub4"
              title={
                <span>
                  <Icon type="user" />
                  <span>用户管理</span>
                </span>
              }
            >
              <Menu.Item key="sub41">
                <Link to={"/home/teacher/add"}>
                  <Icon type="pie-chart" />
                  <span> 用户信息 </span>
                </Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub5"
              title={
                <span>
                  <Icon type="user" />
                  <span>订单管理</span>
                </span>
              }
            >
              <Menu.Item key="sub51">
                <Link to={"/home/teacher/add"}>
                  <Icon type="pie-chart" />
                  <span> 订单信息 </span>
                </Link>
              </Menu.Item>

            </SubMenu>
            <SubMenu
              key="sub6"
              title={
                <span>
                  <Icon type="user" />
                  <span>商品管理</span>
                </span>
              }
            >
              <Menu.Item key="sub61">
                <Link to={"/home/teacher/query"}>
                  <Icon type="pie-chart" />
                  <span> 商品信息 </span>
                </Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    collapsed: state.sider.collapsed
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    toggleCollapsed: () => {
      dispatch(toggleAction);
    }
  };
};
const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(MySider);

export default App;
