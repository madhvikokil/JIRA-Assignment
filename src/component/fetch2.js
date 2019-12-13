import React from 'react';
import FetchApi from '../utility/fetchApi';
import FetchTable from '../utility/fetchTable';
import { Button,Menu } from 'semantic-ui-react';
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
    // const data3 = await this.tableData();
    // console.log(data3);
  
    }

    tableData=()=>{
      FetchTable.tableHeader(this.state.data);
    }

    data =() =>{
     return new Promise( (resolve, reject) => {
      let url = localStorage.getItem('url');
      let arrayOfUsers = [];
      
      FetchApi.callApi(`${url}/rest/api/2/user/assignable/search?project=REAC`).then(res => {
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
                //let openStoryPoint=0;
                let acceptedStoryPoint=0;
                let resolvedStoryPoint=0;
                

                let storyPoint=0;
                let count = res.total;
                for(let i =0;i<count ;i++){
                  storyPoint =storyPoint +  res.issues[i].fields.customfield_10024;
                  
                    if(res.issues[i].fields.status.name == "In Progress"){
                        inProgressStoryPointCount = inProgressStoryPointCount + res.issues[i].fields.customfield_10024;
                        //progressSum = progressSum + inProgressStoryPointCount;
                        //totalArray.push(progressSum);
                       // console.log("sum : ",progressSum);
                      }
                    
                     if(res.issues[i].fields.status.name == "To Do"){
                        todoStoryPoint = todoStoryPoint + res.issues[i].fields.customfield_10024;
                         //todoSum = todoSum + todoStoryPoint;
                        // totalArray.push(todoSum);
                        // console.log("sum : ",todoSum);
                      }
                    
                      if(res.issues[i].fields.status.name == "Done"){
                        doneStoryPoint = doneStoryPoint + res.issues[i].fields.customfield_10024;
                         //doneSum = doneSum + doneStoryPoint;
                        // console.log("sum : ",doneSum);
                        // totalArray.push(doneSum);
                      }
                    
                       if(res.issues[i].fields.status.name == "Review"){
                        reviewStoryPoint = reviewStoryPoint + res.issues[i].fields.customfield_10024;
                        //reviewSum = reviewSum + reviewStoryPoint;
                        // console.log("sum : ",reviewSum);
                        // totalArray.push(reviewSum);
                      }
                    
                      //  if(res.body.issues[i].fields.status.name == "Open"){
                      //   openStoryPoint = openStoryPoint + res.body.issues[i].fields.customfield_10024;
                      // }
                    
                       if(res.issues[i].fields.status.name == "Accepted"){
                        acceptedStoryPoint = acceptedStoryPoint + res.issues[i].fields.customfield_10024;
                         //acceptedSum = acceptedSum + acceptedStoryPoint;
                        // console.log("sum : ",acceptedSum);
                        // totalArray.push(acceptedSum);
                      }
                    
                       if(res.issues[i].fields.status.name == "Resolved"){
                        resolvedStoryPoint = resolvedStoryPoint + res.issues[i].fields.customfield_10024;
                        // resolveSum = resolveSum + resolvedStoryPoint;
                        // console.log("sum : ",resolveSum);
                        // totalArray.push(resolveSum);
                      }

                }
                console.log(count);

               
                let obj ={
                    
                    assignee:res.issues[0].fields.assignee.name,
                    todo:todoStoryPoint,
                    //open_Story_Point:openStoryPoint,
                    accepted:acceptedStoryPoint,
                    in_Progress:inProgressStoryPointCount,
                    review:reviewStoryPoint,
                    resolved:resolvedStoryPoint,  
                    done:doneStoryPoint,

                    storyPoint:storyPoint
                    
                }
                this.setState({actualData:[...this.state.actualData,obj]});
                let totalObj = {
                   // todoCount : todoCount + this.state.actualData.todo,

                }
                
                if(this.state.data.length-1 == this.state.actualData.length-1){
          resolve(array);
        }
                // });
                // console.log("new Array : ",this.state.newArray);
        
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
          <tfoot>
              {/* Total : {FetchTable.tableFooter(this.state.totalCount)} */}
          </tfoot>
        </table> 
        <hr/>
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
