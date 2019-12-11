import React from 'react';

function Users(props)  {
   
        return(
            <>
            
            <tr>
                <td><b>{props.user}</b></td>
                <td>{props.total}</td>
                <td>{props.storyPoint}</td>
                <td>{props.timeOriginalEstimate}</td>
                <td>{props.timeEstimate}</td>
                <td>{props.timeSpent}</td>
                 
                 {/* <td><b>{props.user}</b></td>
                <td>{props.todoStoryPoint}</td>
                <td>{props.acceptedStoryPoint}</td>
                <td>{props.inProgressStoryPointCount}</td>
                <td>{props.doneStoryPoint}</td>
                <td>{props.storyPoint}</td>  */}
            
            </tr> 

            
           
            </> 
        )
  
}

export default Users;