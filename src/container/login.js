import React from 'react'
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import superagent from 'superagent';
import './loginError.css';

class Login extends React.Component{

    state ={
        email:'',
        password:'',
        url:'',
        errDiv:''
    }

     showErrorMsg=(msg)=> {
         let errorMsg = document.getElementById('errorField');
        errorMsg.className = "show";
        errorMsg.innerText = msg;
        setTimeout(function(){ errorMsg.className = errorMsg.className.replace("show", ""); },2000);
      }
    
    routeToTables = () => {
        let errorMessage="Enter ";
        let flag = false;
        if(this.state.email==""){
            flag = true;
            errorMessage += " Email";
        }
       
        if(this.state.password==""){
            flag = true;
            errorMessage += " Password";
        }

        if(this.state.url==""){
            flag = true;
            errorMessage += " Url";
        }
        
        if(flag)
            this.showErrorMsg(errorMessage);
        

        else{
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
        }


       
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
        return(<>
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h1' color='teal' textAlign='center'>
                Log-in to your account
                </Header>
               
                    <Form size='large'>
                        <Segment stacked>
                    <Form.Input 
                    fluid icon='user'
                     iconPosition='left' 
                     placeholder='E-mail address' 
                     class="required"
                     value={this.state.email}
                     onChange={this.changeEmail}
                     />
            
                    <Form.Input
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='Token'
                    type='token'
                    value={this.state.password}
                    class="required"
                    
                    onChange={this.changePassword}
                    />

                    <Form.Input
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='URL'
                    type='url'
                    value={this.state.url}
                    class="required"
                    onChange={this.changeUrl}
                    />
                    <Button color='teal' fluid size='large' onClick={this.routeToTables}>
                        Login
                    </Button>
                    </Segment>
                </Form>
            </Grid.Column>
            </Grid>

            <div id="errorField" class={this.state.errDiv}></div>
            </>
            
        )
    }
}

export default Login;