import './misc/App.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import Navbar from './Dashboard/Navbar';
import Login from './Register/Login';
import Setup from './Dashboard/Setup';
import Signup from './Register/Signup';
import 'semantic-ui-css/semantic.min.css';
import './misc/index.css';
import axios from 'axios';
import { view } from 'react-easy-state';
import { isError } from 'util';
import Store from './Store.js'
axios.defaults.baseURL = 'http://localhost:8080';

class App extends Component {
  constructor(props) {
    super(props);
    
  }

  componentDidMount() {

  }

  
  signout() {
    
    // this.setState ( {
    //   auth: {
    //     token: '',
    //     isAuthenticated: false
    //   }
    // })
  }

  signup(user) {
	
    
  }

  render() {
    const { isAuthenticated, user, authenticate } = Store;
    return (
      <div>    
        
        <Router>
          <div>
            <Route exact path="/" component={Login} />
            <PrivateRoute path="/dashboard" isAuthenticated={isAuthenticated} component={ Navbar } />
            <Route path="/setup" component={Setup} />
            <Route path="/signup" component={Signup} />


            {/* <Route path="/test" component={(props) => <h1>Hello</h1>} /> */}
            
            {/* <Navbar /> */}
          </div>
        </Router>
      </div>
    );
  }
}


const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        rest.isAuthenticated ? (
                     <Component {...props} />
                         ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: props.location }
              }}
            />
          )
      }
    >
      {/* <Route path="/" render={ props => <Status auth={this.props.auth} /> } />            
      <Route path="/logs" component = {Logs} /> */}
    </Route>
  )
}

export default view(App);
