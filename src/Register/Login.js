import React, { Component } from 'react';
// import logo from './logo.svg';
import '../misc/App.css';
import { Message, Select, Button, Form, Grid, Container, Divider } from 'semantic-ui-react';
import { Redirect, Link } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import { withCookies } from 'react-cookie';
import { view } from 'react-easy-state';
import Store from '../Store';

class Login extends Component {
	constructor(props) {
		super(props);
		console.log("Constructor login ", Store.isAuthenticate, this.props.isAuthenticated)
		this.state = {
			name: "",
			pw: "",
			sel: "",
			isError: false,
			errMessage: '',
			loggedIn: this.props.isAuthenticated
		}

		this.handleSubmit = this.handleSubmit.bind(this);
		this.namehandle = this.namehandle.bind(this);
		this.pwhandle = this.pwhandle.bind(this);
		this.select = this.select.bind(this);
	}
	componentDidMount() {

		this.setState( {
			loggedIn: this.props.isAuthenticated
		});
		console.log("compwillmount ", this.props.isAuthenticated)

	}
	namehandle(event) {
		console.log(this.state.name);
		this.setState({ name: event.target.value });
	}
	pwhandle(event) {
		console.log(this.state.pw);
		this.setState({ pw: event.target.value });
	}
	select(event,data) {
		console.log(data.value);
		this.setState({ sel: data.value });
	}
	handleSubmit(event) {
		const { isAuthenticated, authenticate } = Store;
		authenticate(this.state.name, this.state.pw).then(data => {
			const { code, message, iat, exp, token } = data;
			if(code == 1 ) {
				this.setState({
					isError: true,
					errMessage: message
				})
			}else if(code == 0) {
				console.log("auth", token, iat, exp);
				var storage = window.localStorage;
				storage.setItem('token', token);
				// axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
				this.setState({
					loggedIn: true,
					isError: false
				})
				
			}
		});
		event.preventDefault();
	}
	render() {

		var loggedIn = Store.isAuthenticated;
		var user = Store.user;

		console.log("Login render", loggedIn, user)
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
							<Form error={this.state.isError}  onSubmit={this.handleSubmit}>
								<Form.Field>
									<label>Username</label>
									<input placeholder='Username..' type='text' onChange={this.namehandle} required />
								</Form.Field>
								<Form.Field>
									<label>Password</label>
									<input placeholder='Password' type='password' onChange={this.pwhandle} required />
								</Form.Field>
								{/* <Form.Field>
									<Select placeholder='Select your role' options={opts} onChange={this.select} required />
								</Form.Field> */}
							    <Message error header='Error' content={this.state.errMessage} />
								<Button primary type='submit'>Submit</Button>
							</Form>
						</div>
						<Divider horizontal>Or</Divider>
						<p>Not a member yet? <Link to="/signup">sign up</Link></p>
						<br />
						{/* <p><a href='/forgot'>Forgot password?</a></p>							 */}
						</Grid.Column>
					</Grid.Row>
					</Grid>
			</Container>

		);
		}else {
			
			console.log("Redirect")
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



export default Login;
