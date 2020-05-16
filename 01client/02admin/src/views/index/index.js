import React from "react";
import { Redirect } from "react-router-dom";
export default class Index extends React.Component {
  render() {
    return localStorage.getItem("user") === null ? (
      <Redirect to="/login" />
    ) : (
        JSON.parse(window.localStorage.getItem("user")).object.userRole.roleId ===1  ? (<Redirect to="/home/courses/add" />) : (<Redirect to="/student/index" />)
    ) 
  }
}
