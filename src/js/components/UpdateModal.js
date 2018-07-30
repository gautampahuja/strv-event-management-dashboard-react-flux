import React, { Component } from 'react';
import { Router, Route, hashHistory, Redirect, browserHistory, Link } from 'react-router';
import 'bootstrap/less/bootstrap.less';
import '../../styles/statusBar.less';
import Modal from 'react-bootstrap/lib/Modal'
import Button from 'react-bootstrap/lib/Button'
var profile_pic = '../../images/profile_pic.png';
var add = '../../images/add.png';

var UpdateModal = React.createClass({
    getInitialState: function () {
        return {
            showErrorMessage: false,
            title: this.props.details.title,
            date: this.props.details.startsAt,
            capacity: this.props.details.capacity,
            desc: this.props.details.description,
            message: "Please enter details in all fields"
        };
    },
    componentWillReceiveProps: function(nextProps) {
        this.setState({
            title: this.props.details.title,
            date: this.props.details.startsAt,
            capacity: this.props.details.capacity,
            desc: this.props.details.description
        })
    },
    close: function () {
        this.props.hideUpdateModal();
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
                capacity: this.state.capacity,
                id: this.props.details.id
            };
            console.log(obj);
            this.props.updateEvent(obj);
            this.close();
        }
    },

    getDate: function (date) {
        var dateObj = new Date(date);
        var day = dateObj.getDate();
        var month = dateObj.getMonth() + 1;
        var year = dateObj.getFullYear();
        if (month < 10) month = "0" + month;
        if (day < 10) day = "0" + day;
        return year + "-" + month + "-" + day;
    },

    render: function () {
        return (
            <div>
                <Modal show={this.props.showUpdateModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Event</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <input type="text" autoComplete="off" value={this.state.title} onChange={this.changeTitle}
                                   name="title"
                                   placeholder="Title of the event" required="required"/>

                            <input type="text" value={this.getDate(this.state.date)}
                                   autoComplete="off" onChange={this.changeDate} name="date"
                                   placeholder="Date of the event" required="required"/>

                            <input type="number" min="0" autoComplete="off" onChange={this.changeCapacity}
                                   name="capacity" value={this.state.capacity}
                                   placeholder="Capacity of the event (must be greater than 0)" required="required"/>

                            <textarea autoComplete="off" type="text" onChange={this.changeDescription}
                                      name="desciption" value={this.state.desc}
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
        )
    }
});
module.exports = UpdateModal;