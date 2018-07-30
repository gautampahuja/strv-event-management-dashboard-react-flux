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
var showEvent = false;

var Home = React.createClass({
    getInitialState: function () {
        return TableStore.getState();
    },
    componentDidMount: function () {
        TableStore.listen(this.onChange);
        if(!this.state.authorizedUser)
            browserHistory.push('/');
    },
    componentWillUnmount: function () {
        TableStore.unlisten(this.onChange);
    },
    onChange: function () {
        this.setState(this.getInitialState());
        if(this.state.eventDetails!=null && showEvent){
            showEvent = false;
            browserHistory.push('/EventDetails');
        }
    },
    showEvents: function () {
        TableActions.getEvents();
    },
    showEventDetails: function (id) {
        showEvent = true;
        TableActions.showEventDetails(id);
    },
    render: function () {
        var upcomingEvents = this.state.upcomingEvents;
        var pastEvents = this.state.pastEvents;
        var user = this.state.user;
        return (
            <section id="main">
                <section className="thumbnails">
                    <div className="new-list">
                        <EventList showEventDetails={this.showEventDetails} user={user} showEvents={this.showEvents} pastEvents={pastEvents} upcomingEvents={upcomingEvents}></EventList>
                    </div>
                </section>
            </section>
        )
    }
});
module.exports = Home;