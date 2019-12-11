import React from 'react';
// import axios from 'axios';
// import JiraClient from 'jira-connector';


class Fet extends React.Component{

async componentDidMount(){
  let headers = new Headers();
  // headers: new Headers({
  //     "Authorization": "Basic bWFkaHZpa29raWxAZ21haWwuY29tOm1TOVlqRk43TjkyRUUzTHFYMGtkQjNBOA=="
  //   }),
   await fetch("https://madhvi.atlassian.net/rest/api/3/search?jql=assignee=madhvikokil", {
      method: 'GET',
      // mode: 'no-cors',
      // redirect: 'follow',
      headers:{
        'Content-Type': 'application/json',
        // 'X-My-Custom-Header': 'value-v',
        'Authorization': "Basic bWFkaHZpa29raWxAZ21haWwuY29tOm1TOVlqRk43TjkyRUUzTHFYMGtkQjNBOA=="
      },
   
  }).then(response => { alert(response)
  //   if (!response.ok) throw new Error(response.status);
  //   return response.json();
  console.log("headers : ",headers);
      console.log(response);
      console.log(response.json());
      
  }).catch(error =>{
    console.log("headers : ",headers);
      console.log("error : " ,error);
    })
  
}


render() {
  return (

    <h1>FETCHING DATA</h1>
  )
}
   
}

export default Fet;