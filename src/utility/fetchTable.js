import React from 'react';
import FetchBody from './fetchBody';
export default {

    tableHeader: (props) => {
        let o = Object.keys(props[0]);
        return o.map((key)=>{
                return <th key={key}>{key.toUpperCase()}</th>
                })
    },
    
    tableRow: (props) =>{
                  
        var items = props;
        let keys = Object.keys(props[0]);
        return items.map((row, index)=>{
        return <tr key={index}><FetchBody.RenderRow key={index} data={row} keys={keys}/></tr>
        })
    },

    tableFooter: (props) =>{
        let o = Object.values(props[0]);
        return o.map((key)=>{
                return <th key={key}></th>
                })
    }
 }
