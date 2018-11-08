import React from 'react';
import { Loader, Header, Icon, Image, Menu, Segment, Sidebar, Progress, Grid, Container, Button, Radio, Message } from 'semantic-ui-react'
import axios from 'axios';
import Store from '../Store'

axios.defaults.baseURL = 'http://localhost:8080';


class Status extends React.Component {
    constructor(props) {
        super(props)
        const { user, stp, tanks } = Store;
        this.setState({
            stp,
            tanks,
        });
        this.update = this.update.bind(this);
    }

    // changeCStatus = (event) => {
    //     console.log(event);
    //     axios.post("/tank/C101", { status: event.target.value })
    //         .then((respose)=> {
    //             console.log(respose.data[0])
    //         })
    // }

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
       
        
        
        // axios.get("/tank/C101")
        //         .then(function (response) {
        //             var { id, status, level } = response.data;
        //             console.log(id,status,level);
        //             this.setState( {
        //                 cTankPercent: level,
        //                 cState: status,
        //                 loading: false
        //               });
                  
        //         }.bind(this))
        //         .catch(function(error){
        //             console.log("Not able to fetch API cuz", error);
        //         }.bind(this))

    }
    render() {
        // console.log("status",this.props.auth)

        const { tanks } = this.state;
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
                    { (tanks.length==0)? <Message>Ther are no tanks added to this STP. Please Add tanks in the profile Section</Message>:''}
                        { tanks.map( (tank,i) => {
                            return (
                                <Grid.Column width={6}>
                                    <h5>Tank {tank.id}</h5>
                                    <h5>Status: <span style={{color: (tank.status)?'green':'red'}}>{tank.status? "On": "Off"}</span></h5>
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