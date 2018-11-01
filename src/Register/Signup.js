import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
import { Select, Button, Form, Grid, Container, Message } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import axios from 'axios';
import { Redirect } from 'react-router';
axios.defaults.baseURL = 'http://localhost:8080';



class Signup extends Component {
    constructor(props){
        super(props);
        this.state = {
            hasCreated: false,
            isError: false,
            errMessage: '',
            user: {
                name:'',
                password:'',
                email:'',
                username:'',
                role:'',
                phone:''
            }
        }
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    

    handleSubmit(){
        this.setState({
            isError: false
        })
        const user = this.state.user;
        this.props.signup(user)
            .then( data => {
                this.setState({
                    hasCreated: true
                })
            })
            .catch( err => {
                this.setState( {
                    isError: true,
                    errMessage: err
                });
            });
    }

    handlename(event) {
        this.setState({
            user: Object.assign(this.state.user)
        })
    }

    render(){
        if(!this.state.hasCreated) {
            return (
                <Container>
                    <Grid>
                    <Grid.Column width={6}>
                        <Form>
                            <br /><br />
                            <h1>New User Signup</h1>
                            <Form.Field>
                                <label>Name </label>
                                <input type='text' placeholder='Name' onChange={(e) => {this.setState( { user: Object.assign(this.state.user,{name: e.target.value})})}} required />
                            </Form.Field>
                            
                            <Form.Field>
                                <label>Password </label>
                                <input type='password' placeholder='Password' onChange={(e) => {this.setState( { user: Object.assign(this.state.user,{password: e.target.value})})}} required />
                            </Form.Field>

                            <Form.Field>
                                <label>email </label>
                                <input type='email' placeholder='e-mail Address' onChange={(e) => {this.setState( { user: Object.assign(this.state.user,{email: e.target.value})})}} required />
                            </Form.Field>

                            <Form.Field>
                                <label>Username </label>
                                <input type='text' placeholder='Username' onChange={(e) => {this.setState( { user: Object.assign(this.state.user,{username: e.target.value})})}} required />
                            </Form.Field>

                            <Form.Field>
                                <label>Role</label>
                                <Select placeholder="Role" options={opts} onChange={(e,data) => {this.setState( { user: Object.assign(this.state.user,{role: data.value})});}} required/>
                            </Form.Field>

                            <Form.Field>
                                <label>Phone no. </label>
                                <input type='text' placeholder='Phone Number' onChange={(e) => {this.setState( { user: Object.assign(this.state.user,{phone: e.target.value})})}} required />
                            </Form.Field>
                            { this.state.isError? <Message error header='Error' content={this.state.errMessage} /> :<br></br> }
                            <Button primary type='submit' onClick={this.handleSubmit}>Sign up</Button>
                        </Form>
                    </Grid.Column>
                    <Grid.Column width={6}>
                    <br /><br />
                        { this.state.isError? 
                                <Message error header='Error' content={this.state.errMessage} /> 
                                : <br></br> }
                    </Grid.Column>
                    </Grid>
                </Container>
            )
        }
        else {
            return (
				<Redirect to="/" />
			)
        }

    }
}
var opts = [
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

export default Signup;
//name pass e-mail username role phone