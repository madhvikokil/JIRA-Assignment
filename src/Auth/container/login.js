import React from 'react'
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import superagent from 'superagent';
import '../../Assets/loginError.css';
import FormElements from '../../utility/formElements'
import { withRouter } from 'react-router-dom';

class Login extends React.Component{

    constructor(props){
        super(props)
        this.state={

        }
    }
    state ={
        email:'',
        token:'',
        url:'',
        errDiv:''
    }

     showErrorMsg = (msg) => {
         let errorMsg = document.getElementById('errorField');
        errorMsg.className = "show";
        errorMsg.innerText = msg;
        setTimeout(function(){ errorMsg.className = errorMsg.className.replace("show", ""); },2000);
      }
    
    listOfProjects = () => {
        let errorMessage="Enter ";
        let flag = false;
        if(this.state.email === ""){
            flag = true;
            errorMessage += " Email";
        }
       
        if(this.state.token === ""){
            flag = true;
            errorMessage += " Token";
        }

        if(this.state.url === ""){
            flag = true;
            errorMessage += " Url";
        }
        
        if(flag)
            this.showErrorMsg(errorMessage);
        

        else{
            let a = window.btoa(`${this.state.email}:${this.state.token}`);
            console.log(a);
            localStorage.setItem('token',a);
            superagent
                .get(`${this.state.url}/rest/api/3/project`)
                .set('Access-Control-Allow-Credentials', '*')
                .set('Accept', 'application/json')
                .set('Authorization', `Basic ${a}`)
                .end((err, res) => {
                    if (err) { return alert("Invalid User",err)}
                    localStorage.setItem('url',`${this.state.url}`);
                    console.log("response : ",res.body);
                    console.log("Table routing");
                    alert("Successfully Logged...");
                    this.props.history.push('/tablesheet');
          
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

    changeToken = (event) => {
        this.setState({token : event.target.value})
    }

    changeUrl = (event) => {
        this.setState({url : event.target.value})
    }

    render(){
        console.log("props : ",this.props)
         let emailInput ={
           placeholder:"E-mail address",
           value:this.state.email,
           onChange:this.changeEmail,
           icon:"user",
           type:"email"
       }

       let tokenInput ={
        placeholder:"Token",
        value:this.state.token,
        onChange:this.changeToken,
        icon:"lock",
        type:"text"
       }

       let urlInput ={
        placeholder:"Url",
        value:this.state.url,
        onChange:this.changeUrl,
        icon:"lock",
        tyoe:"text"
       }
        
        return(<>
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h1' color='teal' textAlign='center'>
                Log-in to your account
                </Header>
               
                    <Form size='large'>
                        <Segment stacked>
                    
                    {this.props.inputhere(emailInput)}
                    {this.props.inputhere(tokenInput)}
                    {this.props.inputhere(urlInput)}

                    <Button color='teal' fluid size='large' onClick={this.listOfProjects}>
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

export default FormElements(withRouter(Login));