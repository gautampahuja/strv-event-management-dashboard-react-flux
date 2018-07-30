import React from 'react';
import { Router, Route, hashHistory, Redirect, browserHistory, IndexRoute } from 'react-router';
import ReactDOM  from 'react-dom';
import App from './components/App';
import Profile from './components/Profile';
import Login from './components/Login';
import EventDetails from './components/EventDetails';
import Home from './components/Home';
import NotFound from './components/NotFound';


ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Login}/>
            <Route path="/Home" component={Home}/>
            <Route path="/profile" component={Profile}/>
            <Route path="/EventDetails" component={EventDetails}/>
            <Route path="*" component={NotFound}/>
        </Route>

    </Router>
), document.getElementById('content'));