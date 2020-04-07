import React from "react";
// import "./userRight.css";
import { Route, Switch } from "react-router-dom";
import UserInfo from "../userInfo/userInfo";
import MyOrder from "../myOrder/myOrder";
import DressManage from "../dressManage/dressManage"
export default class UserRight extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className="userRight">
                <Switch>
                    <Route
                        // exact
                        path={"/student/userCenter/userInfo"}
                        component={UserInfo} />
                    <Route
                        // exact
                        path={"/student/userCenter/myOrder"}
                        component={MyOrder} />
                    <Route
                        // exact
                        path={"/student/userCenter/dressManage"}
                        component={DressManage} />
                </Switch>
            </div>
        );
    }
}