import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { Message, Select, Button, Form, Grid, Container, Divider } from 'semantic-ui-react';
import { Redirect, Link } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import { withCookies } from 'react-cookie';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			pw: "",
			sel: "",
			isError: false,
			errMessage: '',
			loggedIn: false
		}

		this.handleSubmit = this.handleSubmit.bind(this);
		this.namehandle = this.namehandle.bind(this);
		this.pwhandle = this.pwhandle.bind(this);
		this.select = this.select.bind(this);
	}
	componentWillMount() {
		this.setState({
			loggedIn: this.props.auth.isAuthenticated
		})

	}
	namehandle(event) {
		console.log(this.state.name);
		this.setState({ name: event.target.value });
	}
	pwhandle(event) {
		console.log(this.state.pw);
		this.setState({ pw: event.target.value });
	}
	select(event) {
		this.setState({ sel: event.target.value });
	}
	handleSubmit(event) {
		this.props.authenticate(this.state.name, this.state.pw).then(data => {
			const { code, message, iat, exp, token } = data;
			if(code == 1 ) {
				this.setState({
					isError: true,
					errMessage: message
				})
			}else if(code == 0) {
				console.log("auth", token, iat, exp);
				const { cookies } = this.props;
				cookies.set('token', token, { path: "/" })
				// axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
				this.setState({
					loggedIn: true
				})
				
			}
		});
		event.preventDefault();
	}
	render() {
		var { loggedIn } = this.state;
		console.log("inside render", loggedIn)
		// console.log("Cookies ", this.props.allCookies);
		if(!loggedIn) {
		return (
			<Container>
					<br /><br />
					<Grid centered columns={3} verticalAlign='middle'>
					<Grid.Row />
					<Grid.Row >
						<Grid.Column>
							<h1 align="center">Sewage Treatment plant</h1>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row >

						<Grid.Column>
						<div id='FormGrid'>
							<Form error  onSubmit={this.handleSubmit}>
								<Form.Field>
									<label>Username</label>
									<input placeholder='Username..' type='text' onChange={this.namehandle} required />
								</Form.Field>
								<Form.Field>
									<label>Password</label>
									<input placeholder='Password' type='password' onChange={this.pwhandle} required />
								</Form.Field>
								<Form.Field>
									<Select placeholder='Select your role' options={opts} onChange={this.select} required />
								</Form.Field>
							    { this.state.isError? <Message error header='Error' content={this.state.errMessage} /> :<br></br> }
								<Button type='submit'>Submit</Button>
							</Form>
						</div>
						<Divider horizontal>Or</Divider>
						<p>Not a member yet? <Link to="/signup">sign up</Link></p>
						<br />
						<p><a href='/forgot'>Forgot password?</a></p>							
						</Grid.Column>
					</Grid.Row>
					</Grid>
			</Container>

		);
		}else {
			console.log("inside redi")
			return (
				<Redirect to="/dashboard" />
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



export default withCookies(Login);
