import React from 'react'
import { Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import { Progress } from 'semantic-ui-react'
import Status from './Status';
import Sidenav from './Sidenav';
import { Redirect } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Alerts from './Alerts';
import Login from '../Register/Login';
import Setup from './Setup';
import Profile from './Profile'
import Store from '../Store';
import { view } from 'react-easy-state';
import axios from 'axios';

// const ProgressExampleProgress = () => 

// export default ProgressExampleProgress

class Navbar extends React.Component {

    constructor(props) {
        super(props);
        this.setState({ visible: true });
        var storage = window.localStorage;
        var token = storage.getItem('token');
        const getUser = Store.getUser;
        // getUser();
        var storage = window.localStorage;
		var token = storage.getItem('token');
		axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
		axios.get("/user")
					.then( data => {
						data = data.data;
						console.log("user", data.user);
						Store.user = data.user;
						Store.stp = data.stp;
						Store.tanks = data.tanks;
						Store.notifications = data.notifications;
						Store.isAuthenticated = true;
					})
					.catch( err => console.log(err));
    }

    state = { visible: true }
    
    handleButtonClick = () => this.setState({ visible: !this.state.visible })

    handleSidebarHide = () => this.setState({ visible: false })

    setStp = (stp) => {

    }

    render() {
        const user = Store.user;
        console.log(Store);
        console.log("User",user)
        const { signout } = Store;
        const { visible } = this.state;
        return (
            
            <div>
            <Menu className="ui top attached menu" color='red'>
                    <a className="item" onClick={this.handleButtonClick}>
                        <i className="sidebar icon"></i>
                        STP Dashboard - Admin
                    </a>
                    
                    <Menu.Item position='right'>
                        <b>Welcome, {user.name}!</b>
                    </Menu.Item>
                    <Menu.Item  position='right'>
                        <b>{user.username}</b>
                    </Menu.Item>
                    
            </Menu>
            
            <Sidebar.Pushable as={Segment} style={{ 'paddingLeft': '150px','paddingTop': '0px', 'height': '1000px'}}>
                <Sidenav visible={this.state.visible} signout={signout} />
                    <div>
                        { (user.stpId!=null)?
                                <Route exact path="/dashboard" render={ props => <Status /> } />
                                :   <Redirect to="/dashboard/profile/setup" />
                            
                             }
                        <Route exact path="/dashboard/alerts" component =  {Alerts} />
                        <Route exact path="/dashboard/profile" component = {Profile} />
                        <Route exact path="/dashboard/profile/setup" component = {Setup} />
                        {/* </Route> */}
                    </div>
                
            </Sidebar.Pushable>
            </div>
        )
    }
}


export default view(Navbar)