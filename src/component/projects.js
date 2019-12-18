import React from 'react';
import FetchApi from '../utility/fetchApi';
import { Button } from 'semantic-ui-react';


class Projects extends React.Component{

    state ={
        projects:[],
        length:''
    }
    onClickHandler=(id)=>{
        console.log("id clicked :",id);
        localStorage.setItem('project',id);
        this.props.history.push('/tablesheet/table1');
    }
    componentDidMount(){
        
        let url = localStorage.getItem('url');
        let listOfProjects = [];
        let projectLength=0;
        FetchApi.callApi(`${url}/rest/api/3/project`)
        .then(res =>{
            // console.log("res",res);
            // console.log("res length : ",res.length);
            projectLength = res.length;
            for(let i=0;i<res.length;i++){
                console.log(res[i].key);
                this.setState({projects:[...this.state.projects,res[i].key]})
            }
            
        }).catch(error =>{
            console.log(error);
        })
    }
    render(){
        debugger;
        let project;
        if(this.state.projects.length > 0){
            project =
            this.state.projects.map(id => (<>
                <Button class="ui primary button" onClick={() =>this.onClickHandler(id)}>{id}</Button><br/><br/></>
            ))
           
            
        }
       
        
    
        return(
            <>
            <h2>List of Projects</h2>
            <br />
            {project}
            </>
        )
    }
}

export default Projects;