import React, { Component } from 'react';
import { Router, Route, hashHistory, Redirect, browserHistory } from 'react-router';
import 'bootstrap/less/bootstrap.less';
import '../../styles/app.less';
import Event from '../components/Event';
var eventImg = '../../images/events.png';

var EventList = React.createClass({
    getInitialState: function () {
        return {
            status: ""
        }
    },

    componentDidMount: function () {
        var self = this.props;
        setTimeout(function () {
            console.log('in componentDidMount');
            if(self.user!=null)
                self.showEvents();
        }, 0);
    },

    clickEvent: function (id) {
        this.props.showEventDetails(id);
    },

    render: function () {
        var self = this;
        var upcomingEvents = this.props.upcomingEvents;
        var pastEvents = this.props.pastEvents;
        return (
            <div className="events-list">
                <div className="upcoming-container">
                    <h1>UPCOMING EVENTS</h1>
                    {
                        upcomingEvents != null
                            ?
                            upcomingEvents.map(function (object, i) {
                                return (
                                    <a key={i} className="event" onClick={self.clickEvent.bind(null, object.id )}>
                                        <Event user={self.props.user} canJoin={true} object={object}></Event>
                                    </a>
                                )
                            })
                            :
                            ""
                    }
                </div>
                <div className="past-container">
                    <h1>PAST EVENTS</h1>
                    {
                        pastEvents != null
                            ?
                            pastEvents.map(function (object, i) {
                                return (
                                    <a key={i} className="event" onClick={self.clickEvent.bind(null, object.id )}>
                                        <Event canJoin={false} object={object}></Event>
                                    </a>
                                )
                            })
                            :
                            ""
                    }
                </div>
            </div>
        )
    }
});
module.exports = EventList;