import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import Navbar from './Navbar';
import Login from './Login';
import Setup from './Setup';
import Status from './Status';
import 'semantic-ui-css/semantic.min.css';
import './index.css';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080';

class App extends Component {
  constructor() {
    super();
    this.authenticate = this.authenticate.bind(this);
    
  }

  componentWillMount() {

    axios.post("/user")
    this.setState({
      test: true,
      auth: {
        token: null,
        isAuthenticated: false,
      }

    });

    

  }

  authenticate(username, password) {
    return new Promise( (resolve, reject) => {
      axios.post('/auth', {
        username,
        password
      }).then(data => {
        data = data.data
        
        if(data.code == 0) {
          this.setState({
            auth: {
              token: data.token,
              isAuthenticated: true
            }
          });
          console.log(this.state.auth.isAuthenticated)
        }
        console.log(true)
        resolve(data);
      }).catch(data => {
        console.log(data);
      })
    })
      
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <Route exact path="/" auth={this.state.auth} render={props => <Login auth={props.auth} authenticate={this.authenticate} />} />
            <PrivateRoute path="/dashboard" component={Navbar} auth={this.state.auth} />
            <Route path="/signup" component={Setup} />
            {/* <Route path="/test" component={(props) => <h1>Hello</h1>} /> */}
            
            {/* <Navbar /> */}
          </div>
        </Router>
      </div>
    );
  }
}

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

const PrivateRoute = ({ component: Component, ...rest }) => {
  const auth = rest.auth;
  return (
    <Route
      {...rest}
      render={props =>
        auth.isAuthenticated ? (
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
    />
  )
}
export default App;
