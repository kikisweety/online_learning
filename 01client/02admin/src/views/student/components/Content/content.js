import React from "react";
import { Layout } from "antd";
import "./content.css";
import { Route, Switch } from "react-router-dom";
import StudentIndex from "../Index/studentIndex";
import Courses from "../Courses/courses";
import Questions from "../Questions/questions";
import Books from "../Books/books";
import UserCenter from "../User/user"

const { Content } = Layout;
export default class SContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <Content className="sContentBox">
                <Switch>
                    <Route
                        path={"/student/index"}
                        component={StudentIndex} />
                    <Route
                        path={"/student/courses"}
                        component={Courses} />
                    <Route
                        path={"/student/questions"}
                        component={Questions} />
                    <Route
                        path={"/student/books"}
                        component={Books} />
                    <Route
                        path={"/student/userCenter"}
                        component={UserCenter} />
                </Switch>
            </Content>
        );
    }
}