import React, { Component } from 'react';
import { Router, Route, hashHistory, Redirect, browserHistory } from 'react-router';
import 'bootstrap/less/bootstrap.less';
import '../../styles/login.less';
import TableStore from '../stores/TableStore';
import TableActions from '../actions/TableActions';
var eventImg = '../../images/events.png';

var Login = React.createClass({
    getInitialState: function () {
        return TableStore.getState();
    },

    componentDidMount: function () {
        TableStore.listen(this.onChange);
    },

    componentWillUnmount: function () {
        TableStore.unlisten(this.onChange);
    },

    onChange: function () {
        this.setState(this.getInitialState());
        if(this.state.authorizedUser)
            browserHistory.push('/Home');
    },

    changeUsername: function (e) {
        this.setState({
            userName: e.target.value
        });
    },

    changePassword: function (e) {
        this.setState({
            passWord: e.target.value
        });
    },

    submitForm: function (e) {
        e.preventDefault();
        this.setState({
            showLoader: true
        });
        var obj = {
            username: this.state.userName,
            password: this.state.passWord
        };
        TableActions.authorizeUser(obj);
    },

    render: function () {
        return (
            <div className="login-container">
                <div className="login">
                    <form>
                        <input type="text" autoComplete="off" onChange={this.changeUsername} name="username"
                               placeholder="Username" required="required"/>
                        <input type="password" autoComplete="off" onChange={this.changePassword} name="password"
                               placeholder="Password" required="required"/>
                        {
                            this.state.showErrorMessage
                            ?
                                <span className="error"> Invalid Username or Password </span>
                                :
                                ""
                        }
                        <button type="submit" onClick={this.submitForm} className="btn btn-primary btn-block btn-large">
                            Let me in.
                        </button>
                    </form>
                </div>
            </div>
        )
    }
});
module.exports = Login;