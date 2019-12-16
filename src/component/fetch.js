import React from 'react';
import FetchApi from '../utility/fetchApi';
import FetchTable from '../utility/tableData';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import './fetch.css';


class Fetch extends React.Component{

  state={
        data:[],
        actualData:[],
        length:'',
        total:[]
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
        let issueCountSum = 0;
        let storyPointSum = 0;
        let originalSum = 0;
        let remainingSum = 0;
        let spentSum = 0;
        for(let i =0;i<count ;i++){
            storyPoint =storyPoint +  res.issues[i].fields.customfield_10024;
            timeEstimate = timeEstimate + res.issues[i].fields.timeestimate;
            timeSpent = timeSpent + res.issues[i].fields.timespent;
            timeOriginalEstimate = timeOriginalEstimate + res.issues[i].fields.timeoriginalestimate;
        }
 
        let obj ={
            user:res.issues[0].fields.assignee.name,
            issue_count : res.total,
            story_Point:storyPoint,
            Original_Estimate:timeOriginalEstimate/3600,
            remaining_Estimate:timeEstimate/3600,
            time_Spent:timeSpent/3600
            
            
        }
       
        console.log("pushed array : ",array);
        this.setState({actualData:[...this.state.actualData,obj]});
        if(this.state.data.length-1 == this.state.actualData.length-1){

          for(let i=0;i<this.state.actualData.length;i++){
            issueCountSum = issueCountSum + this.state.actualData[i].issue_count;
             storyPointSum = storyPointSum + this.state.actualData[i].story_Point;
            originalSum = originalSum + this.state.actualData[i].Original_Estimate;
            remainingSum = remainingSum + this.state.actualData[i].remaining_Estimate;
            spentSum = spentSum + this.state.actualData[i].time_Spent;
          }
          let obj2 = {
              issueCountSum : issueCountSum,
              storyPointSum : storyPointSum,
              originalSum : originalSum,
              remainingSum : remainingSum,
              spentSum : spentSum
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

    anotherTable=()=>{
      console.log("Next Table");
      this.props.history.push("/tableSheet/table2");
    }
       
  
  logoutHandler=() =>{
    console.log("logout");
  }

  progressBar=() => {
    console.log("progress bar")
    let issueCountTotal = 100;
    let refValue = 60;
    let di = refValue * 100 / issueCountTotal;
    let a = di + '%';
    console.log(di+'%');
    return(<>
      <div class="progress" width="100">
          <span class="progress-bar" style={{width:a}}>{a}</span>
      </div></>
    )
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
              {this.progressBar()}
            </tr>
          </thead>
          <tbody>
              {FetchTable.tableRow(this.state.actualData)}
          </tbody>
          {this.state.totalCount ? 
          <tfoot>
         <th>Total </th> {FetchTable.tableFooter(this.state.totalCount)}
                         
         
      </tfoot> : null
          }
          
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
  {this.progressBar()}
      
      </>

    )
  }
}


export default Fetch;