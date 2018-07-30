For Development environment:
1. pull the repo.
2. Install NPM. (https://docs.npmjs.com/cli/install)
3. Go to "strv" directory and run: sudo npm install (this may take some time).
4. run: sudo npm start (this is for local webpack server).
4. Open http://localhost:3000/ in browser.

For Production environment:

1. sudo npm install
2. sudo npm run prod
3. install any local web server like harp(https://harpjs.com/).
4. run "harp server" (this will run a local server on some port, in my case it's 9000).
5. Open "http://localhost:9000/" in browser.


Tech Used:

ReactJS + Flux
ECMAScript 5
Webpack
LESS
React-Router



PROJECT SPECIFICATION
Create simple app which allows registered users to attend events. It will have 4 pages:
Login, Event List, Event Detail, User Profile.

Login
Email + Password authentication

Here is a list of test accounts:

Username
Password
brucebanner@strv.com
kill3r
blackwidow@strv.com
l0veLateX
thor@strv.com
missMyBroth3r
peterparker@strv.com
hat3Spid3rs
steverogers@strv.com
am3riCa
buckybarnes@strv.com
darkS0ldier
tonystark@strv.com
ir0nL0ver

Event List
After login you can see the list of all events.
Each event has short information about capacity, link to the events detail with detailed information and button to attend the event.

Each item in the list should have:

title
description
date
owner
number of attendees / capacity
attend/unattend button

Event Detail
In the event detail you can find all the information about event.

title
description
date
owner
number of attendees / capacity
list of attendees
attend/unattend button
update event button (owner only)
delete button (owner only)

Create/Update Event
Right there you can set a title of your event, select a date, setup capacity and write down some description.

User Profile
Very small profile about user and list of events that he is going to attend.

