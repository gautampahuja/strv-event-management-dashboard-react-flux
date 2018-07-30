import React, { Component } from 'react';
import { Router, Route, hashHistory, Redirect, browserHistory } from 'react-router';
import 'bootstrap/less/bootstrap.less';
import '../../styles/login.less';
var eventImg = '../../images/events.png';
import TableActions from '../actions/TableActions';

var Event = React.createClass({
    getInitialState: function () {
        return {
            join: true
        }
    },
    getDate: function (date) {
        var dateObj = new Date(Date.parse(date));
        return dateObj.toGMTString();
    },
    joinEvent: function (id, title) {
        this.setState({
            join: !this.state.join
        });
        var obj = {
            id: id,
            title: title
        };
        TableActions.attendEvent(obj);
    },
    unJoinEvent: function (id, title) {
        this.setState({
            join: !this.state.join
        });
        var obj = {
            id: id,
            title: title
        };
        TableActions.unAttendEvent(obj);

    },
    getValueByKey: function (key, data) {
        var i, len = data.length;

        for (i = 0; i < len; i++) {
            if (data[i] && data[i].hasOwnProperty(key)) {
                return data[i][key];
            }
        }

        return -1;
    },
    render: function () {
        var event = this.props.object;
        var attendees = event.attendees;
        var user = this.props.user;
        if (user != undefined && user.id == this.getValueByKey('id', attendees)) {
            this.state.join = true;
        } else{
            this.state.join = false;
        }
        return (
            <div>
                <div className="flip-container">
                    <div className="flipper">
                        <div className="front">
                            <img className="event-image" src={eventImg} alt=""/>
                        </div>
                        <div className="back">
                            <div className="event-details">
                                <h4>Owner:</h4>
                                <span className="owner">{event.owner.firstName} {event.owner.lastName}</span>
                                <br/>
                                <h4>Date:</h4>
                                <span className="date">{this.getDate(event.startsAt)}</span>
                                <br/>
                                <h4>Description:</h4>
                                <span className="description">{event.description}</span>
                                <br/>
                                <h4>Capacity:</h4>
                                <span className="capacity">{event.capacity}</span>
                                <div className="more-details">More Details</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="attend-event">
                    <h3>{event.title}</h3>
                    {
                        this.props.canJoin
                            ?
                            this.state.join
                                ?
                            <span onClick={this.unJoinEvent.bind(null, event.id, event.title)}
                                  className="join">UNJOIN</span>
                                :
                                <span onClick={this.joinEvent.bind(null, event.id, event.title)}
                                      className="unjoin">JOIN</span>
                            :
                            ""
                    }
                </div>
            </div>
        )
    }
});
module.exports = Event;