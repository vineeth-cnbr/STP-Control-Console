import React, { Component } from 'react';
// import logo from './logo.svg';
import '../App.css';
import { Select, Button, Form, Grid, Container, Label } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

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
            'tanks':0,
            'tankComponents':[], 
            heights: [],
            breadths: [],
            lengths: [],
            tankTypes: [],
        }
        this.addtank = this.addtank.bind(this);
        this.addAttribute = this.addAttribute.bind(this);
    }

    addtank(){
        let { tanks, tankComponents, lengths, breadths, heights } = this.state;
        heights.push(0);
        lengths.push(0);
        breadths.push(0);
        tankComponents.push( <Tank num={tanks + 1 } addAtt={this.addAttribute}  />);
        this.setState({tanks: tanks+1, tankComponents: tankComponents, lengths: lengths, breadths: breadths, heights: heights});
        tankComponents.map(tank =>{return tank})
    }

    addAttribute(tank, attribute, value){
        let {heights, lengths, breadths} = this.state
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
        }
        console.log(this.state.heights);
        this.setState({heights: heights, lengths: lengths, breadths: breadths});
    }
    render(){
        return (
            <Container>
                <div>
                <Grid centered columns={3} verticalAlign='middle'>
                    <Grid.Column>
                        <Form error>
                            <Form.Field>
                                <Label>Name: </Label>
                                <input type="text" placeholder="Name" pattern="(\D(\w+\s?)+)" required />
                            </Form.Field>
                            <Form.Field>
                                <Label>Address: </Label>
                                <input type="text" placeholder="Street/Locality" pattern="(\D(\w+\s?)+)" required />
                                <input type="text" placeholder="District/State" pattern="(\D(\w+\s?)+)" required />
                                <input type="number" placeholder="Pincode" pattern="(\d{6})" required />

                            </Form.Field>
                            <div>
                            {this.state.tankComponents.map(tankComp=>{
                                return tankComp;
                            })}
                            </div>
                            <br />
                            <Button onClick = {this.addtank}>Add Tank</Button>
                        </Form>
                    </Grid.Column>
                </Grid>
                </div>
            </Container>
        )
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
        this.props.addAtt(tankNum, attribute, value)
    }

    changeHeight(event){
        this.setState({height: event.target.value}, ()=>{
            this.callParentFunc(this.state.num, 'height', this.state.height)
        });
    }

    changeBreadth(event){
        this.setState({breadth: event.target.value}, ()=>{
            this.callParentFunc(this.state.num, 'breadth', this.state.breadth)
        });
    }

    changeLength(event){
        this.setState({length: event.target.value}, ()=>{
            this.callParentFunc(this.state.num, 'length', this.state.length)
        });
    }

    select(event) {
		this.setState({ tank_type : event.target.value });
	}
    render(){
        return (
            <div>
            <Form.Field>
                <Label>Tank type</Label>
                <Select placeholder={'Tank type...'} options={opts} onChange={this.select} required />
            </Form.Field>
            <Form.Field>
                <Label>Tank {this.state.num} Dimensions:</Label>
                <input type="number" placeholder="Length"  onChange={this.changeLength} required />
                <input type="number" placeholder="Breadth"  onChange={this.changeBreadth} required />
                <input type="number" placeholder="Height" onChange={this.changeHeight} required />
            </Form.Field>
            </div>

        )
    }
}

export default Setup;

