import React from 'react'
import { Header, Icon, Image, Menu, Segment, Sidebar, Progress, Grid, Button, Table, Container, Transition,List } from 'semantic-ui-react'
import { view } from 'react-easy-state';
import Store from '../Store';
import moment from 'moment';
import axios from 'axios';
var storage = window.localStorage;
var token = storage.getItem('token');
axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

class Alerts extends React.Component {
    constructor(props) {
        super(props);
        this.setState({
            viewType: true
        })
        this.update = this.update.bind(this);

    }

    componentDidMount() {
        var storage = window.localStorage;
        var token = storage.getItem('token');
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        // console.log("compwillmount")

        this.timerID = setInterval(
          this.update,
          2000
        );
    }
    componentWillUnmount() {
        clearInterval(this.timerID);

    }

    update() {
        console.log("update")
        axios.get(`/notifications/${Store.stp.id}`)
            .then(data => {
                let notifications = data.data;
                console.log(notifications)
                Store.notifications = notifications;
                
            })
            .catch(console.log)
        

        // let newNotifs = this.state.notifications.map( async (notif,i) => {
        //     let response = await axios.get("/notifications/" + notif.id);
        //     let data = response.data;
        //     let newTank = Object.assign(tank, data)
        //     console.log(newTank);
        //     return newTank;
        // })
        // Promise.all(newTanks)
        //     .then( (tanks) => {
        //         this.setState({
        //             tanks
        //         })
        //     })
    }


    render() {
        const { stp } = Store;
        const { notifications } = Store;
        // let stpTime = new moment(stp.createdAt);
        // let now = new moment();
        // console.log("notifications ", Store.notifications)
        // console.log(moment.duration(stpTime.diff(now)).locale("en").humanize(true));
        // console.log("Stp time: ", stp.createdAt)
        return (
        <Sidebar.Pusher style={{ 'paddingLeft': '150px','paddingTop': '0px', 'height': '1000px'}}>
        <Segment basic>
        <Container>
        <Grid columns={1}>
            <Grid.Row>
                <Grid.Column width={6}>
                
                <Header as='h1' icon>
                    <Icon name='alarm' color='green' circular/>
                     Alerts
                </Header>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                {/* <h3>Change View: </h3><br></br> */}
                <Button.Group>
                    <Button positive={!this.state.viewType} onClick={()=> this.setState({ viewType : !this.state.viewType})}><Icon name='table' /></Button>
                    <Button.Or />
                    <Button positive={this.state.viewType} onClick={()=> this.setState({ viewType : !this.state.viewType})}><Icon name='list' /></Button>
                </Button.Group>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                {(this.state.viewType)?<ListView notifications={notifications} />:<TableView stp={stp} notifications={notifications} />}
                </Grid.Column>
            </Grid.Row>
                
        </Grid>
        </Container>
        </Segment>
        </Sidebar.Pusher>
        )
    }
}

const ListView = (props) => {
    return (
    <Segment>
        <List animated divided size='huge' verticalAlign='middle'>
            {(props.notifications.length==0)?
                <List.Item>No Alerts for you.</List.Item>:''
            
            }
            {props.notifications.map( (notif) => {
                let notifTime = new moment(notif.createdAt);
                let now = new moment();
                let timeSince = moment.duration(notifTime.diff(now)).locale("en").humanize(true);
                return (
                    <List.Item>
                        <Icon name='alarm' color='red'></Icon>
                        <List.Content>
                            
                            <List.Header >
                                {`Code ${notif.code}:  ${notif.msg}`}
                            </List.Header>
                            
                        </List.Content>
                        <List.Content floated='right'>
                            <List.Header>
                                {timeSince}
                            </List.Header>
                        </List.Content>
                    </List.Item>
                )
            })}
            
        </List>
    </Segment>
    )
}
const TableView = (props) => {
    if(props.notifications.length ==0) {
        return (
            <Segment>
                <List animated divided size='huge' verticalAlign='middle'>
                    <List.Item>No Alerts for you.</List.Item>
                </List>
            </Segment>
            
        )
    }
    return (
    <Table celled striped color='olive'>
                    <Table.Header>
                    </Table.Header>

                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell collapsing>#</Table.HeaderCell>
                            <Table.HeaderCell>Message</Table.HeaderCell>
                            <Table.HeaderCell></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>

                    { props.notifications.map( (notif,i) => {
                        let notifTime = new moment(notif.createdAt);
                        let now = new moment();
                        let timeSince = moment.duration(notifTime.diff(now)).locale("en").humanize(true);
                        return (
                            <Table.Row>
                                <Table.Cell collapsing>
                                    <Icon name='alarm' /> {notif.code}
                                </Table.Cell>
                                <Table.Cell>{notif.msg}</Table.Cell>
                                <Table.Cell collapsing textAlign='right'>
                                    {timeSince}
                                </Table.Cell>
                            </Table.Row>
                        )
                    })}
                    </Table.Body>
                </Table>
    )
}


export default view(Alerts)