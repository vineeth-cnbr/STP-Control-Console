import './misc/App.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import Navbar from './Dashboard/Navbar';
import Login from './Register/Login';
import Setup from './Register/Setup';
import Signup from './Register/Signup';
import Status from './Dashboard/Status';
import Logs from './Dashboard/logs'
import 'semantic-ui-css/semantic.min.css';
import './misc/index.css';
import axios from 'axios';
import { withCookies, Cookies } from 'react-cookie';
import { isError } from 'util';

axios.defaults.baseURL = 'http://localhost:8080';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: {
        isAuthenticated: false,
        signout: this.signout,
        user: {}
      }
      
    }

    
    this.authenticate = this.authenticate.bind(this);
    this.signout = this.signout.bind(this);
    this.signup = this.signup.bind(this);
    
  }

  componentWillMount() {
    const { cookies } = this.props;
    const token = cookies.get('token')
    const user = cookies.get('user');
    console.log("token", token);
    console.log("user", user);
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

    axios.get("/user")
      .then( data => {
        data = data.data;
        console.log(data);
        this.setState({
          auth: {
            token: token,
            isAuthenticated: true,
            signout: this.signout,
			user: data.user,
			stp: data.stp,
			tanks: data.tanks
          }
          
        }, () => {
          console.log("The user is logged in", this.state.auth.isAuthenticated)
        })
        cookies.set('user', data);
        console.log("user", cookies.get('user'));
      })
      .catch( err => console.log(err));

    

  }

  authenticate(username, password) {
	const { cookies } = this.props;
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
			  isAuthenticated: true,
			  user: data.user
            }
          });
          console.log(" The user is logged in: ",this.state.auth.isAuthenticated)
		}
		cookies.set('user', data.user)
        resolve(data);
      }).catch(data => {
        console.log(data);
      })
    })
      
  }

  signout() {
    let { cookies } = this.props;
    cookies.remove('token');
    this.setState ( {
      auth: {
        token: '',
        isAuthenticated: false
      }
    })
  }

  signup(user) {
	const { name, username, password, email, role, phone } = user;
	console.log("/signup", user)
    return new Promise( (resolve, reject) => {
        axios.post("/signup", {
          name,
          password,
          email,
          username,
          role,
          phone
      }).then( data =>{
          data = data.data;
		  const { code, user, err} = data;
		  if(code==0) {
			  resolve(user);
		  }else {
			  reject(err)
		  }
        //   console.log(data);

      }).catch( err=> {
		console.log(err);
		this.setState ({
			isError: true,
			errMessage: err
		});
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
            <Route path="/signup" 
                    render={ (props) => {
                        return (
                          <Signup signup={this.signup} />
                        )
            }} />


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
