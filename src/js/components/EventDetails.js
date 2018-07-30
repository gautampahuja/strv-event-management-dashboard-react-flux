import React, { Component } from 'react';
import { Router, Route, hashHistory, Redirect, Link, browserHistory } from 'react-router';
import 'bootstrap/less/bootstrap.less';
import '../../styles/eventDetails.less';
import TableStore from '../stores/TableStore';
import TableActions from '../actions/TableActions';
import Button from 'react-bootstrap/lib/Button'
import UpdateModal from '../components/UpdateModal';

var EventDetails = React.createClass({
    getInitialState: function () {
        return TableStore.getState();
    },
    componentDidMount: function () {
        if (!this.state.authorizedUser)
            browserHistory.push('/');
        TableStore.listen(this.onChange);
    },
    componentWillUnmount: function () {
        TableStore.unlisten(this.onChange);
    },
    onChange: function () {
        this.setState(this.getInitialState());
    },
    getDate: function (date) {
        var dateObj = new Date(Date.parse(date));
        return dateObj.toGMTString();
    },
    attend: function (id, title) {
        var obj = {
            title: title,
            id: id
        };
        TableActions.attendEvent(obj);
    },
    unAttend: function (id, title) {
        var obj = {
            title: title,
            id: id
        };
        TableActions.unAttendEvent(obj);
    },
    showUpdateModal: function () {
        TableActions.showUpdateModal();
    },
    hideUpdateModal: function () {
        TableActions.hideUpdateModal();
    },
    deleteEvent: function (id) {
        TableActions.deleteEvent(id);
        browserHistory.push('/Home');
    },
    updateEvent: function (obj) {
        TableActions.updateEvent(obj);
    },
    render: function () {
        var details = this.state.eventDetails;
        var user = this.state.user;
        var date = new Date();
        if (details != null) {
            var attendees = details.attendees;
            var eventStartDate = new Date(details.startsAt);
            return (
                <div className="event-detail-container">
                    <h1 className="title">{details.title}</h1>

                    <div className="desc-container">
                        <h3 className="left-head">Description: </h3><span
                        className="desc-txt">{details.description}</span><br/>

                        <h3 className="left-head">OWNER: </h3><span
                        className="right-txt">{details.owner.firstName + " " + details.owner.lastName}</span><br/>

                        <h3 className="left-head">DATE: </h3><span
                        className="right-txt">{this.getDate(details.startsAt)}</span><br/>

                        <h3 className="left-head">CAPACITY: </h3><span
                        className="right-txt">{details.capacity}</span><br/>

                        <h3 className="left-head">Total Attendees: </h3><span
                        className="right-txt">{attendees.length}</span><br/>
                        <ul>
                            <h3 className="left-head">ATTENDEES</h3>
                            {
                                attendees.map(function (object, i) {
                                    return (
                                        <li className="attendees-list"
                                            key={i}>{object.firstName + " " + object.lastName}</li>
                                    )
                                })
                            }
                        </ul>
                        {
                            eventStartDate - date > 0
                            ?
                                <div className="button-container">
                                    {
                                        this.state.attendEvent
                                            ?
                                            <Button className="btn btn-primary btn-block btn-large"
                                                    onClick={this.attend.bind(null, details.id, details.title)}>ATTEND EVENT</Button>
                                            :
                                            <Button className="btn btn-primary btn-block btn-large"
                                                    onClick={this.unAttend.bind(null, details.id, details.title)}>UNATTEND EVENT</Button>
                                    }
                                    {
                                        user.id == details.owner.id
                                            ?
                                            <div className="user-buttons">
                                                <Button className="btn btn-primary btn-block btn-large"
                                                        onClick={this.showUpdateModal}>UPDATE EVENT</Button>
                                                <Button className="btn btn-primary btn-block btn-large"
                                                        onClick={this.deleteEvent.bind(null, details.id)}>DELETE EVENT</Button>
                                            </div>
                                            :
                                            ""
                                    }
                                </div>
                                :
                                ""
                        }
                    </div>
                    <UpdateModal updateEvent={this.updateEvent} details={details} hideUpdateModal={this.hideUpdateModal}
                                 showUpdateModal={this.state.showUpdateModal}></UpdateModal>
                </div>
            )
        } else {
            return null;
        }
    }
});
module.exports = EventDetails;