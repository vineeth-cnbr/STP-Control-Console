import React from 'react'
import { Header, Icon, Image, Menu, Segment, Sidebar, Progress, Grid, Button } from 'semantic-ui-react'
export default () => { 
    return (
        <Sidebar.Pusher style={{ 'paddingLeft': '150px','paddingTop': '0px', 'height': '1000px'}}>
        <Segment basic>
            
        <Header as='h2' icon>
            <Icon name='recycle' />
            STP Status
        </Header>
        <Grid columns={2}>
            <Grid.Row>
                <Grid.Column>
                    <h1>Alerts</h1>
                </Grid.Column>
                </Grid.Row>
                
        </Grid>
        </Segment>
        </Sidebar.Pusher>
    )
}