import React from "react";
import { Redirect } from "react-router-dom";
export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user:null
    }
  }
  componentDidMount() { 
    let user = JSON.parse(window.localStorage.getItem("user"));
    console.log(user);
    let that = this;
    if (user) {
      that.setState({
        user:user.object
      })
    }
  }
  render() {
    return this.state.user === null ? (
      <Redirect to="/login" />
    ) : (
        // <Redirect to="/login" />
        this.state.user.userRole.roleId ===1  ? (<Redirect to="/home/courses/add" />) : (<Redirect to="/student/index" />)
    ) 
  }
}
