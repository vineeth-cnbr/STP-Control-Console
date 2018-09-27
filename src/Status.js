import React from 'react';
import { Header, Icon, Image, Menu, Segment, Sidebar, Progress, Grid, Button } from 'semantic-ui-react'

class Status extends React.Component {
    state = {
        cTankPercent: 40,
        aTankPercent: 20
    }
    aIncrement = () => {
        this.setState({ aTankPercent:  this.state.aTankPercent > 100 ? 0 : this.state.aTankPercent + 20 })
    }
    cIncrement = () => {
        this.setState({ cTankPercent: this.state.cTankPercent > 100 ? 0 : this.state.cTankPercent + 20 })
    }
    render() {
        return (
            <Sidebar.Pusher style={{ 'paddingLeft': '150px','paddingTop': '0px','height': '1000px'}}>
            <Segment basic>
                
            <Header as='h2' icon>
                <Icon name='recycle' />
                STP Status
            </Header>
            <Grid columns={2}>
                <Grid.Row>
                    <Grid.Column>
                        <h5>Collection Tank Capacity</h5>
                        <Progress percent={this.state.cTankPercent} size='big' progress indicating />
                        <Button onClick={this.cIncrement}>Increment</Button>
                    </Grid.Column>
                    
                    <Grid.Column>
                        <h5>Aeration Tank Capacity</h5>
                        <Progress percent={this.state.aTankPercent} size='big' progress indicating  />
                        <Button onClick={this.aIncrement}>Increment</Button>
                    </Grid.Column>
                {/* <Image src='/images/wireframe/paragraph.png' /> */}
                </Grid.Row>
            </Grid>
            </Segment>
            </Sidebar.Pusher>
        )
    }
}
export default Status 