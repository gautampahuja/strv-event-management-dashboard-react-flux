var TableActions = require('../actions/TableActions');
var alt = require('../alt');
var TableApi = require('../utils/TableApi');

class TableStore {
    constructor() {
        this.bindActions(TableActions);
        this.events = null;
        this.authorizedUser = false;
        this.user = null;
        this.showErrorMessage = false;
        this.eventsAttending = [];
        this.pastEvents = [];
        this.upcomingEvents = [];
        this.userName = null;
        this.passWord = null;
        this.showLoader = false;
        this.eventDetails = null;
        this.showUpdateModal = false;
        this.refreshEventsList = false;
        this.attendEvent = false;
    }

    onGetEvents() {
        if (this.events == null || this.refreshEventsList){
            this.refreshEventsList = false;
            TableApi.getEvents();
        }
    }

    onRecieveEvents(data) {
        console.log(data);
        this.events = data;
        this.updateEventslist();
    }

    updateEventslist(){
        var date = new Date();
        this.pastEvents = [];
        this.upcomingEvents = [];
        if (this.user != null) {
            console.log(this.user);
            var userId = this.user._id;
            this.eventsAttending = [];
            var attendees;
            var startsAt;
            for (var i = 0; i < this.events.length; i++) {
                startsAt = new Date(this.events[i].startsAt);
                var diff = startsAt - date;
                if (diff > 0) {
                    attendees = this.events[i].attendees;
                    if (attendees.length > 0) {
                        for (var j = 0; j < attendees.length; j++) {
                            if (attendees[j]._id == userId) {
                                this.eventsAttending.push(this.events[i].title);
                            }
                        }
                    }
                    this.upcomingEvents.push(this.events[i]);
                } else {
                    this.pastEvents.push(this.events[i]);
                }
            }
        }
    }

    onAuthorizeUser(obj) {
        TableApi.checkUserAuthorization(obj.username, obj.password);
    }

    onUserAuthResponse(data) {
        if (!data.error) {
            this.user = data;
            this.authorizedUser = true;
        }
        else {
            this.showErrorMessage = true;
        }
    }

    onAttendEvent(obj) {
        this.eventsAttending.push(obj.title);
        TableApi.attendEvent(obj.id);
    }

    onAttendEventResponse(data) {
        console.log(data);
        if (!data.error) {
            setTimeout(function () {
                TableActions.showEventDetails(data.id);
            },0);
        }
    }

    onUnAttendEvent(obj) {
        this.eventsAttending = this.removeFromArray(this.eventsAttending, obj.title);
        TableApi.unAttendEvent(obj.id);
    }

    onUnAttendEventResponse(data) {
        console.log(data);
        if (!data.error) {
            setTimeout(function () {
                TableActions.showEventDetails(data.id);
            },0);
        }
    }

    onCreateEvent(obj) {
        TableApi.createEvent(obj);
    }

    onCreateEventResponse(data) {
        console.log(data);
        if (!data.error) {
            this.refreshEventsList = true;
            setTimeout(function () {
                TableActions.getEvents();
            },0);
        }
    }

    removeFromArray(arr) {
        var what, a = arguments, L = a.length, ax;
        while (L > 1 && arr.length) {
            what = a[--L];
            while ((ax = arr.indexOf(what)) !== -1) {
                arr.splice(ax, 1);
            }
        }
        return arr;
    }

    onShowEventDetails(id) {
        TableApi.showEventDetails(id);
    }

    onShowEventDetailsResponse(data) {
        this.eventDetails = data;
        var attendees = this.eventDetails.attendees;
        if(attendees.length > 0){
            for(var i=0; i< attendees.length; i++){
                if(attendees[i].id == this.user.id){
                    this.attendEvent = false;
                    break;
                } else{
                    this.attendEvent = true;
                }
            }
        } else if(attendees.length == 0){
            this.attendEvent = true;
        }
    }

    onDeleteEvent(id) {
        TableApi.deleteEvent(id);
    }

    onDeleteEventResponse(data) {
        console.log('onDeleteEventResponse');
        console.log(data);
        if (data) {
            this.refreshEventsList = true;
            setTimeout(function () {
                TableActions.getEvents();
            },0);
        }
    }

    onShowUpdateModal() {
        this.showUpdateModal = true;
    }

    onHideUpdateModal() {
        this.showUpdateModal = false;
    }

    onUpdateEvent(obj){
        TableApi.updateEvent(obj);
    }

    onUpdateEventResponse(data){
        console.log('onUpdateEventResponse');
        if (!data.error) {
            this.refreshEventsList = true;
            setTimeout(function () {
                TableActions.getEvents();
            },0);
            setTimeout(function () {
                TableActions.showEventDetails(data._id);
            },0);
        }
    }
}

module.exports = alt.createStore(TableStore, "TableStore");