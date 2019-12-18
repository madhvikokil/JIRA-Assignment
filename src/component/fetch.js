import React from 'react';
import FetchApi from '../utility/fetchApi';
import FetchTable from '../utility/tableData';
import { Link } from 'react-router-dom';
import { Button ,button} from 'semantic-ui-react';
import '../utility/tableEdit.css';
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
        let anotherArray=[];
        let finalCount=0;
        for(let i =0;i<count ;i++){
          
           if(res.issues[i].fields.project.key ==  `${[project]}`){
            storyPoint =storyPoint +  res.issues[i].fields.customfield_10024;
            timeEstimate = timeEstimate + res.issues[i].fields.timeestimate;
            timeSpent = timeSpent + res.issues[i].fields.timespent;
            timeOriginalEstimate = timeOriginalEstimate + res.issues[i].fields.timeoriginalestimate;
            // console.log("isues of a project : ",res.issues[i].fields.project.key);
             console.log("name of the user' : ",res.issues[i].fields.assignee.name);
             anotherArray.push(res.issues[i].fields.assignee.name);
             console.log(anotherArray);
             
             console.log("length : ",anotherArray.length);
             
           }
           finalCount = anotherArray.length;
           
        }
        
        let value = Math.floor(timeSpent/3600)
        let value2 = Math.floor(timeOriginalEstimate/3600);
        let value3 = Math.floor(timeEstimate/3600)
        let obj ={
            user:res.issues[0].fields.assignee.name,
            issue_count : finalCount,
            story_Point:storyPoint,
            Original_Estimate_in_days:value2,
            remaining_Estimate_in_days:value3,
            time_Spent_in_days:value
            
            
        }
       
        console.log("pushed array : ",array);
        this.setState({actualData:[...this.state.actualData,obj]});
        if(this.state.data.length-1 == this.state.actualData.length-1){

          for(let i=0;i<this.state.actualData.length;i++){
            issueCountSum = issueCountSum + this.state.actualData[i].issue_count;
             storyPointSum = storyPointSum + this.state.actualData[i].story_Point;
            originalSum = originalSum + this.state.actualData[i].Original_Estimate_in_days;
            remainingSum = remainingSum + this.state.actualData[i].remaining_Estimate_in_days;
            spentSum = spentSum + this.state.actualData[i].time_Spent_in_days;
          }
          let obj2 = {
              issueCountSum : issueCountSum,
              storyPointSum : storyPointSum,
              originalSum : originalSum,
              remainingSum : remainingSum,
              spentSum : spentSum
          }
          this.setState({totalCount:obj2});
          localStorage.setItem('total',this.state.totalCount.issueCountSum);
          //console.log(...obj2);
          localStorage.setItem('issuecount',JSON.stringify(obj2));
          let s = JSON.parse(localStorage.getItem('issuecount'));
          console.log("s : " ,s);
         
          console.log("get Item : ",s.issueCountSum);
         
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


  render(){
    debugger;
    let posts ;
    if(this.state.actualData.length > 0) {
      posts =   <> <br/><p class="tableHeader">Release Multiple Output Statistics</p>
        <table class="table">
          <thead class="headerStyle">
           
            <tr >
              {FetchTable.tableHeader(this.state.actualData)}
              {/* {this.progressBar()} */}
            </tr>
          </thead>

          <tbody>
              {FetchTable.tableRow(this.state.actualData,this.state.totalCount)}
          </tbody>
          
          {this.state.totalCount ? 
          <tfoot >
            <tr class="specificRowBackground">
              <td class="editRow"><b>Total:</b> </td> {FetchTable.tableFooter(this.state.totalCount,'table1')}
            </tr>
             
         <tr class="editRow" >{this.state.totalCount.issueCountSum} Issue Count </tr>
         
      </tfoot>
      : null
          }
        </table><hr/> 
      <br/>
      
        </>
    }
  
  return(
      <><br />
  <Button class="ui button"  style={{float:'right'}} as={Link} to ='/logout'>Log out</Button><br /><br />
  {posts}
  <Button onClick={this.anotherTable}> Next >> </Button>
  {/* {this.progressBar()} */}
      
      </>

    )
  }
}


export default Fetch;