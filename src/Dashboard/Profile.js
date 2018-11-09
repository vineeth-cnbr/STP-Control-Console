import React, {Component} from 'react';
import { Loader, Modal, Select, Header, Icon, Table, Menu, Segment, Sidebar, Confirm, Message, Progress, Grid, Container, Button, Radio, Form, Input } from 'semantic-ui-react'
import axios from 'axios';
import { view } from 'react-easy-state';
import Store from '../Store';
import { Redirect } from 'react-router-dom';
axios.defaults.baseURL = 'http://localhost:8080';
const opts = [
    {
        key:'AR',
        value:'AR',
        text:'Aeration Tank'
    },
    {
        key:'DC',
        value:'DC',
        text:'Decan Tank'
    },
    {
        key:'CO',
        value:'CO',
        text:'Collection Tank'
    },

];

class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            updateObj : {
                name: Store.user.name,
                email: Store.user.email,
                phone: Store.user.phone
            },
            currentUser:  {
                name: Store.user.name,
                email: Store.user.email,
                phone: Store.user.phone
            },
            redirect : false,
            updateErr: true,
            open: false,
            errMessage: 'The updated values and current values cannot be same',
            result: 'show the modal to capture a result',
            
        }
        
        this.show = this.show.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    show(){
        console.log(this.state.open);
         this.setState({ open: true });
    }

    handleCancel(){
        this.setState({ result: 'cancelled', open: false });
    }

    handleConfirm(){
        this.setState({ result: 'confirmed', open: false, updateErr: true, errMessage: ''  });
        // console.log(this.state.updateObj);
        var bool = true;
        Object.keys(this.state.updateObj).map( (keys) =>{
                                                            console.log('handle confirm;')
                                                            console.log(this.state.currentUser[keys]!=this.state.updateObj[keys]);
                                                            if(this.state.currentUser[keys]!=this.state.updateObj[keys]){
                                                                console.log("changing to false");
                                                                // this.setState({ updateErr: false }, () => {console.log('new vavlue',this.state.updateErr);});
                                                                bool = false;
                                                            }
                                                            else{
                                                                // this.setState({errMessage: 'Value is same in '+keys})
                                                                console.log(this.state.updateErr);
                                                            }
                                                        });
        
        console.log('new val11',bool);
        console.log(this.state.errMessage)
        if(!bool){

            this.handleSubmit();

        }
        else{
            this.setState({
                updateErr: bool,
                errMessage: 'Make changes to edit your profile'
            })
            console.log(this.state.errMessage, this.state.updateErr);
        }
    }
        
    handleSubmit(){
        let username = Store.user.username;
        let name = this.state.updateObj['name'];
        let email = this.state.updateObj['email'];
        let phone = this.state.updateObj['phone'];
        axios.post('/profile/update',{
            name,
            email,
            phone,
            username
        }).then((data) =>{
            console.log(data.data.updated, 'is the new user');
            if(data.data.code == 200){
                Store.user.name = data.data.updated.name,
                Store.user.phone = data.data.updated.phone,
                Store.user.email = data.data.updated.email;
                this.setState({redirect : true});
            }
        })
    }


    render() {
        // let { redirect } = this.state;
        // if(redirect){
        //     return <Redirect to='/dashboard' />
        // }
        const user = Store.user;
        const stp = Store.stp;
        const tanks = Store.tanks;
        console.log("tanks")
        tanks.map(tank => console.log(tank.id))
        console.log(tanks);
        // console.log('checking', updateObj == currentUser)
        return (
            <Sidebar.Pusher style={{ 'paddingLeft': '150px','paddingTop': '0px','height': '1000px'}}>
            <Segment basic>
            <Container >
                <Grid>
                    <Grid.Row>
                    <Header as='h1' icon>
                        <Icon name='account settings' color='black' style={{textAlign: 'left'}}/>
                        Profile Settings
                    </Header>
                    </Grid.Row> 
                    <Grid.Row>
                        <Grid.Column width={6}>
                            <Form >
                                <Form.Field>
                                    <label>Name:</label>
                                    <Input name='username' defaultValue={user.name} onChange={(e,data)=>{let att = {}; att['name']=data.value; this.setState({updateObj: Object.assign(this.state.updateObj,att)})}} type="text" />
                                </Form.Field>
                                                                
                                <Form.Field>
                                    <label>Email:</label>
                                    <Input name='email' defaultValue={user.email} onChange={(e,data)=>{let att = {}; att['email']=data.value; this.setState({updateObj: Object.assign(this.state.updateObj,att)})}} type="email" />
                                </Form.Field>
                                
                                <Form.Field>
                                    <label>Phone:</label>
                                    <Input name='phone' defaultValue={user.phone} onChange={(e,data)=>{let att = {}; att['phone']=data.value; this.setState({updateObj: Object.assign(this.state.updateObj,att)})}} type="number" />
                                </Form.Field>
                            </Form>
                            <br/>
                            {!((this.state.currentUser.name == this.state.updateObj.name) && (this.state.currentUser.phone == this.state.updateObj.phone) && (this.state.currentUser.email == this.state.updateObj.email))?
                                <Button positive onClick={this.show} >Submit</Button>
                                : <Button negative onClick={this.show} disabled>Submit</Button>
                            }
                            
                            <Confirm open={this.state.open} onCancel={this.handleCancel} onConfirm={this.handleConfirm } />
                        </Grid.Column>
                        <Grid.Column width={6}>
                        {
                            (this.state.redirect)? <Message success header='Success' content='Updation completed successfully' /> : <br/>
                        }

                        {   ((this.state.currentUser.name == this.state.updateObj.name) && (this.state.currentUser.phone == this.state.updateObj.phone) && (this.state.currentUser.email == this.state.updateObj.email))?
                            <Message error header='Error' content={this.state.errMessage} /> 
                            : <br></br> }
                    </Grid.Column>
                    </Grid.Row>  
                    <Grid.Row>
                    <Header as='h2' icon>
                        <Icon name='plug' color='black' style={{textAlign: 'left'}}/>
                        STP Details
                    </Header>
                    </Grid.Row>  
                    <Grid.Row>
                        <Grid.Column width={6}>
                        <Form >
                                <Form.Field>
                                    <label>Name:</label>
                                    <Input value={stp.name} type="text" />
                                </Form.Field>
                                <h3>Number of tanks: {tanks.length}</h3>
                            </Form>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <TankTable tanks={tanks} />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>    
            </Container>
            
            
            </Segment>
            </Sidebar.Pusher>
        )
    }
}

class TankTable extends Component {
    constructor(props){
        super(props)
        this.state={
            modalState:false,
            tank_type : '',
            height:0,
            length:0,
            breadth:0,
            err:false,
            stpid: Store.stp.id,
        };

        this.changeBreadth = this.changeBreadth.bind(this);
        this.changeLength = this.changeLength.bind(this);
        this.changeHeight = this.changeHeight.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.select = this.select.bind(this);
    }



    handleSubmit(){
        let {length, breadth, height, stpid, tank_type} = this.state;
        axios.post('/tank/add',{
            length,
            breadth,
            height,
            stpid,
            tank_type
        }).then(data =>{
            console.log(data['dataValues']);
            Store.getUser();
            this.setState({modalState:false})
        })
        .catch(err =>{
            console.log(err);
        })
    }

    changeHeight(event){
        this.setState({
            err:false,
            height: event.target.value
        })
    }

    changeBreadth(event){
        this.setState({
            err:false,
            breadth: event.target.value
        })
    }

    changeLength(event){
        this.setState({
            err:false,
            length: event.target.value
        })
    }
    

    select(event, data) {
		this.setState({ tank_type : data.value });
    }

    render() {
        const tanks = this.props.tanks;
        const user = Store.user;
        return (
            <Table color='olive'>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                        <Table.HeaderCell>length</Table.HeaderCell>
                        <Table.HeaderCell>breadth</Table.HeaderCell>
                        <Table.HeaderCell>height</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {tanks.map(tank =>  (
                        <Table.Row>
                            <Table.Cell>{tank.id}</Table.Cell>
                            <Table.Cell><span style={{color: (tank.status)?'green':'red'}}>{tank.status? "On": "Off"}</span></Table.Cell>
                            <Table.Cell>{tank.length}m</Table.Cell>
                            <Table.Cell>{tank.breadth}m</Table.Cell>
                            <Table.Cell>{tank.height}m</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
                {(user.role=='sup')? '':
                    <Table.Footer fullWidth>
                    <Table.Row>
                        <Table.HeaderCell colSpan='4'>
                        <Modal open={this.state.modalState} fullWidth trigger={<Button onClick={()=>{this.setState({modalState:true})}} floated='left' icon labelPosition='left' primary size='tiny'>
                            <Icon name='user' /> Add Tank </Button>}>
                        
                                <Modal.Header>Tank details</Modal.Header>
                                <Modal.Content >
                                    <Form error={this.state.err}>
                                        <Form.Field control={Select} label={`Tank type`} options={opts} placeholder='Tank type...' onChange={this.select}  required />
                                        <Form.Field required>
                                            <Header>Tank Dimensions:</Header>
                                            <Input label={{ basic: true, content: 'm' }} labelPosition='right' type="number" placeholder="Length" onInput={this.validate}  onChange={this.changeLength} required />
                                            <Input label={{ basic: true, content: 'm' }} labelPosition='right' type="number" placeholder="Breadth" onInput={this.validate}  onChange={this.changeBreadth} required />
                                            <Input label={{ basic: true, content: 'm' }} labelPosition='right' type="number" placeholder="Height" onInput={this.validate} onChange={this.changeHeight} required />
                                        </Form.Field>
                                        <Button primary onClick={this.handleSubmit}>Submit</Button>
                                        <Button onClick={() =>this.setState({modalState:false})} negative>Cancel</Button>
                                    </Form>
                                </Modal.Content>
                                </Modal>
                        </Table.HeaderCell>
                        <Table.HeaderCell />
                        
                        
                        {/* <Table.HeaderCell />
                        <Table.HeaderCell />
                        <Table.HeaderCell /> */}
                    </Table.Row>
                </Table.Footer>
            
                }
                
            </Table>
        )
    }
}


  
export default view(Profile);