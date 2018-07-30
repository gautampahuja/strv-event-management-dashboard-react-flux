import React, { Component } from 'react';
import { Router, Route, hashHistory, Redirect, browserHistory, Link } from 'react-router';
import 'bootstrap/less/bootstrap.less';
import '../../styles/statusBar.less';
import Modal from 'react-bootstrap/lib/Modal'
import Button from 'react-bootstrap/lib/Button'
var profile_pic = '../../images/profile_pic.png';
var add = '../../images/add.png';
var exit = '../../images/exit.png';

var StatusBar = React.createClass({
    getInitialState: function () {
        return {
            showModal: false,
            showErrorMessage: false,
            title: null,
            date: null,
            capacity: 0,
            desc: null,
            message: "Please enter details in all fields"
        };
    },
    open: function () {
        this.setState({
            showModal: true
        });
    },
    close: function () {
        this.setState({
            showModal: false
        });
    },
    changeTitle: function (e) {
        this.setState({
            title: e.target.value
        });
    },

    changeDate: function (e) {
        this.setState({
            date: e.target.value
        });
    },
    changeCapacity: function (e) {
        this.setState({
            capacity: e.target.value
        });
    },

    changeDescription: function (e) {
        this.setState({
            desc: e.target.value
        });
    },

    save: function () {
        var today = new Date();
        var eventDate = new Date(this.state.date);
        var diff = eventDate - today;
        if(diff < 0){
            this.setState({
                showErrorMessage: true,
                message: "Please enter the event date of the future."
            });
        } else if (this.state.title == "" || this.state.date == "" || this.state.capacity == 0 || this.state.desc == "") {
            this.setState({
                showErrorMessage: true,
                message: "Please enter details in all fields."
            });
        } else {
            var d = new Date(this.state.date);
            var date = d.toISOString();
            var obj = {
                title: this.state.title,
                description: this.state.desc,
                startsAt: date,
                capacity: this.state.capacity
            };
            console.log(obj);
            this.props.createEvent(obj);
            this.close();
        }
    },

    _onFocus: function (e) {
        e.currentTarget.type = "date";
    },

    _onBlur: function (e) {
        e.currentTarget.type = "text";
        e.currentTarget.placeholder = "Date of the event";
    },

    logout: function () {
        location.reload();
    },

    goHome: function () {
        browserHistory.push('/Home');
    },
    render: function () {
        return (
            <div>
                {
                    this.props.user != null
                        ?
                        <div className="StatusBar">
                            <div onClick={this.goHome} className="home">Home</div>
                            <div onClick={this.open} className="add-new-event">
                                <img className="add-new-img" src={add} alt=""/>
                                New Event
                            </div>
                            <Link to="/profile">
                                <span>Welcome, </span>
                                <span className="StatusBar-welcomeMessage">{this.props.user.firstName}</span>
                                <img className="profile-image" src={profile_pic} alt=""/>
                            </Link>
                            <div onClick={this.logout} className="logout">
                                <img className="logout-img" src={exit} alt=""/>
                            </div>
                            <Modal show={this.state.showModal} onHide={this.close}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Create Event</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <form>
                                        <input type="text" autoComplete="off" onChange={this.changeTitle} name="title"
                                               placeholder="Title of the event" required="required"/>

                                        <input type="text" onFocus={this._onFocus} onBlur={this._onBlur}
                                               autoComplete="off" onChange={this.changeDate} name="date"
                                               placeholder="Date of the event" required="required"/>

                                        <input type="number" min="0" autoComplete="off" onChange={this.changeCapacity}
                                               name="capacity"
                                               placeholder="Capacity of the event (must be greater than 0)" required="required"/>

                                        <textarea autoComplete="off" type="text" onChange={this.changeDescription}
                                                  name="desciption"
                                                  placeholder="Description of the event" required="required"></textarea>

                                    </form>
                                </Modal.Body>
                                <Modal.Footer>
                                    {
                                        this.state.showErrorMessage
                                            ?
                                            <span className="error"> {this.state.message} </span>
                                            :
                                            ""
                                    }
                                    <Button className="btn btn-primary btn-block btn-large"
                                            onClick={this.save}>Save</Button>
                                    <Button className="btn btn-primary btn-block btn-large"
                                            onClick={this.close}>Close</Button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                        :
                        ""
                }
            </div>
        )
    }
});
module.exports = StatusBar;