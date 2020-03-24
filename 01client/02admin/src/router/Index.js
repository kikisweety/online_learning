import React from "react";
import { Router, Route } from "react-router-dom";
import { createHashHistory } from "history";
import HomeView from "../views/home/HomeView";
import IndexView from "../views/index/index";
import LoginView from "../views/login/LoginView";
import RegisterView from "../views/register/RegisterView";
import StudentView from "../views/student/Index/StudentView";

const history = createHashHistory();

export default class Index extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Route path="/" component={IndexView} />
        <Route path="/home" component={HomeView} />
        <Route exact path="/login" component={LoginView} />
        <Route exact path="/register" component={RegisterView} />
        <Route path="/student" component={StudentView} />
      </Router>
    );
  }
}
