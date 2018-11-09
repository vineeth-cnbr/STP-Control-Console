import React, { Component } from 'react';
// import logo from './logo.svg';
import '../misc/App.css';
import { Select, Button, Form, Grid, Container,Sidebar, Segment, Input, Header, Icon, Message } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import axios from 'axios';
import { Redirect } from 'react-router';
import { store, view } from 'react-easy-state';
import Store from '../Store';
var storage = window.localStorage;
var token = storage.getItem('token');
axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        
const opts = [
    {
        key:'AR',
        value:'AR',
        text:'Aeration Tank'
    },
    {
        key:'DC',
        value:'DC',
        text:'Decan Tank'
    },
    {
        key:'CO',
        value:'CO',
        text:'Collection Tank'
    },

];
class Setup extends Component {
    constructor(props){
        super(props);
        this.state = {
            name:'',
            street:'',
            state:'',
            pincode:'',
            tanks: 0,
            tankComponents:[], 
            heights: [],
            breadths: [],
            lengths: [],
            tankTypes: [],
            isSubmitted: false,
            isError: false,
            errMessage: ''
        }
        this.addtank = this.addtank.bind(this);
        this.addAttribute = this.addAttribute.bind(this);
        this.removetank = this.removetank.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.redirectFunction = this.redirectFunction.bind(this);
    }

    addtank(){
        console.log("old add tank")
        let { tanks, tankComponents, lengths, breadths, heights } = this.state;
        heights.push(0);
        lengths.push(0);
        breadths.push(0);
        tankComponents.push( <Tank num={tanks + 1 } addAtt={this.addAttribute}  key = {(tanks + 1).toString()} />);
        this.setState({tanks: tanks+1, tankComponents: tankComponents, lengths: lengths, breadths: breadths, heights: heights});
        tankComponents.map(tank =>{return tank})
    }

    addTank() {
        this.setState( {
            tank: this.state.tank + 1
        });
    }

    removetank() {
        let { tankComponents } = this.state;
        if(this.state.tanks!=0) {
            tankComponents.pop();
            this.setState( {
                tanks: this.state.tanks -1,
                tankComponents: tankComponents
            })
        }
    }

    addAttribute(tank, attribute, value){
        let {heights, lengths, breadths, tankTypes} = this.state
        switch(attribute){
            case 'height':{
                heights[tank-1] = value;
                break;
            }
            case 'length':{
                lengths[tank-1] = value;
                break;
            }
            case 'breadth':{
                breadths[tank-1] = value;
                break;
            }
            case 'select':{
                tankTypes[tank-1] = value;
            }
        }
        console.log(this.state.tanks);
        this.setState({heights: heights, lengths: lengths, breadths: breadths});
    }

    checkSelect() {

    }

    redirectFunction() {
        this.setState({
            isSubmitted: true
        });
        Store.getUser();
    }

    handleSubmit() {
        
        var storage = window.localStorage;
        var token = storage.getItem('token');
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        var { tanks, name, street, state, pincode }  = this.state;
        var { username } = Store.user;
        let isValid = true;
        var tankObjects = this.state.heights.map((height, i) => {
            return {
                tankType: this.state.tankTypes[i],
                height: height,
                length: this.state.lengths[i],
                breadth: this.state.breadths[i]
                
            }
        });
        tankObjects.map(item => { 
            if(item.tankType==undefined) {
                isValid = false
            }
        })
        if(!isValid) {
            this.setState({
                isError: true,
                errMessage: 'Please Choose type of tank'
            })
            return false;
            
        }
        axios.post('stp/add', {
            username,
            name,
            street,
            state,
            pincode,
            tanks,
            tankObjects
        }).then( data => data.data )
          .then( data => {
              this.setState({
                  isSubmitted: true,
              })
              Store.getUser();
          })
          .catch( err =>  console.log(err))
        
        
    }

    render(){
        const user = Store.user;
        if(user.stpId==null && !this.state.isSubmitted ) {
            if(user.role=='sup') {
                return (
                    <SelectStp user={user} redirectFunction={this.redirectFunction} />
                )
            }else {
                return (
                    // <Sidebar.Pusher style={{ 'paddingLeft': '150px','paddingTop': '0px', 'height': '1000px'}}>
                    <Sidebar.Pusher >
                    <Segment basic>
                    <Container>
                        <div>
                        <Form error={this.state.isError} onSubmit={this.handleSubmit}>
                        <Grid verticalAlign='middle' >
                        <Grid.Row>
                        <Header as='h1' icon textAlign='center' >
                            <Icon name='settings' color='black' circular/>
                            STP Setup page
                        </Header>
                        </Grid.Row>
                        <Grid.Row centered> 
                            
                            <Grid.Column width={6}>
                                    <Form.Field>
                                        <label>Name: </label>
                                        <Input type="text" placeholder="Name" onChange={(e)=>{this.setState({name:e.target.value})}} required />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Address: </label>
                                        <Input type="text" placeholder="Street/Locality" onChange={(e)=>{this.setState({street:e.target.value})}} required />
                                        <Input type="text" placeholder="District/State" onChange={(e)=>{this.setState({state:e.target.value})}} required />
                                        <Input type="text" placeholder="Pincode" onChange={(e)=>{this.setState({pincode:e.target.value})}} pattern="(\d{6})" required />

                                    </Form.Field>
                                    <Form.Field>
                                    <label> Enter Tanks:</label>
                                    </Form.Field>                           
                                    <Button secondary type="button" onClick={this.addtank} icon='plus'></Button>
                                    <Button secondary type="button" onClick={this.removetank} icon='minus'></Button>
                            </Grid.Column>
                            
                        </Grid.Row>
                        <Grid.Row centered column={12}>
                            {this.state.tankComponents.map(tankComp=>{
                                return tankComp;
                            })}
                        </Grid.Row>
                        <Grid.Row centered columns={12}>
                            <Grid.Column width={2} >
                                <Message error header='Error' content={this.state.errMessage} />    
                                <Button primary type="submit">Submit</Button>
                            </Grid.Column>
                        </Grid.Row>
                        </Grid>
                        </Form>
                        </div>
                    </Container>
                    </Segment>
                </Sidebar.Pusher>
                )
            }
        }
        else {
            if(this.state.isSubmitted) {
                return (
                    <Redirect to="/dashboard" />
                )
            }
            
        }
    }
}

class Tank extends Component{
    constructor(props){
        super(props);
        this.state={
            num : props.num,
            tank_type : '',
            height:0,
            length:0,
            breadth:0,
        }
        this.select = this.select.bind(this);
        this.changeBreadth = this.changeBreadth.bind(this);
        this.changeHeight = this.changeHeight.bind(this);
        this.changeLength = this.changeLength.bind(this);
        
    }

    callParentFunc(tankNum, attribute, value){
        this.props.addAtt(tankNum, attribute, value);
    }

    changeHeight(event){
        this.setState({height: event.target.value}, ()=>{
            this.callParentFunc(this.state.num, 'height', this.state.height);
        });
    }

    changeBreadth(event){
        this.setState({breadth: event.target.value}, ()=>{
            this.callParentFunc(this.state.num, 'breadth', this.state.breadth);
        });
    }

    changeLength(event){
        this.setState({length: event.target.value}, ()=>{
            this.callParentFunc(this.state.num, 'length', this.state.length);
        });
    }

    select(event, data) {
		this.setState({ tank_type : data.value }, ()=>{
            this.callParentFunc(this.state.num, 'select', this.state.tank_type);
        });
    }

    
    render(){
        return (
            <Grid.Column width={6} >
            <Form.Field control={Select} label={`Tank ${this.state.num} type`} options={opts} placeholder='Tank type...' onChange={this.select}  required/>
            <Form.Field required>
                <label>Tank {this.state.num} Dimensions:</label>
                <Input label={{ basic: true, content: 'm' }} labelPosition='right' type="number" placeholder="Length"  onChange={this.changeLength} required />
                <Input label={{ basic: true, content: 'm' }} labelPosition='right' type="number" placeholder="Breadth"  onChange={this.changeBreadth} required />
                <Input label={{ basic: true, content: 'm' }} labelPosition='right' type="number" placeholder="Height" onChange={this.changeHeight} required />
            </Form.Field>
            <br />
            </Grid.Column>

        )
    }
}

class SelectStp extends Component {
    constructor(props) {
        super(props);
        console.log("selectstp constructor")
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.select = this.select.bind(this);

    }


    componentWillMount() {
        this.setState({
            isError: false,
            errMessage: ''
        })
        axios.get("/stps")
            .then( data => {
                let stps= data.data;
                let stpOpts = stps.map( stp => {
                    return {
                        key: stp.id,
                        value: stp.id,
                        text: `${stp.name} ${stp.id}` 
                    }
                })
                this.setState({
                    opts: stpOpts,
                    isError: false,
                })
            })
            .catch( err => {
                this.setState({
                    isEror: true,
                    errMessage: err
                })
            })
        
    }

    handleSubmit() {
        axios.post("/stp/set", {
                stpId: this.state.stpValue,
                username: this.props.user.username
             })
            .then( data => {
                data = data.data;
                this.props.redirectFunction();
            })
            .catch( err => {
                console.log(err);
            })

    }

    select(event, data) {
        this.setState({
            stpValue: data.value
        })
    }

    render() {
        return (
            <Sidebar.Pusher >
                    <Segment basic>
                    <Container>
                        <div>
                        <Form error={this.state.isError} onSubmit={this.handleSubmit}>
                        <Grid verticalAlign='middle' >
                        <Grid.Row>
                        <Header as='h1' icon textAlign='center' >
                            <Icon name='settings' color='black' circular/>
                            STP Setup page
                        </Header>
                        </Grid.Row>
                        <Grid.Row centered>
                            <Form.Field control={Select}
                                label={`Select the STP you want to supervise`} options={this.state.opts} placeholder='Select Stp...' onChange={this.select}  required/>
                        </Grid.Row>
                        <Grid.Row centered>
                            <Message error header='Error' content={this.state.errMessage} />    
                            <Button primary type="submit">Submit</Button>
                        </Grid.Row>
                        </Grid>
                        </Form>
                        </div>
                    </Container>
                    </Segment>
                    </Sidebar.Pusher>
        )
    }
}

export default view(Setup);

