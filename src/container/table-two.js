import React from 'react';
import superagent from 'superagent';
import { Link } from 'react-router-dom';
import { Button} from 'semantic-ui-react';
import Users from '../component/user';

class FetchData2 extends React.Component{
   
    state ={
        usersArray:{},
        userData:[],
        newArray:[],
        totalArray:[]
       
    }
    table1 =() => {
      this.props.history.goBack();
    }

    componentDidMount(){
     
        let array=[];
        let totalArray=[];
        let url = localStorage.getItem('url');
        superagent
            .get(`${url}/rest/api/2/user/assignable/search?project=JAV`)
            .set('Access-Control-Allow-Credentials', '*')
            .set('Accept', 'application/json')
            .set('Authorization', 'Basic bWFkaHZpa29raWxAZ21haWwuY29tOm1TOVlqRk43TjkyRUUzTHFYMGtkQjNBOA==')
            
            .end((err, res) => {
                if (err) { return console.log("eeeeee : ",err); }
                this.setState({usersArray:res.body})
                let s = Object.keys(this.state.usersArray).length;

                for(let i=0;i<s;i++){

                    array.push(this.state.usersArray[i].key); 
                   
               superagent
              .get(`${url}/rest/api/3/search?jql=assignee=${array[i]}`)
              .set('Access-Control-Allow-Credentials', '*')
              .set('Accept', 'application/json')
              .set('Authorization', 'Basic bWFkaHZpa29raWxAZ21haWwuY29tOm1TOVlqRk43TjkyRUUzTHFYMGtkQjNBOA==')
              .end((err, res) => {
                  if (err) { return console.log("error : ",err); }
                console.log('this.state ->', this.state.newArray);
                let inProgressStoryPointCount=0;
                let todoStoryPoint=0;
                let doneStoryPoint=0;
                let reviewStoryPoint=0;
                let openStoryPoint=0;
                let acceptedStoryPoint=0;
                let resolvedStoryPoint=0;
                
                let storyPoint=0;
                let count = res.body.total;
                for(let i =0;i<count ;i++){
                  storyPoint =storyPoint +  res.body.issues[i].fields.customfield_10024;
                  
                    if(res.body.issues[i].fields.status.name == "In Progress"){
                        inProgressStoryPointCount = inProgressStoryPointCount + res.body.issues[i].fields.customfield_10024;
                       // progressSum = progressSum + inProgressStoryPointCount;
                        //totalArray.push(progressSum);
                        //console.log("sum : ",progressSum);
                      }
                    
                     if(res.body.issues[i].fields.status.name == "To Do"){
                        todoStoryPoint = todoStoryPoint + res.body.issues[i].fields.customfield_10024;
                        // todoSum = todoSum + todoStoryPoint;
                        // totalArray.push(todoSum);
                        // console.log("sum : ",todoSum);
                      }
                    
                      if(res.body.issues[i].fields.status.name == "Done"){
                        doneStoryPoint = doneStoryPoint + res.body.issues[i].fields.customfield_10024;
                        // doneSum = doneSum + doneStoryPoint;
                        // console.log("sum : ",doneSum);
                        // totalArray.push(doneSum);
                      }
                    
                       if(res.body.issues[i].fields.status.name == "Review"){
                        reviewStoryPoint = reviewStoryPoint + res.body.issues[i].fields.customfield_10024;
                        // reviewSum = reviewSum + reviewStoryPoint;
                        // console.log("sum : ",reviewSum);
                        // totalArray.push(reviewSum);
                      }
                    
                      //  if(res.body.issues[i].fields.status.name == "Open"){
                      //   openStoryPoint = openStoryPoint + res.body.issues[i].fields.customfield_10024;
                      // }
                    
                       if(res.body.issues[i].fields.status.name == "Accepted"){
                        acceptedStoryPoint = acceptedStoryPoint + res.body.issues[i].fields.customfield_10024;
                        // acceptedSum = acceptedSum + acceptedStoryPoint;
                        // console.log("sum : ",acceptedSum);
                        // totalArray.push(acceptedSum);
                      }
                    
                       if(res.body.issues[i].fields.status.name == "Resolved"){
                        resolvedStoryPoint = resolvedStoryPoint + res.body.issues[i].fields.customfield_10024;
                        // resolveSum = resolveSum + resolvedStoryPoint;
                        // console.log("sum : ",resolveSum);
                        // totalArray.push(resolveSum);
                      }

                }
                console.log(count);

               
                let obj ={
                    
                    user:res.body.issues[0].fields.assignee.name,
                    inProgressStoryPointCount:inProgressStoryPointCount,
                    todoStoryPoint:todoStoryPoint,
                    doneStoryPoint:doneStoryPoint,
                    reviewStoryPoint:reviewStoryPoint,
                    openStoryPoint:openStoryPoint,
                    acceptedStoryPoint:acceptedStoryPoint,
                    resolvedStoryPoint:resolvedStoryPoint,  
                    storyPoint:storyPoint
                    
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
                   <th scope="col"><b>Assignee</b></th>
                   <th scope="col"><b>Open</b></th>
                   <th scope="col"><b>Accepted</b></th>
                   <th scope="col"><b>In Progress</b></th>
                   <th scope="col"><b>Review</b></th>
                   <th scope="col"><b>Resolved</b></th>
                   <th scope="col"><b>Closed</b></th>
                   <th scope="col"><b>Total</b></th>
                    </tr> 
                   </thead>
                   
                 {this.state.newArray.map(l => (      //array to array of JSX
                    <tr>  
                        
                       <td><b>{l.user}</b></td>
                        <td>{l.todoStoryPoint}</td>
                        <td>{l.acceptedStoryPoint}</td>
                        <td>{l.inProgressStoryPointCount}</td>
                        <td>{l.reviewStoryPoint} </td>
                        <td>{l.resolvedStoryPoint}</td>
                        <td>{l.doneStoryPoint}</td>
                        <td><b>{l.storyPoint}</b></td> 
                        
                    </tr>  
                    // <Users user={l.user}
                    //         todoStoryPoint={l.todoStoryPoint}
                    //         acceptedStoryPoint={l.acceptedStoryPoint}
                    //         inProgressStoryPointCount={l.inProgressStoryPointCount}
                    //         reviewStoryPoint={l.reviewStoryPoint}
                    //         resolvedStoryPoint={l.resolvedStoryPoint}
                    //         doneStoryPoint={l.doneStoryPoint}
                    //         storyPoint={l.storyPoint}
                    // />
                ))}

                <tr>
                  <td><b>Total : </b></td>
                 {/* <td>{sum}</td> */}
                </tr>
                
                </table>

        return(
            <><br/>
            <h3>Story Points by Assignee and Status</h3><br/>
          
            <Button class="ui right floated primary button" as={Link} to ='/logout'>Log out</Button>
            
           {posts}
           <button onClick={this.table1}>  Previous </button>
            
         
            </>
        )
    }
}

export default FetchData2;