import React from 'react'
import { Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react'
import { Progress } from 'semantic-ui-react'
import Status from './Status';
import Sidenav from './Sidenav';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Logs from './logs';
import Login from '../Register/Login';

// const ProgressExampleProgress = () => 

// export default ProgressExampleProgress

class Navbar extends React.Component {

    state = { visible: true }
    
    handleButtonClick = () => this.setState({ visible: !this.state.visible })

    handleSidebarHide = () => this.setState({ visible: false })

    render() {
        const isAuthenticated = false;
        const { visible } = this.state
        return (
            
            <div>
            <div className="ui top attached menu" style={{}}>
                    <a className="item" onClick={this.handleButtonClick}>
                        <i className="sidebar icon"></i>
                        STP Dashboard - Admin
                    </a>
            </div>
            
            <Sidebar.Pushable as={Segment}>
                <Sidenav visible={this.state.visible} />
                    <div>
                        <Route exact path="/dashboard" render={ props => <Status auth={this.props.auth} /> } />
                        <Route path="/dashboard/logs" component = {Logs} />
                        {/* </Route> */}
                    </div>
                
            </Sidebar.Pushable>
            </div>
        )
    }
}
const Dash = () =>{
    
}

export default Navbar