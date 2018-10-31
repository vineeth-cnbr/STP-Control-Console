import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
import { Select, Button, Form, Grid, Container, Message } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8080';

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
            hasCreated: false,
            name:'',
            password:'',
            email:'',
            username:'',
            role:'',
            phone:'',
        }
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    

    handleSubmit(){
        const { name, username, password, email, role, phone } = this.state;
        axios.post("/signup", {
                name,
                password,
                email,
                username,
                role,
                phone
            }).then( data =>{
                data = data.data;
                console.log(data);

            })
    
    }

    render(){
        return (
            <Container>
                <Grid>
                <Grid.Column width={6}>
                    <Form>
                        <br /><br />
                        <h1>New User Signup</h1>
                        <Form.Field>
                            <label>Name </label>
                            <input type='text' placeholder='Name' onChange={(e) => {this.setState({name: e.target.value})}} required />
                        </Form.Field>
                        
                        <Form.Field>
                            <label>Password </label>
                            <input type='password' placeholder='Password' onChange={(e) => {this.setState({password: e.target.value})}} required />
                        </Form.Field>

                        <Form.Field>
                            <label>email </label>
                            <input type='email' placeholder='e-mail Address' onChange={(e) => {this.setState({email: e.target.value})}} required />
                        </Form.Field>

                        <Form.Field>
                            <label>Username </label>
                            <input type='text' placeholder='Username' onChange={(e) => {this.setState({username: e.target.value})}} required />
                        </Form.Field>

                        <Form.Field>
                            <label>Role</label>
                            <Select placeholder="Role" options={opts} onChange={(e) => {this.setState({role: e.target.value})}} required/>
                        </Form.Field>

                        <Form.Field>
                            <label>Phone no. </label>
                            <input type='text' placeholder='Phone Number' onChange={(e) => {this.setState({phone: e.target.value})}} required />
                        </Form.Field>
                        { this.state.isError? <Message error header='Error' content={this.state.errMessage} /> :<br></br> }
                        <Button type='submit' onClick={this.handleSubmit}>Sign up</Button>
                    </Form>
                </Grid.Column>
                </Grid>
            </Container>
        )

    }
}

export default Signup;
//name pass e-mail username role phone