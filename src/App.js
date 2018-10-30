import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import Navbar from './Dashboard/Navbar';
import Login from './Register/Login';
import Setup from './Register/Setup';
import Signup from './Register/Signup';
import Status from './Dashboard/Status';
import Logs from './Dashboard/logs'
import 'semantic-ui-css/semantic.min.css';
import './index.css';
import axios from 'axios';
import { withCookies, Cookies } from 'react-cookie';

axios.defaults.baseURL = 'http://localhost:8080';

class App extends Component {
  constructor() {
    super();
    this.authenticate = this.authenticate.bind(this);
    this.state = {
      auth: {
        isAuthenticated: false
      }
      
    }
    
  }

  componentWillMount() {
    const { cookies } = this.props;
    const token = cookies.get('token')
    console.log("Token", token);
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

    axios.get("/user")
      .then( data => {
        console.log(data);
        this.setState({
          auth: {
            token: token,
            isAuthenticated: true,
          }
        }, () => {
          console.log("The user is logged in", this.state.auth.isAuthenticated)
        })
          
      })
      .catch( err => console.log(err));

    

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
          console.log(" The user is logged in: ",this.state.auth.isAuthenticated)
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
            <Route exact path="/" auth={this.state.authenticate} authenticate={this.authenticate} 
                    render={ (props) => { 
                        const properties = { auth: this.state.auth, authenticate: this.authenticate };
                        return homePageRedirect(properties); 
                        }} />
            <PrivateRoute path="/dashboard" component={ Navbar } auth={ this.state.auth } />
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
  const auth = rest.auth;
  return (
    <Route
      {...rest}
      render={props =>
        auth.isAuthenticated ? (
                     <Component auth={auth} {...props} />
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

const homePageRedirect = (props) => {
  // console.log("auth", props.auth.isAuthenticated)
  if(props.auth.isAuthenticated) {
    return (
      <Redirect to="/dashboard" />
    )
  }else {

    return (
      <Login auth={props.auth} authenticate={props.authenticate} />
    )
  }
}
export default withCookies(App);
