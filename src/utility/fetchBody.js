import React from 'react';
export default{
    RenderRow:(props)=>{
        return props.keys.map((key, index)=>{
        return <th key={props.data[key]}>{props.data[key]}</th>
        })
       }
}



{/* <th key={key}>{key.toUpperCase()}</th> */}