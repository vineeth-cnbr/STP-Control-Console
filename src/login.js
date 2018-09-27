import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import  {Message, Select, Button, Form, Grid, Container } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
var opts = [
    {
        key:'admin',
        value:'admin',
        // flag:'admin',
        text:'Admin'
    },
    {
        key:'op',
        value:'op',
        // flag:'op',
        text:'Operator'
    },
    {
        key:'sup',
        value:'sup',
        // flag:'sup',
        text:'Supervisor'
    }
];



class Login extends Component{
  constructor(props){
    super(props);
    this.state = {
      name : "",
      pw : "",
      sel: ""
    }
  this.handleSubmit = this.handleSubmit.bind(this);
  this.namehandle = this.namehandle.bind(this);
  this.pwhandle = this.pwhandle.bind(this);
  this.select = this.select.bind(this);
  }
  namehandle(event){
    // console.log(this.state.name);
    this.setState({name: event.target.value});
  }
  pwhandle(event){
    // console.log(this.state.name);
    this.setState({pw: event.target.value});
  }
  select(event){
    this.setState({sel: event.target.value});
  }
  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.name+"  "+ this.state.sel);
    event.preventDefault();
  }
  render()  {
    return(
        <Container>
            <div id='FormGrid'>
                <Grid centered columns={3} verticalAlign='middle' cenetered='true'>
                <Grid.Column>
                    <Form onSubmit={this.handleSubmit} error >
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
                        {/* <Message error header='Error' content='Please check the contents of the form' /> */}
                        <Button type='submit'>Submit</Button>
                    </Form> 
                </Grid.Column>
                </Grid>
            </div>
      </Container>

    );
  }
}



export default Login
