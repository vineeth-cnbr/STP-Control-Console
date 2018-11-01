import React, {Component} from 'react';
import { Loader, Header, Icon, Image, Menu, Segment, Sidebar, Progress, Grid, Button, Radio } from 'semantic-ui-react'
import axios from 'axios';
class Profile extends Component {
    render() {
        return (
            <Sidebar.Pusher style={{ 'paddingLeft': '150px','paddingTop': '0px','height': '1000px'}}>
            <Segment basic>
            <h1>Profile Details</h1>
            </Segment>
            </Sidebar.Pusher>
        )
    }
}

export default Profile;