import React from 'react';
import FetchApi from '../utility/fetchApi';
import FetchTable from '../utility/fetchTable';
import { Link } from 'react-router-dom';
import { Button,Menu } from 'semantic-ui-react';


class Fetch extends React.Component{

  state={
        data:[],
        actualData:[],
        length:''
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
        let timeOriginalEstimate = 0;
        let storyPoint=0;
        let timeEstimate=0;
        let timeSpent=0;
        let count = res.total;
        for(let i =0;i<count ;i++){
            storyPoint =storyPoint +  res.issues[i].fields.customfield_10024;
            timeEstimate = timeEstimate + res.issues[i].fields.timeestimate;
            timeSpent = timeSpent + res.issues[i].fields.timespent;
            timeOriginalEstimate = timeOriginalEstimate + res.issues[i].fields.timeoriginalestimate;
        }
        //console.log(count);
        let obj ={
            user:res.issues[0].fields.assignee.name,
            issue_count : res.total,
            story_Point:storyPoint,
            Original_Estimate:timeOriginalEstimate/3600,
            remaining_Estimate:timeEstimate/3600,
            time_Spent:timeSpent/3600
            // issueLength:res.issue.length()
        }
        // array.push(obj);
        // let s = [...obj];
        console.log("pushed array : ",array);
        this.setState({actualData:[...this.state.actualData,obj]});
        if(this.state.data.length-1 == this.state.actualData.length-1){
          resolve(array);
        }
        
      }).catch(error => {
        console.log("error : ",error);
        reject(error);
          })
      }  
        })
      

    }

    anotherTable=()=>{
      console.log("Next Table");
      this.props.history.push("/tableSheet/table2");
    }
        // if(arrayOfUsers.length == 5){
        //   for(let i=0;i<5;i++){
        //     const anotherApi =  FetchApi.callApi(`${url}/rest/api/3/search?jql=assignee=${arrayOfUsers[i]}`);
        //     anotherApi.then(response => {
        //       console.log("response : ",response);
        //     })
        //   }
         
        // }
         
        
        
        
    // <FetchApi url='https://madhvi.atlassian.net/rest/api/2/user/assignable/search?project=REAC'/>
    //url ={'https://madhvi.atlassian.net/rest/api/2/user/assignable/search?project=REAC'}/>
  //   // superagent
  //   // .get(`https://madhvi.atlassian.net/rest/api/2/user/assignable/search?project=REAC`)
  //   // .set('Access-Control-Allow-Credentials', '*')
  //   // .set('Accept', 'application/json')
  //   // .set('Authorization', 'Basic dmFpc2huYXZpLmphd2FuamFsQGN1ZWxvZ2ljLmNvbTo3NmNVSXByaXVDaDlpTm1jZHJXZTA3RDQ=')
   
  //   console.log("response : ",response.body.length);
  //   for(let i=0;i<response.body.length;i++){
  //     arrayOfUsers.push(response.body[i].key);
      
  //   }
  //   console.log("array : ",arrayOfUsers);
    
  //   for(let i=0;i<arrayOfUsers.length;i++){
  //     const re = await 
  //     superagent
  //     .get(`https://madhvi.atlassian.net/rest/api/3/search?jql=assignee=${arrayOfUsers[i]}`)
  //     .set('Access-Control-Allow-Credentials', '*')
  //     .set('Accept', 'application/json')
  //     .set('Authorization', 'Basic dmFpc2huYXZpLmphd2FuamFsQGN1ZWxvZ2ljLmNvbTo3NmNVSXByaXVDaDlpTm1jZHJXZTA3RDQ=')
     
  //     .end((err, res) => {
  //       if (err) { return console.log("error : ",err); }
  //       console.log("url 2 ");
  //     let timeOriginalEstimate = 0;
  //     let storyPoint=0;
  //     let timeEstimate=0;
  //     let timeSpent=0;
  //     let count = res.total;
  //     for(let i =0;i<count ;i++){
  //         storyPoint =storyPoint +  res.issues[i].fields.customfield_10024;
  //         timeEstimate = timeEstimate + res.issues[i].fields.timeestimate;
  //         timeSpent = timeSpent + res.issues[i].fields.timespent;
  //         timeOriginalEstimate = timeOriginalEstimate + res.issues[i].fields.timeoriginalestimate;
  //     }
      
  //    obj ={
  //         total : res.total,
  //         user:res.issues[0].fields.assignee.name,
  //         timeOriginalEstimate:timeOriginalEstimate/3600,
  //         storyPoint:storyPoint,
  //         timeEstimate:timeEstimate/3600,
  //         timeSpent:timeSpent/3600
  //         // issueLength:res.issue.length()
  //     }
  //     dataOfUsers.push(obj);
  //     })
  //   }
  //   //this.setState({actualData:obj});
    
  //   this.setState({actualData:dataOfUsers});
  //   console.log("this.state.actualData : ", this.state.actualData);
   
  // }

  // getKeys=() => {
  //   console.log("get ");
  
  logoutHandler=() =>{
    console.log("logout");
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
              {FetchTable.tableFooter(this.state.actualData)}
          </tfoot>
        </table><hr/> 
      <br/>
      
        </>
    }
  
  return(
      <><br />
  <h1>Release Multiple Output Statistics</h1>
  <Button class="ui right floated  button"  as={Link} to ='/logout'>Log out</Button>
  <br /><br />
  {posts}
  <Button onClick={this.anotherTable}> Next >> </Button>
      
      </>

    )
  }
}


export default Fetch;