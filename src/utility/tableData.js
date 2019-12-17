import React from 'react';
import FetchBody from './fetchBody';
import './tableData.css';
export default {

    tableHeader: (props) => {
        let o = Object.keys(props[0]);
        return o.map((key)=>{
                return <th key={key}>{key.toUpperCase()}</th>
                })
    },
    
    tableRow: (props,props2) =>{
                  
        let items = props;
        let item2 = props2;
        let keys = Object.keys(props[0]);
        if(item2){
            return items.map((row, index)=>{
            return <tr key={index}><FetchBody.RenderProgressRow key={index} data={row} keys={keys} item={item2}/></tr>
            })
        }
        return items.map((row, index)=>{
        return <tr key={index}><FetchBody.RenderRow key={index} data={row} keys={keys}/></tr>
        })
    },

    tableFooter: (props,p) =>{

        let o = Object.values(props)
        if(p){
         return o.map((key)=>(
         <td key={key}><b>{key}</b>&nbsp;
                <div class="progress">
                <div class="inside" style={{width:100+'px'}}>_</div>&nbsp;
                </div><b>100%</b>
        </td>))
        }

        else{
            return o.map((key)=>(
            <td key={key}><b>{key}</b></td>))
        }
    }
 }
