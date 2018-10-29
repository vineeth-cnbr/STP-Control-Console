import React from 'react';
import { Loader, Header, Icon, Image, Menu, Segment, Sidebar, Progress, Grid, Button, Radio } from 'semantic-ui-react'
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080';


class Status extends React.Component {
    state = {
        cTankPercent: 0,
        aTankPercent: 0,
        cState: true,
        aState: true,
        loading: true
    }
    aIncrement = () => {
        this.setState({ aTankPercent:  this.state.aTankPercent > 100 ? 0 : this.state.aTankPercent + 20 })
    }
    cIncrement = () => {
        this.setState({ cTankPercent: this.state.cTankPercent > 100 ? 0 : this.state.cTankPercent + 20 })
    }

    changeCStatus = (event) => {
        console.log(event);
        axios.post("/tank/C101", { status: event.target.value })
            .then((respose)=> {
                console.log(respose.data[0])
            })
    }

    componentWillMount() {
        let { token } = this.props.auth;
        // console.log(this.props);
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

        setInterval(
          this.update.bind(this),
          5000
        );
    }
    componentWillUnmount() {
        clearInterval(this.timerID);

    }
    

    update() {
        axios.get("/tank/C101")
                .then(function (response) {
                    var { id, status, level } = response.data;
                    console.log(id,status,level);
                    this.setState( {
                        cTankPercent: level,
                        cState: status,
                        loading: false
                      });
                  
                }.bind(this))
                .catch(function(error){
                    console.log("Not able to fetch API cuz", error);
                }.bind(this))

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
                        <h5>Collection Tank Capacity</h5> <p>State: {this.cState} </p><Radio toggle checked={this.state.cState} onChange={this.changeCStatus} />
                        <Progress percent={this.state.cTankPercent} size='big' progress indicating >{ (this.state.loading)? <Loader active inline >Loading</Loader>: ""}</Progress>
                        {/* <Button onClick={this.cIncrement}>Increment</Button> */}
                    </Grid.Column>
                    
                    <Grid.Column>
                        <h5>Aeration Tank Capacity</h5>  <p>State: {this.cState} </p><Radio toggle onChange={this.changeAStatus} />
                        <Progress percent={this.state.aTankPercent} size='big' progress indicating  />
                        {/* <Button onClick={this.aIncrement}>Increment</Button> */}
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