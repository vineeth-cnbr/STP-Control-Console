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
const passSize = 4;


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
        this.passChange = this.passChange.bind(this);
        this.emailChange = this.emailChange.bind(this);
        this.phoneChange = this.phoneChange.bind(this);

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

    phoneChange(event){
        let regex = /^[0-9]{10}$/;
        this.setState({
            errMessage : '',
            isError:false,
        })
        if(regex.test(event.target.value) == true){
            this.setState({
                errMessage : '',
                isError:false,
            })
        }
        else{
            this.setState({
                errMessage : 'Phone number must contain 10 digits.',
                isError:true,
            })
        }
    }

    emailChange(event){
        let regex = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        this.setState({
            errMessage : '',
            isError:false,
        })
        if(regex.test(event.target.value) == true){
            this.setState({
                errMessage : '',
                isError:false,
            })
        }
        else{
            this.setState({
                errMessage : 'Please enter a valid email id.',
                isError:true,
            })
        }
    }

    passChange(event){
        let regex = /[a-zA-Z0-9!@#$%^&*()_+=<,.>?]{4,}/;
        this.setState({
            errMessage : '',
            isError:false,
        })
        console.log(event.target.value);
        if(regex.test(event.target.value) == true){
            this.setState({
                errMessage : '',
                isError:false,
            })
        }
        else{
            this.setState({
                errMessage : 'Password should be more than '+ passSize,
                isError:true,
            })
        }
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
        let regex = /[a-zA-Z]+([_\s\-]?[a-zA-Z0-9]){4,}/;
        if(regex.test(username) == true){
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
                console.log(err);
                this.setState({
                    isError: true,
                    isUsernameLoading: false,
                    errMessage: err,
                    usernameIcon: 'user',
                    usernameError: true,
                })
            })
        
        }
        else{
            this.setState({
                usernameIcon: 'times circle outline',
                usernameError: true,
                errMessage: 'Minimum length of username must be 4 characters',
                isError: true
            })
        }

        

    }

    render(){
        if(!this.state.hasCreated) {
            return (
                <div className='signup'>
                <Container>
                    <Grid>
                    <Grid.Column width={6}>
                        <Form onSubmit={this.handleSubmit}>
                            <br /><br />
                            <h1 style={{color: 'rgb(0,129,227)'}}>New User Signup</h1>
                            <Form.Field required>
                                <label>Name </label>
                                <Input type='text' iconPosition='left' icon='address card outline' name='name' placeholder='Name' onChange={this.addAtt} required />
                            </Form.Field>
                            
                            <Form.Field required>
                                <label>Password </label>
                                <Input type='password' iconPosition='left' icon='key' name='password' placeholder='Password' onInput={this.passChange} onChange={this.addAtt} required />
                            </Form.Field>

                            <Form.Field required>
                                <label>email </label>
                                <Input type='email' iconPosition='left' name='email' icon='mail' placeholder='e-mail Address' onInput={this.emailChange} onChange={this.addAtt} required />
                            </Form.Field>

                            <Form.Field error={this.state.usernameError} required>
                                <label>Username </label>
                                <Input type='text' iconPosition='left' name='username' error={this.state.usernameError} loading={this.state.isUsernameLoading} icon={this.state.usernameIcon} placeholder='Username' onInput={this.addAtt} onChange={this.onChangeUsername} required />
                            </Form.Field>

                            <Form.Field required>
                                <label>Role</label>
                                <Select placeholder="Role" name ='role' options={opts} onChange={this.selectRole} required/>
                            </Form.Field>

                            <Form.Field required>
                                <label>Phone no. </label>
                                <Input type='text' iconPosition='left' icon='phone' placeholder='Phone Number' onInput={this.phoneChange} onChange={(e) => {this.setState( { user: Object.assign(this.state.user,{phone: e.target.value})})}} required />
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
                </div>
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