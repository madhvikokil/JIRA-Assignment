import React from 'react'
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import superagent from 'superagent';
import FetchApi from '../utility/fetchApi';


class Login extends React.Component{

    state ={
        email:'',
        password:'',
        url:''
    }
    
    routeToTables = () => {
        let a = window.btoa(`${this.state.email}:${this.state.password}`);
        console.log(a);
        localStorage.setItem('token',a);
        superagent
            .get(`${this.state.url}/rest/api/2/user/assignable/search?project=REAC`)
            .set('Access-Control-Allow-Credentials', '*')
            .set('Accept', 'application/json')
            .set('Authorization', `Basic ${a}`)
            .end((err, res) => {
                if (err) { return alert("Invalid User",err)}
                localStorage.setItem('url',`${this.state.url}`);
                console.log("response : ",res.body);
                console.log("Table routing");
                alert("Successfully Logged...");
                this.props.history.push('/tableSheet');
      
            })
        // FetchApi.callApi(`${this.state.url}/rest/api/2/user/assignable/search?project=REAC`)
        // .then(res=>{
        //     localStorage.setItem('url',`${this.state.url}`);
        //         console.log("response : ",res.body);
        //         console.log("Table routing");
        //         alert("Successfully Logged...");
        //         this.props.history.push('/tableSheet/table1');
        // }).catch(error=>{
        //     alert("Invalid User",error);
        // })
        
    }

    changeEmail = (event) => {
        this.setState({email : event.target.value})
    }

    changePassword = (event) => {
        this.setState({password : event.target.value})
    }

    changeUrl = (event) => {
        this.setState({url : event.target.value})
    }

    render(){
        return(
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h1' color='teal' textAlign='center'>
                Log-in to your account
                </Header>
                    <Form size='large'>
                        <Segment stacked>
                    <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' onChange={this.changeEmail}/>
            
                    <Form.Input
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='Token'
                    type='token'
                    onChange={this.changePassword}
                    />

                    <Form.Input
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='URL'
                    type='url'
                    onChange={this.changeUrl}
                    />
                    <Button color='teal' fluid size='large' onClick={this.routeToTables}>
                        Login
                    </Button>
                    </Segment>
                </Form>
      {/* <Message>
         New to us? <a href='#'>Sign Up</a> 
      </Message> */}
            </Grid.Column>
            </Grid>
        )
    }
}

export default Login;