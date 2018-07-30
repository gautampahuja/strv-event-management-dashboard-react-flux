var Alt = require('../alt');

class TableActions{
    constructor(){
        this.generateActions(
            'getEvents',
            'recieveEvents',
            'authorizeUser',
            'userAuthResponse',
            'attendEvent',
            'attendEventResponse',
            'unAttendEvent',
            'unAttendEventResponse',
            'createEvent',
            'createEventResponse',
            'showEventDetails',
            'showEventDetailsResponse',
            'deleteEvent',
            'deleteEventResponse',
            'showUpdateModal',
            'hideUpdateModal',
            'updateEvent',
            'updateEventResponse'
        )
    }
}
module.exports = Alt.createActions(TableActions);