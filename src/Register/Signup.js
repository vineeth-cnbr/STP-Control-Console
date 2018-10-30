import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
import { Select, Button, Form, Grid, Container, Label } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

const opts = [
	{
		key: 'admin',
		value: 'admin',
		// flag:'admin',
		text: 'Admin'
	},
	{
		key: 'op',
		value: 'op',
		// flag:'op',
		text: 'Operator'
	},
	{
		key: 'sup',
		value: 'sup',
		// flag:'sup',
		text: 'Supervisor'
	}
];

class Signup extends Component {
    constructor(props){
        super(props);
        this.state = {
            name:'',
            pass:'',
            email:'',
            uname:'',
            role:'',
            phone:'',
        }
    }
    
    render(){
        return (
            <Container>
                <div>
                    <Form>
                        <Form.Field>
                            <Label>Name </Label>
                            <input type='text' placeholder='Name' onChange={(e) => {this.setState({name: e.target.value})}} required />
                        </Form.Field>
                        
                        <Form.Field>
                            <Label>Password </Label>
                            <input type='password' placeholder='Password' onChange={(e) => {this.setState({pass: e.target.value})}} required />
                        </Form.Field>

                        <Form.Field>
                            <Label>email </Label>
                            <input type='email' placeholder='e-mail Address' onChange={(e) => {this.setState({email: e.target.value})}} required />
                        </Form.Field>

                        <Form.Field>
                            <Label>Username </Label>
                            <input type='text' placeholder='Username' onChange={(e) => {this.setState({uname: e.target.value})}} required />
                        </Form.Field>

                        <Form.Field>
                            <Label>Role</Label>
                            <Select placeholder="Role" options={opts} onChange={(e) => {this.setState({role: e.target.value})}} required/>
                        </Form.Field>

                        <Form.Field>
                            <Label>Phone no. </Label>
                            <input type='text' placeholder='Phone Number' onChange={(e) => {this.setState({phone: e.target.value})}} required />
                        </Form.Field>
                        <Button type='submit' onClick={null}>Submit</Button>
                    </Form>
                </div>
            </Container>
        )

    }
}

export default Signup;
//name pass e-mail username role phone