import React, { Component } from 'react';
// import logo from './logo.svg';
import '../misc/App.css';
import { Select, Button, Form, Grid, Container,Sidebar, Segment, Input } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import axios from 'axios';
import { Redirect } from 'react-router';
import { store, view } from 'react-easy-state';
import Store from '../Store';

const opts = [
    {
        key:'aeration',
        value:'air',
        text:'Aeration Tank'
    },
    {
        key:'decan',
        value:'decan',
        text:'Decan Tank'
    },
    {
        key:'set',
        value:'set',
        text:'settling Tank'
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
            isSubmitted: false
        }
        this.addtank = this.addtank.bind(this);
        this.addAttribute = this.addAttribute.bind(this);
        this.removetank = this.removetank.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    addtank(){
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

    handleSubmit() {
        var { tanks, name, street, state, pincode }  = this.state;
        var { username } = Store.user;
        var tankObjects = this.state.heights.map((height, i) => {
            return {
                tankType: this.state.tankTypes[i],
                height: height,
                length: this.state.lengths[i],
                breadth: this.state.breadths[i]
                
            }
        });
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
          })
          .catch( err =>  console.log(err))
        
        
    }

    render(){
        const user = Store.user;
        if(user.stpId==null && !this.state.isSubmitted ) {
            return (
                // <Sidebar.Pusher style={{ 'paddingLeft': '150px','paddingTop': '0px', 'height': '1000px'}}>
                <Sidebar.Pusher >
                <Segment basic>
                <Container>
                    <div>
                    <Grid verticalAlign='middle' >
                    
                    <Grid.Row centered> 
                        <Form error>
                        <Grid.Column width={6}>
                                <Form.Field>
                                    <label>Name: </label>
                                    <Input type="text" placeholder="Name" onChange={(e)=>{this.setState({name:e.target.value})}} pattern="(\D(\w+\s?)+)" required />
                                </Form.Field>
                                <Form.Field>
                                    <label>Address: </label>
                                    <Input type="text" placeholder="Street/Locality" onChange={(e)=>{this.setState({street:e.target.value})}} pattern="(\D(\w+\s?)+)" required />
                                    <Input type="text" placeholder="District/State" onChange={(e)=>{this.setState({state:e.target.value})}} pattern="(\D(\w+\s?)+)" required />
                                    <Input type="text" placeholder="Pincode" onChange={(e)=>{this.setState({pincode:e.target.value})}} pattern="(\d{6})" required />

                                </Form.Field>
                                <Form.Field>
                                <label> Enter Tanks:</label>
                                </Form.Field>                           
                                <Button secondary onClick = {this.addtank} icon='plus'></Button>
                                <Button secondary onClick = {this.removetank} icon='minus'></Button>
                        </Grid.Column>
                        </Form>
                    </Grid.Row>
                    <Grid.Row centered column={12}>
                        {this.state.tankComponents.map(tankComp=>{
                            return tankComp;
                        })}
                    </Grid.Row>
                    <Grid.Row centered columns={12}>
                        <Grid.Column width={2} >
                            <Button primary type="submit"  onClick = {this.handleSubmit}>Submit</Button>
                        </Grid.Column>
                    </Grid.Row>
                    </Grid>
                    </div>
                </Container>
                </Segment>
            </Sidebar.Pusher>
            )
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
            <Form >
            <Form.Field>
                <label>Tank {this.state.num} type</label>
                <Select placeholder={'Tank type...'} options={opts} onChange={this.select} required />
            </Form.Field>
            <Form.Field>
                <label>Tank {this.state.num} Dimensions:</label>
                <Input label={{ basic: true, content: 'm' }} labelPosition='right' type="text" placeholder="Length"  onChange={this.changeLength} required />
                <Input label={{ basic: true, content: 'm' }} labelPosition='right' type="text" placeholder="Breadth"  onChange={this.changeBreadth} required />
                <Input label={{ basic: true, content: 'm' }} labelPosition='right' type="text" placeholder="Height" onChange={this.changeHeight} required />
            </Form.Field>
            </Form>
            <br />
            </Grid.Column>

        )
    }
}

export default view(Setup);

