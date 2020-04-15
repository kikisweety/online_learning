import React from "react";
import { Layout, Icon } from "antd";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import toggleAction from "../../redux/actions/sider";
import "./Header.css";
const { Header } = Layout;
class MyHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      userList:{}
    }
  }
  componentDidMount() { 
    // console.log(JSON.parse(window.localStorage.getItem("user")));
    let userList = JSON.parse(window.localStorage.getItem("user"));
    this.setState({
      userList: userList,
      userName:userList.loginName
    });
  }
  eixtLogin = () => {
    console.log(this);
  }
  render() {
    return (
      <Header className="headBox">
        <div className="titleBox">
          <Icon
            className="icon"
            onClick={this.props.toggleCollapsed}
            type={this.props.collapsed ? "menu-unfold" : "menu-fold"}
          />
        </div>
        <div className="titleBoxRight">
          <img src="/imgs/user.png"></img>
          <span>您好，{this.state.userName}</span>
          <Link to = "/login">
            <div className = "eixtLogin" onClick = {this.eixtLogin}>
            退出登录<Icon type="logout" />
          </div>
          </Link>
        </div>
      </Header>
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
// Connect component
const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(MyHeader);

export default App;
