import React from 'react';
import ReactDOM from 'react-dom';
import Status from './Status';
// import { BrowserRouter, Link, IndexRoute } from 'react-router'
import { BrowserRouter as Router, Route } from 'react-router-dom'

const Routes = () => {
    return (
        <Router>
            <div>
            {/* <Route path = "/" component = {App}>
                <IndexRoute component = {Home} /> */}
                <Route path = "/status" component = {Status} />
                {/* <Route path = "about" component = {About} />
                <Route path = "contact" component = {Contact} /> */}
            {/* </Route> */}
            </div>
        </Router>
    )
}
export default Routes