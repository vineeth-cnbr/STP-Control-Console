import React from 'react'
import { Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react'
import { Progress } from 'semantic-ui-react'
import Status from './Status';
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
                <Sidebar as={Menu} animation='overlay' icon='labeled' vertical
                visible={visible}
                inverted width='thin'>
                <br></br>
                
                <Menu.Item as='a' height='200px'>
                    <Image src='img/mstile-310x150.png' size='mini' width="100%" circular centered/>
                </Menu.Item>
                
                <Link to="/dashboard">
                    <Menu.Item as='a'>
                        <Icon name='newspaper' />
                        Status
                    </Menu.Item>
                </Link>
                <Link to="/dashboard/logs">
                    <Menu.Item as='a'>
                        <Icon name='file alternate outline' />
                        Logs
                    </Menu.Item>
                </Link>
                <Menu.Item as='a'>
                    <Icon name='file alternate outline' />
                    Logs
                </Menu.Item>
                </Sidebar>
                
                    <div>
                        
                        <Route path="/" render={ props => <Status auth={this.props.auth} /> } />
                        
                        <Route path="/logs" component = {Logs} />
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