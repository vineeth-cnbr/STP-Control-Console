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
        }
    }
    render(){
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
                        <div id='tank-division'>
                            <tank num={this.state.tank}/>
                        </div>

                    </Form>
                </Grid.Column>
            </Grid>
            </div>
        </Container>
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
        <Form.Field>
            <Label>Tank type</Label>
            <Select placeholder='Tank type...' options={opts} onChange={this.select} required />
        </Form.Field>
        <Form.Field>
            <Label>Tank {`this.state.num`} Dimensions:</Label>
            <input type="number" placeholder="height"  name={(event)=> this.setState({ height: event.target.value})} required />
            <input type="number" placeholder="diameter" name="diameter{`this.state.num`}" required />
        </Form.Field>
    }
}

