import React, {Component} from 'react';
import { Loader, Header, Icon, Table, Menu, Segment, Sidebar, Progress, Grid, Container, Button, Radio, Form, Input } from 'semantic-ui-react'
import axios from 'axios';
import { view } from 'react-easy-state';
import Store from '../Store';
class Profile extends Component {
    render() {
        const user = Store.user;
        const stp = Store.stp;
        const tanks = Store.tanks;
        console.log("tanks")
        tanks.map(tank => console.log(tank.id))
        console.log(tanks);
        return (
            <Sidebar.Pusher style={{ 'paddingLeft': '150px','paddingTop': '0px','height': '1000px'}}>
            <Segment basic>
            <Container >
                <Grid>
                    <Grid.Row>
                    <Header as='h1' icon>
                        <Icon name='account settings' color='black' style={{textAlign: 'left'}}/>
                        Profile Settings
                    </Header>
                    </Grid.Row> 
                    <Grid.Row>
                        <Grid.Column width={6}>
                            <Form >
                                <Form.Field>
                                    <label>Name:</label>
                                    <Input value={user.name} type="text" />
                                </Form.Field>
                                <Form.Field>
                                    <label>Username:</label>
                                    <Input value={user.username} type="text" />
                                </Form.Field>
                                
                                <Form.Field>
                                    <label>Email:</label>
                                    <Input value={user.email} type="email" />
                                </Form.Field>
                                
                                <Form.Field>
                                    <label>Phone:</label>
                                    <Input value={user.phone} type="phone" />
                                </Form.Field>
                            </Form>
                        </Grid.Column>
                    </Grid.Row>  
                    <Grid.Row>
                    <Header as='h2' icon>
                        <Icon name='plug' color='black' style={{textAlign: 'left'}}/>
                        STP Details
                    </Header>
                    </Grid.Row>  
                    <Grid.Row>
                        <Grid.Column width={6}>
                        <Form >
                                <Form.Field>
                                    <label>Name:</label>
                                    <Input value={stp.name} type="text" />
                                </Form.Field>
                                <h3>Number of tanks: {tanks.length}</h3>
                            </Form>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <TankTable tanks={tanks} />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>    
            </Container>
            
            
            </Segment>
            </Sidebar.Pusher>
        )
    }
}

class TankTable extends Component {
    render() {
        const tanks = this.props.tanks;
        return (
            <Table color='olive'>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                        <Table.HeaderCell>length</Table.HeaderCell>
                        <Table.HeaderCell>breadth</Table.HeaderCell>
                        <Table.HeaderCell>height</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {tanks.map(tank =>  (
                        <Table.Row>
                            <Table.Cell>{tank.id}</Table.Cell>
                            <Table.Cell><span style={{color: (tank.status)?'green':'red'}}>{tank.status? "On": "Off"}</span></Table.Cell>
                            <Table.Cell>{tank.length}m</Table.Cell>
                            <Table.Cell>{tank.breadth}m</Table.Cell>
                            <Table.Cell>{tank.height}m</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
                <Table.Footer fullWidth>
                    <Table.Row>
                        <Table.HeaderCell colSpan='4'>
                        <Button floated='left' icon labelPosition='left' primary size='tiny'>
                            <Icon name='user' /> Add Tank
                        </Button>
                        </Table.HeaderCell>
                        <Table.HeaderCell />
                        
                        {/* <Table.HeaderCell />
                        <Table.HeaderCell />
                        <Table.HeaderCell /> */}
                    </Table.Row>
                </Table.Footer>
            </Table>
        )
    }
}
export default view(Profile);