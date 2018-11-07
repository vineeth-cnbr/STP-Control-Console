import React from 'react'
import { Header, Icon, Image, Menu, Segment, Sidebar, Progress, Grid, Button, Table, Container } from 'semantic-ui-react'
import { view } from 'react-easy-state';
import Store from '../Store';
import moment from 'moment';
import axios from 'axios';


class Alerts extends React.Component {
    constructor(props) {
        super(props);
        const { stp, notifications } = Store;
        this.setState({
            stp,
            notifications
        })
        this.update = this.update.bind(this);

    }

    componentWillMount() {
        const { stp } = Store;
        this.setState({
            stp
        });
        var storage = window.localStorage;
        var token = storage.getItem('token');
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

        this.timerID = setInterval(
          this.update,
          1000
        );
    }
    componentWillUnmount() {
        clearInterval(this.timerID);

    }

    update() {

        // let newNotifs = this.state.notifications.map( async (notif,i) => {
        //     let response = await axios.get("/tank/" + tank.id);
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
        let stpTime = new moment(stp.createdAt);
        let now = new moment();
        console.log(moment.duration(stpTime.diff(now)).locale("en").humanize(true));
        console.log("Stp time: ", stp.createdAt)
        return (
        <Sidebar.Pusher style={{ 'paddingLeft': '150px','paddingTop': '0px', 'height': '1000px'}}>
        <Segment basic>
        <Container>
        <Grid columns={1}>
            <Grid.Row>
                <Grid.Column width={6}>
                
                <Header as='h1' icon>
                    <Icon name='alarm' color='olive' style={{textAlign: 'left'}}/>
                     Alerts
                </Header>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                <Table celled striped color='olive'>
                    <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell colSpan='3'>{stp.name}</Table.HeaderCell>
                    </Table.Row>
                    </Table.Header>

                    <Table.Body>
                    <Table.Row>
                        <Table.Cell collapsing>
                        <Icon name='alarm' /> node_modules
                        </Table.Cell>
                        <Table.Cell>Initial commit</Table.Cell>
                        <Table.Cell collapsing textAlign='right'>
                        10 hours ago
                        </Table.Cell>
                    </Table.Row>
                    </Table.Body>
                </Table>
                </Grid.Column>
            </Grid.Row>
                
        </Grid>
        </Container>
        </Segment>
        </Sidebar.Pusher>
        )
    }
}


export default view(Alerts)