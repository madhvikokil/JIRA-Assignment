import React from 'react';
import FetchApi from '../utility/fetchApi';
import FetchTable from '../utility/tableData';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Fetch2 extends React.Component{

  state={
        data:[],
        actualData:[],
        length:'',
        totalCount:[]
  }

  componentDidMount =async()=>{ 

    const data1 = await this.data();
    console.log("DATA 1 ===>>>", data1);
    const data2 = await this.data2();
    console.log("Data 2  => ",data2);
    console.log("updated array : ",this.state.actualData);
    }

    tableData=()=>{
      FetchTable.tableHeader(this.state.data);
    }

    data =() =>{
      let project = localStorage.getItem('project');
     return new Promise( (resolve, reject) => {
      let url = localStorage.getItem('url');
      let arrayOfUsers = [];
      
      FetchApi.callApi(`${url}/rest/api/2/user/assignable/search?project=${project}`).then(res => {
        console.log("response : ",res);
        console.log(res.length);
        for(let i=0;i<res.length;i++){
              arrayOfUsers.push(res[i].name);
            }
            this.setState({data : arrayOfUsers});
            resolve(arrayOfUsers);
         
          }).catch(error => {
        console.log("error : ",error);
        reject(error);
          })

     } )
    }

    data2=()=>{
      let project = localStorage.getItem('project');
      let url = localStorage.getItem('url');
      let array = [];
      return new Promise( (resolve, reject) => {

      for(let i=0;i<this.state.data.length;i++){
        const api = FetchApi.callApi(`${url}/rest/api/3/search?jql=assignee=${this.state.data[i]}`);
      api.then(res => {
        console.log("response after data fetching : ",res);
                let inProgressStoryPointCount=0;
                let todoStoryPoint=0;
                let doneStoryPoint=0;
                let reviewStoryPoint=0;
                let acceptedStoryPoint=0;
                let resolvedStoryPoint=0;
                let inProgressSum=0;
                let acceptedSum=0;
                let todoSum = 0;
                let reviewSum = 0;
                let resolvedSum = 0;
                let doneSum = 0;
                let storyPointSum = 0;
                let anotherArray = [];
                let storyPoint=0;
                let finalCount=0;
                let count = res.total;
                for(let i =0;i<count ;i++){
                  if(res.issues[i].fields.project.key ==  `${[project]}`){
                    console.log("name of the user' : ",res.issues[i].fields.assignee.name);
                    anotherArray.push(res.issues[i].fields.assignee.name);
                    console.log(anotherArray);
                    
                    console.log("length : ",anotherArray.length);

                    storyPoint =storyPoint +  res.issues[i].fields.customfield_10024;
                  
                    if(res.issues[i].fields.status.name == "In Progress"){
                        inProgressStoryPointCount = inProgressStoryPointCount + res.issues[i].fields.customfield_10024;
                        
                      }
                    
                     if(res.issues[i].fields.status.name == "To Do" || res.issues[i].fields.status.name == "Open"){
                        todoStoryPoint = todoStoryPoint + res.issues[i].fields.customfield_10024;
            
                      }
                    
                      if(res.issues[i].fields.status.name == "Done"){
                        doneStoryPoint = doneStoryPoint + res.issues[i].fields.customfield_10024;
                    
                      }
                    
                       if(res.issues[i].fields.status.name == "Review"){
                        reviewStoryPoint = reviewStoryPoint + res.issues[i].fields.customfield_10024;
                        
                      }

                       if(res.issues[i].fields.status.name == "Accepted"){
                        acceptedStoryPoint = acceptedStoryPoint + res.issues[i].fields.customfield_10024;
                      }
                    
                       if(res.issues[i].fields.status.name == "Resolved"){
                        resolvedStoryPoint = resolvedStoryPoint + res.issues[i].fields.customfield_10024;
                      }

                  }
                  finalCount = anotherArray.length;

                  
                }
                console.log(count);

               let obj ={
                    //issue_count : finalCount,
                    assignee:res.issues[0].fields.assignee.name,
                    open:todoStoryPoint,
                    accepted:acceptedStoryPoint,
                    in_Progress:inProgressStoryPointCount,
                    review:reviewStoryPoint,
                    resolved:resolvedStoryPoint,  
                    done:doneStoryPoint,

                    storyPoint:storyPoint
                }

                let issueLength ={}
                this.setState({actualData:[...this.state.actualData,obj]});
                         
                if(this.state.data.length-1 == this.state.actualData.length-1){
                  for(let i=0;i<this.state.actualData.length;i++){
                    inProgressSum = inProgressSum + this.state.actualData[i].in_Progress;
                    acceptedSum = acceptedSum + this.state.actualData[i].accepted;
                    todoSum = todoSum + this.state.actualData[i].open;
                    reviewSum = reviewSum + this.state.actualData[i].review;
                    resolvedSum = resolvedSum + this.state.actualData[i].resolved;
                    doneSum = doneSum + this.state.actualData[i].done;
                    storyPointSum = storyPointSum + this.state.actualData[i].storyPoint;
                  }
                  let obj2 = {
                    todoSum :todoSum,
                    acceptedSum :acceptedSum,
                    inProgressSum:inProgressSum,
                    reviewSum :reviewSum,
                    resolvedSum :resolvedSum,
                    doneSum :doneSum,
                    storyPointSum:storyPointSum
                  }
                this.setState({totalCount:obj2});
                resolve(array);
            }

      }).catch(error => {
        console.log("error : ",error);
        reject(error);
          })
      }  
    })
  }
    
    lastTable=()=>{
        this.props.history.goBack();
    }

    progressBar =() =>{
      console.log("Showing the progress bars");
    }
   
   
  render(){
    debugger;
    let posts ;
    if(this.state.actualData.length > 0) {
      posts =   <>
        <table class="table">
          <thead class="thead-dark">
            <tr>
              {FetchTable.tableHeader(this.state.actualData)}
            </tr>
          </thead>

          <tbody>
              {FetchTable.tableRow(this.state.actualData)}
          </tbody>
        {this.state.totalCount ? 

          <tfoot>
            <tr>
              <th>Total</th>{FetchTable.tableFooter(this.state.totalCount)}
            </tr>
        
          </tfoot>
        :null}   
       </table> 
        <br/>
        </>
    }
  
  return(
      <><br />
  <h1>Story Points by Assignee and Status</h1>
  <Button class="ui button"  as={Link} to ='/logout'>Log out</Button>  <br /><br />
  {posts}
  <Button onClick={this.lastTable}>  Previous  </Button>

      </>

    )
  }
}

export default Fetch2;
