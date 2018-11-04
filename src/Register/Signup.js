import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
import { Select, Button, Form, Grid, Container, Message, Input } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import axios from 'axios';
import { Redirect } from 'react-router';
import { view } from 'react-easy-state';
import Store from '../Store';
axios.defaults.baseURL = 'http://localhost:8080';



class Signup extends Component {
    constructor(props){
        super(props);
        this.state = {
            hasCreated: false,
            isError: false,
            errMessage: '',
            isUsernameLoading: false,
            usernameIcon: 'user',
            usernameError: false,
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
        this.addAtt = this.addAtt.bind(this);
        this.selectRole = this.selectRole.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
    }
    

    handleSubmit(){
        console.log("onsubmit")
        this.setState({
            isError: false
        })
        const user = this.state.user;
        const { signup } = Store;
        signup(user)
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
        
        // this.setState({
        //     user: Object.assign(this.state.user)
        // })
    }

    addAtt(event) {
        console.log(event.target.name);
        let att = {};
        att[event.target.name] = event.target.value;
        this.setState({
            user: Object.assign(this.state.user, att)
        });
    }

    selectRole(e, data) {
        // console.log(event.target.name);
        let att = {};
        att['role'] = data.value;
        this.setState({
            user: Object.assign(this.state.user, att)
        });
    }
    
    onChangeUsername(event) {
        let username = this.state.user.username;
        this.setState({
            isUsernameLoading: true,
            isError: false,
            usernameError: false
        })
        axios.post('/username', {
            username
        }).then( data => {
            data = data.data;
            console.log(data);
            this.setState({
                isUsernameLoading: false
            })
            if(data==null) {
                this.setState({
                    usernameIcon: 'thumbs up'
                })
            }else {
                this.setState({
                    usernameIcon: 'times circle outline',
                    usernameError: true,
                    errMessage: 'Username already exists',
                    isError: true
                })
            }
        }).catch( err => {
            this.setState({
                isError: true,
                isUsernameLoading: false,
                errMessage: err,
                usernameIcon: 'user',
                usernameError: true,
            })
        })


    }

    render(){
        if(!this.state.hasCreated) {
            return (
                <Container>
                    <Grid>
                    <Grid.Column width={6}>
                        <Form onSubmit={this.handleSubmit}>
                            <br /><br />
                            <h1 style={{color: 'rgb(0,129,227)'}}>New User Signup</h1>
                            <Form.Field>
                                <label>Name </label>
                                <Input type='text' iconPosition='left' icon='address card outline' name='name' placeholder='Name' onChange={this.addAtt} required />
                            </Form.Field>
                            
                            <Form.Field>
                                <label>Password </label>
                                <Input type='password' iconPosition='left' icon='key' name='password' placeholder='Password' onChange={this.addAtt} required />
                            </Form.Field>

                            <Form.Field>
                                <label>email </label>
                                <Input type='email' iconPosition='left' name='email' icon='mail' placeholder='e-mail Address' onChange={this.addAtt} required />
                            </Form.Field>

                            <Form.Field error={this.state.usernameError}>
                                <label>Username </label>
                                <Input type='text' iconPosition='left' name='username' error={this.state.usernameError} loading={this.state.isUsernameLoading} icon={this.state.usernameIcon} placeholder='Username' onInput={this.addAtt} onChange={this.onChangeUsername} required />
                            </Form.Field>

                            <Form.Field>
                                <label>Role</label>
                                <Select placeholder="Role" name ='role' options={opts} onChange={this.selectRole} required/>
                            </Form.Field>

                            <Form.Field>
                                <label>Phone no. </label>
                                <Input type='text' iconPosition='left' icon='phone' placeholder='Phone Number' onChange={(e) => {this.setState( { user: Object.assign(this.state.user,{phone: e.target.value})})}} required />
                            </Form.Field>
                            {/* { this.state.isError? <Message error header='Error' content={this.state.errMessage} /> :<br></br> } */}
                            <Button primary type='submit'>Sign up</Button>
                        </Form>
                    </Grid.Column>
                    <Grid.Column />
                    <Grid.Column width={6}>
                    <br /><br /><br />
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

export default view(Signup);
//name pass e-mail username role phone