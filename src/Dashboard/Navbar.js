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
import Setup from '../Register/Setup';
import Profile from './Profile'
import { Cookies, withCookies } from 'react-cookie';

// const ProgressExampleProgress = () => 

// export default ProgressExampleProgress

class Navbar extends React.Component {

    state = { visible: true }
    
    handleButtonClick = () => this.setState({ visible: !this.state.visible })

    handleSidebarHide = () => this.setState({ visible: false })

    setStp = (stp) => {

    }

    render() {
        const { cookies } = this.props; 
        const user = this.props.auth.user;
        console.log(user)
        const { signout } = this.props.auth;
        const isAuthenticated = false;
        const { visible } = this.state;
        return (
            
            <div>
            <div className="ui top attached menu" style={{}}>
                    <a className="item" onClick={this.handleButtonClick}>
                        <i className="sidebar icon"></i>
                        STP Dashboard - Admin
                    </a>
            </div>
            
            <Sidebar.Pushable as={Segment}>
                <Sidenav visible={this.state.visible} signout={signout} />
                    <div>
                        { (user.stpId!=null)?
                                <Route exact path="/dashboard" render={ props => <Status auth={this.props.auth} /> } />
                                :   <Redirect to="/dashboard/profile/setup" />
                            
                             }}
                        <Route exact path="/dashboard/logs" component = {Logs} />
                        <Route exact path="/dashboard/profile" component = {Profile} />
                        <Route exact path="/dashboard/profile/setup" render={ props => {
                            return <Setup user={user} />
                        }} />
                        {/* </Route> */}
                    </div>
                
            </Sidebar.Pushable>
            </div>
        )
    }
}


export default withCookies(Navbar)