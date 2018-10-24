import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { Message, Select, Button, Form, Grid, Container, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
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
            'tanks':1,
            'tankComponents':[
                <Tank num={1} />
            ]
        }
        this.addtank = this.addtank.bind(this);
    }

    addtank(){
        var { tankNum, tankComponents } = this.state;
        this.setState({tanks: tankNum+1, tankComponents: tankComponents.append(<Tank num={tankNum+1}/>)});
        // console.log(this.refs.newTank.value);
        console.log(document.getElementById('newTank').append(<Tank />));
        
        // console.log(<Tank />);
        // this.refs.newTank.value.append(<Tank num={this.state.tanks}/>)
        
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
                            <div ref='newTank' id='newTank'>
                                
                            </div>
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
            tank_type : ''
        }
        this.select = this.select.bind(this);

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
                <input type="number" placeholder="height"  value={(event)=> this.setState({ height: event.target.value})} required />
                <input type="number" placeholder="diameter" value={(event)=> this.setState({ diameter: event.target.value})} required />
            </Form.Field>
            </div>

        )
    }
}

export default Setup;

