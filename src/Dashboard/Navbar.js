import React from 'react'
import { Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import { Progress } from 'semantic-ui-react'
import Status from './Status';
import Sidenav from './Sidenav';
import { Redirect } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Logs from './logs';
import Login from '../Register/Login';
import Setup from './Setup';
import Profile from './Profile'
import Store from '../Store';
import { view } from 'react-easy-state';

// const ProgressExampleProgress = () => 

// export default ProgressExampleProgress

class Navbar extends React.Component {

    state = { visible: true }
    
    handleButtonClick = () => this.setState({ visible: !this.state.visible })

    handleSidebarHide = () => this.setState({ visible: false })

    setStp = (stp) => {

    }

    render() {
        const user = Store.user;
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
                        <Route exact path="/dashboard/logs" component = {Logs} />
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