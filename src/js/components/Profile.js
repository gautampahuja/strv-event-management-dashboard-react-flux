import React, { Component } from 'react';
import { Router, Route, hashHistory, Redirect, Link, browserHistory } from 'react-router';
import 'bootstrap/less/bootstrap.less';
import '../../styles/profile.less';
import TableStore from '../stores/TableStore';
import TableActions from '../actions/TableActions';
var profile = '../../images/profile.png';

var Profile = React.createClass({
    getInitialState: function () {
        return TableStore.getState();
    },
    componentDidMount: function () {
        if(!this.state.authorizedUser)
            browserHistory.push('/');
        TableStore.listen(this.onChange);
    },
    componentWillUnmount: function () {
        TableStore.unlisten(this.onChange);
    },
    onChange: function () {
        this.setState(this.getInitialState());
    },
    render: function () {
        var user = this.state.user;
        var eventsAttending = this.state.eventsAttending;
        return (
            user != null
                ?
                <div className="login-container">
                    <figure className="profile-container">
                        <img
                            src={profile}
                            alt="profile-sample1"
                            className="background"/>
                        <img
                            src={profile}
                            alt="profile-sample1"
                            className="profile"/>
                        <figcaption>
                            <h3>{user.firstName + " " + user.lastName}<span>{user.email}</span></h3>
                        </figcaption>
                    </figure>
                    <br/>

                    <div className="events-list">
                        <h1>EVENTS ATTENDING</h1>
                        {
                            eventsAttending.length > 0
                                ?
                                <div>
                                    <ul className="list">
                                        {
                                            eventsAttending.map(function (object, i) {
                                                return (
                                                    <li key={i} className="event-name">{eventsAttending[i]}</li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                                :
                                <span>No Events to attend</span>
                        }
                    </div>
                </div>
                :
                <div className="login-error"><span>Please<Link to="/"><h1>Sign in</h1></Link></span></div>
        )
    }
});
module.exports = Profile;