import React from 'react';
import { Form } from 'semantic-ui-react';

const InputHere =(props) => {
  
    return(<>
    
    <Form.Input type="text" 
             fluid icon='user'
             iconPosition='left' 
             placeholder='E-mail address' 
             class="required"
            ></Form.Input></> )
}

let objectStorage ={
    inputhere : InputHere,
    
    
}
export default (WrappedComponent) => {
    return function wrappedRender(args){
        return <WrappedComponent {...objectStorage}/>
    }
}