import React, { Component } from 'react'
import { Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

class Sidenav extends Component {
    
    render() {
        return (
                <Sidebar as={Menu} animation='overlay' icon='labeled' vertical visible={this.props.visible}
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
                            Alerts
                        </Menu.Item>
                    </Link>
                    <Link to="/dashboard/profile/setup">
                        <Menu.Item as='a'>
                            <Icon name='user outline' />
                            Profile
                        </Menu.Item>
                    </Link>
                    <Menu.Item as='a' onClick={this.props.signout}>
                        <Icon name='pointing left' />
                        Signout
                    </Menu.Item>
                </Sidebar>
        )
    }
}

export default Sidenav;