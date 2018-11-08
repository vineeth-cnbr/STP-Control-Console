import React from 'react';
import { Loader, Header, Icon, Image, Menu, Segment, Sidebar, Progress, Grid, Container, Button, Radio, Message } from 'semantic-ui-react'
import axios from 'axios';
import Store from '../Store'

axios.defaults.baseURL = 'http://localhost:8080';
var storage = window.localStorage;
var token = storage.getItem('token');
axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;


class Status extends React.Component {
    constructor(props) {
        super(props)
        const { user, stp, tanks } = Store;
        this.setState({
            stp,
            tanks,
            isStatusLoading: false
        });
        this.update = this.update.bind(this);
        this.updateStatus = this.updateStatus.bind(this)
        this.changeBinary = this.changeBinary.bind(this);
    }

    componentWillMount() {
        const { stp, tanks } = Store;
        this.setState({
            stp,
            tanks,
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

    updateStatus(id,status) {
        this.setState({
            isStatusLoading: true,
        })
        var storage = window.localStorage;
        var token = storage.getItem('token');
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        axios.post(`/tank/${id}`, {
                status: !status
             })
            .then( data => {
                let res = data.data;
                console.log(res);
                this.setState({
                    isStatusLoading: false
                })
            })
            .catch(console.log)

    }
    
    changeBinary(id) {
        id = !id;
        console.log(id);
    }

    update() {

        let newTanks = this.state.tanks.map( async (tank,i) => {
            let response = await axios.get("/tank/" + tank.id);
            let data = response.data;
            let newTank = Object.assign(tank, data)
            console.log(newTank);
            return newTank;
        })
        Promise.all(newTanks)
            .then( (tanks) => {
                this.setState({
                    tanks
                })
            })
        // console.log("update", newTanks);

    }


    render() {
        // console.log("status",this.props.auth)
        const { user } = Store;
        const { tanks } = this.state;
        console.log(tanks);
        return (
            <Sidebar.Pusher style={{ 'paddingLeft': '150px','paddingTop': '0px','height': '1000px'}}>
            <Segment basic>
            <Container>
            <Grid columns={1}>
            <Grid.Row>
            <Grid.Column width={6}>
            
            <Header as='h1' icon>
                <Icon name='recycle' color='green'  circular/>
                STP {this.state.stp.name} Status
            </Header>
            </Grid.Column>
            </Grid.Row>
            
                <Grid.Row>
                    { (tanks.length==0)? <Message>There are no tanks added to this STP. Please Add tanks in the profile Section</Message>:''}
                        { tanks.map( (tank,i) => {
                            return (
                                <Grid.Column width={6}>
                                    <h5>Tank {tank.id}</h5>
                                    <h5>Status: <span style={{color: (tank.status)?'green':'red'}}>{tank.status? "On": "Off"}</span></h5>
                                    {(user.role=='admin' || user.role=='op')?
                                        <Button loading={this.state.isStatusLoading} toggle active={tank.status} onClick={(e) => this.updateStatus(tank.id,tank.status)} >
                                            {(tank.status)?"Force Stop":"Force Start"}
                                        </Button>:''}
                                    <br /><br />
                                    <Progress percent = {tank.level} size='big' progress indicating ></Progress>
                                </Grid.Column>
                            )
                        })}
                </Grid.Row>
            </Grid>
            </Container>
            </Segment>
            </Sidebar.Pusher>
        )
    }
}
export default Status 