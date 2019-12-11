import React from 'react';
import superagent from 'superagent';
class Fetch extends React.Component{

  state={
        data:[],
        actualData:[]
  }

  callFunction(){

  }
  async componentDidMount (){ 
    const response = await 
    superagent
    .get(`https://madhvi.atlassian.net/rest/api/2/user/assignable/search?project=REAC`)
    .set('Access-Control-Allow-Credentials', '*')
    .set('Accept', 'application/json')
    .set('Authorization', 'Basic dmFpc2huYXZpLmphd2FuamFsQGN1ZWxvZ2ljLmNvbTo3NmNVSXByaXVDaDlpTm1jZHJXZTA3RDQ=')
    //const response = await fetch(`https://api.coinmarketcap.com/v1/ticker/?limit=10`);
    // const json = await response.json();
    console.log("response : ",response.body.length);
    for(let i=0;i<response.body.length;i++){
      this.setState({ data: [...this.state.data,response.body[i].key ]});
    }
    console.log(this.state.data);
    const response2 = await 
    console.log(this.state.data.length);
    for(let i=0;i<this.state.data.length;i++){
      superagent
      .get(`https://madhvi.atlassian.net/rest/api/3/search?jql=assignee=${this.state.data[i]}`)
      .set('Access-Control-Allow-Credentials', '*')
      .set('Accept', 'application/json')
      .set('Authorization', 'Basic dmFpc2huYXZpLmphd2FuamFsQGN1ZWxvZ2ljLmNvbTo3NmNVSXByaXVDaDlpTm1jZHJXZTA3RDQ=')
      // this.setState({ actualData: [...this.state.actualData,response2.body]});
      // //console.log(`https://madhvi.atlassian.net/rest/api/3/search?jql=assignee=${this.state.data[i]}`);
      // // console.log("response 2 : ",response2);
      // console.log("actual data : ",this.state.actualData);
      //console.log("actual data : ",response2);
      .end((err, res) => {
        if (err) { return console.log("error : ",err); }
      //console.log('this.state ->', this.state.newArray);
      this.setState({actualData:[...this.state.actualData,res.body]})
      
      console.log("state : ",this.state.actualData);
      })
    }
    
  }


  // 

  render(){
    debugger;
    let posts = <table>
    
    {this.state.actualData.map(id => (
      <tr>
         <td><b>{id.total}</b></td>
      </tr>
       
    ))}
  
  </table>
    return(
      <>
  <h1>Show</h1>
  {posts}
      
      </>

    )
  }
}


export default Fetch;