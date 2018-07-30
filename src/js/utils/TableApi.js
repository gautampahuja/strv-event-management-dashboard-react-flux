var TableActions = require('../actions/TableActions');
var token = null;

module.exports = {
    getEvents: function () {
        var request = new XMLHttpRequest();
        request.open('GET', 'https://testproject-api.strv.com/events');
        request.onreadystatechange = function () {
            if (this.readyState === 4) {
                TableActions.recieveEvents(JSON.parse(this.responseText));
            }
        };

        request.send();
    },

    checkUserAuthorization: function (username, password) {
        var request = new XMLHttpRequest();
        request.open('POST', 'https://testproject-api.strv.com/auth/native');
        request.setRequestHeader('Content-Type', 'application/json');
        request.onreadystatechange = function () {
            if (this.readyState === 4) {
                token = this.getResponseHeader('Authorization');
                TableActions.userAuthResponse(JSON.parse(this.responseText));
            }
        };
        var body = {
            'email': username,
            'password': password
        };
        request.send(JSON.stringify(body));
    },

    attendEvent: function (id) {
        var request = new XMLHttpRequest();
        request.open('POST', 'https://testproject-api.strv.com/events/' + id + '/attendees/me');
        request.setRequestHeader('Authorization', token);
        request.onreadystatechange = function () {
            if (this.readyState === 4) {
                TableActions.attendEventResponse(JSON.parse(this.responseText));
            }
        };
        request.send();
    },

    unAttendEvent: function (id) {
        var request = new XMLHttpRequest();
        request.open('DELETE', 'https://testproject-api.strv.com/events/' + id + '/attendees/me');
        request.setRequestHeader('Authorization', token);
        request.onreadystatechange = function () {
            if (this.readyState === 4 && this.responseText != null) {
                TableActions.unAttendEventResponse(JSON.parse(this.responseText));
            }
        };
        request.send();
    },

    createEvent: function (obj) {
        var request = new XMLHttpRequest();
        request.open('POST', 'https://testproject-api.strv.com/events');
        request.setRequestHeader('Content-Type', 'application/json');
        request.setRequestHeader('Authorization', token);
        request.onreadystatechange = function () {
            if (this.readyState === 4) {
                TableActions.createEventResponse(JSON.parse(this.responseText));
            }
        };
        request.send(JSON.stringify(obj));

    },

    updateEvent: function (obj) {
        var request = new XMLHttpRequest();
        var id = obj.id;
        delete obj.id;
        request.open('PATCH', 'https://testproject-api.strv.com/events/' + id);
        request.setRequestHeader('Content-Type', 'application/json');
        request.setRequestHeader('Authorization', token);
        request.onreadystatechange = function () {
            if (this.readyState === 4 && this.responseText != null) {
                TableActions.updateEventResponse(JSON.parse(this.responseText));
            }
        };
        request.send(JSON.stringify(obj));
    },

    deleteEvent: function (id) {
        var request = new XMLHttpRequest();
        request.open('DELETE', 'https://testproject-api.strv.com/events/' + id);
        request.setRequestHeader('Authorization', token);
        request.onreadystatechange = function () {
            if (this.readyState === 4) {
                TableActions.deleteEventResponse(true);
            }
        };
        request.send();
    },

    showEventDetails: function (id) {
        var request = new XMLHttpRequest();
        request.open('GET', 'https://testproject-api.strv.com/events/' + id);
        request.setRequestHeader('Authorization', token);
        request.onreadystatechange = function () {
            if (this.readyState === 4) {
                TableActions.showEventDetailsResponse(JSON.parse(this.responseText));
            }
        };
        request.send();
    }
};
