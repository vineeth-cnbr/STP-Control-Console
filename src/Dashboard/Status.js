import React from 'react';
import { Loader, Header, Icon, Image, Menu, Segment, Sidebar, Progress, Grid, Button, Radio } from 'semantic-ui-react'
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080';


class Status extends React.Component {
    constructor(props) {
        super(props)
        console.log("props", props)
        this.setState({
            stp: this.props.auth.stp,
            tanks: this.props.auth.tanks,
        });
        this.update = this.update.bind(this);
        console.log("FIRST");
    }

    // changeCStatus = (event) => {
    //     console.log(event);
    //     axios.post("/tank/C101", { status: event.target.value })
    //         .then((respose)=> {
    //             console.log(respose.data[0])
    //         })
    // }

    componentWillMount() {
        this.setState({
            stp: this.props.auth.stp,
            tanks: this.props.auth.tanks,
        });
        let { token } = this.props.auth;
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

        setInterval(
          this.update,
          6000
        );
    }
    componentWillUnmount() {
        clearInterval(this.timerID);

    }
    

    update() {

        let newTanks = this.props.auth.tanks.map( async (tank,i) => {
            let response = await axios.get("/tank/" + tank.id);
            let data = response.data;
            let newTank = Object.assign(tank, data)
            console.log(newTank);
            return newTank;
        })
        console.log("update", newTanks);
        this.setState({
            tanks: newTanks
        })
        
        
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
                
            <Header as='h2' icon>
                <Icon name='recycle' />
                STP Status
            </Header>
            <Grid columns={2}>
                <Grid.Row>
                    {/* <Grid.Column>
                        <h5>Collection Tank Capacity</h5> <p>State: {this.cState} </p><Radio toggle checked={this.state.cState} onChange={this.changeCStatus} />
                        <Progress percent={this.state.cTankPercent} size='big' progress indicating >{ (this.state.loading)? <Loader active inline >Loading</Loader>: ""}</Progress> */}
                        {/* <Button onClick={this.cIncrement}>Increment</Button> */}
                    {/* </Grid.Column> */}
                {/* <Image src='/images/wireframe/paragraph.png' /> */}
                        { tanks.map( (tank,i) => {
                            return (
                                <Grid.Column>
                                    <h5>Tank {i}</h5>
                                    <Progress percent = {tank.level} size='big' progress indicating ></Progress>
                                </Grid.Column>
                            )
                        })}
                </Grid.Row>
            </Grid>
            </Segment>
            </Sidebar.Pusher>
        )
    }
}
export default Status 