import React, { Component } from 'react';
import { Router, Route, hashHistory, Redirect, browserHistory } from 'react-router';
import TableStore from '../stores/TableStore';
import TableActions from '../actions/TableActions';
import 'bootstrap/less/bootstrap.less';
import '../../styles/app.less';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Table from 'react-bootstrap/lib/Table';
import EventList from '../components/EventList';
import StatusBar from '../components/StatusBar';
import Login from '../components/Login';
var bgimg = '../../images/bg.jpg';
var logo = '../../images/strv_bigger.png';

var flag = true;

var App = React.createClass({
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
    },
    createEvent: function (obj) {
        TableActions.createEvent(obj);
    },
    render: function () {
        var user = this.state.user;
        return (
            <div id="wrapper">
                <StatusBar createEvent={this.createEvent} user={user}></StatusBar>
                <header id="header">
                    <span className="avatar"><img src={logo} alt=""/></span>
                    <h1><strong>EVENTS DASHBOARD</strong></h1>
                </header>
                {
                    this.props.children
                }
            </div>
        )
    }
});
module.exports = App;