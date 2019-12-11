import React from 'react';
import superagent from 'superagent';
import { Button,Menu } from 'semantic-ui-react';
import { Redirect,Link } from 'react-router-dom';
import Users from '../component/user';

class FetchData extends React.Component{
   
    state ={
        usersArray:{},
        userData:[],
       newArray:[]
       
    }

    logoutHandler = () => {
        console.log("logout");
        localStorage.clear('url');
    }

    anotherTable =() => {
        this.props.history.push('/tableSheet/table2')
    }

    componentDidMount(){
        let array=[];
        let url = localStorage.getItem('url');
        console.log(url);
        superagent
            .get(`${url}/rest/api/2/user/assignable/search?project=REAC`)
            .set('Access-Control-Allow-Credentials', '*')
            .set('Accept', 'application/json')
            .set('Authorization', 'Basic dmFpc2huYXZpLmphd2FuamFsQGN1ZWxvZ2ljLmNvbTo3NmNVSXByaXVDaDlpTm1jZHJXZTA3RDQ=')
            
            .end((err, res) => {
                if (err) { return console.log("eeeeee : ",err); }
                this.setState({usersArray:res.body})
                let s = Object.keys(this.state.usersArray).length;

                for(let i=0;i<s;i++){

                    array.push(this.state.usersArray[i].name); 
                   //dmFpc2huYXZpLmphd2FuamFsQGN1ZWxvZ2ljLmNvbTo3NmNVSXByaXVDaDlpTm1jZHJXZTA3RDQ=
               superagent
              .get(`${url}/rest/api/3/search?jql=assignee=${array[i]}`)
              .set('Access-Control-Allow-Credentials', '*')
              .set('Accept', 'application/json')
              .set('Authorization', 'Basic dmFpc2huYXZpLmphd2FuamFsQGN1ZWxvZ2ljLmNvbTo3NmNVSXByaXVDaDlpTm1jZHJXZTA3RDQ=')
              
             .end((err, res) => {
                  if (err) { return console.log("error : ",err); }
                console.log('this.state ->', this.state.newArray);
                let timeOriginalEstimate = 0;
                let storyPoint=0;
                let timeEstimate=0;
                let timeSpent=0;
                let count = res.body.total;
                for(let i =0;i<count ;i++){
                    storyPoint =storyPoint +  res.body.issues[i].fields.customfield_10024;
                    timeEstimate = timeEstimate + res.body.issues[i].fields.timeestimate;
                    timeSpent = timeSpent + res.body.issues[i].fields.timespent;
                    timeOriginalEstimate = timeOriginalEstimate + res.body.issues[i].fields.timeoriginalestimate;
                }
                console.log(count);
                let obj ={
                    total : res.body.total,
                    user:res.body.issues[0].fields.assignee.name,
                    timeOriginalEstimate:timeOriginalEstimate,
                    storyPoint:storyPoint,
                    timeEstimate:timeEstimate,
                    timeSpent:timeSpent
                    // issueLength:res.body.issue.length()
                }
                  this.setState({newArray: [...this.state.newArray, obj]
                });
                console.log("new Array : ",this.state.newArray);
            
                
             
        })
               }
              },
            );
    }


    render(){
         //debugger;

       let posts = 
        
       <table class="table">
       <thead class="thead-dark">
               
               <tr>
               <th scope="col"><b>User</b></th>
               <th scope="col"><b>Issue Count</b></th>
               <th scope="col"><b>Story Points</b></th>
               <th scope="col"><b>Original Estimate(in secs)</b></th>
               <th scope="col"><b>Remaining Estimate(in secs)</b></th>
               <th scope="col"><b>Time Spent(in secs)</b></th>
                       
                       
                   </tr> 
                   </thead>
                   
                 {this.state.newArray.map(l => (      //array to array of JSX
                
                    <Users user={l.user} 
                           total={l.total}
                           storyPoint={l.storyPoint}
                           timeOriginalEstimate={l.timeOriginalEstimate}
                           timeEstimate={l.timeEstimate}
                           timeSpent={l.timeSpent} />
                ))}
                
                </table>
                       
        //console.log("arrayss : ",this.state.arrays);
        return(
            <><br/>
            <h3>Release Multiple Output Statistics</h3><br/>
   
            
   
{/*         
        <button class="ui right floated primary button" as={Link} to="/logout"> Some Action</button> */}
  

            <Button class="ui right floated primary button"  as={Link} to ='/logout'>Log out</Button>
            
           {posts}
           <hr/>
           <button onClick={this.anotherTable}> Next >> </button>
           
            
         
            </>
        )
    }
}

export default FetchData;
