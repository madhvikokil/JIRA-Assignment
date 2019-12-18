import React from 'react';
import ProgressBar from './progressBar';
import './tableEdit.css';

export default{
    RenderRow:(props)=>{
        return props.keys.map((key, index)=>{
        return <td class="editRow " key={props.data[key]}>{props.data[key]}</td>
        })
       },

    Design:(props)=>{

    },

    RenderProgressRow:(props) =>{
        return props.keys.map((key, index)=>{
            if(typeof props.data[key] == 'string'){
                return <td  key={props.data[key]}>{props.data[key]}</td>
            }
            if(typeof props.data[key] != 'string'){
                if(key == 'issue_count') {
                    let bar = props.data[key] * 100 / props.item.issueCountSum;
                    bar = Math.floor(bar);
                   return  <ProgressBar.displayProgressBar aValue={props.data[key]} bar={bar}/>
            
                }
                if(key == 'story_Point') {
                        let bar = props.data[key] * 100 / props.item.storyPointSum;
                        bar = Math.floor(bar);
                        
                        return  <ProgressBar.displayProgressBar aValue={props.data[key]} bar={bar}/>
                    }

                    if(key == 'Original_Estimate_in_days') {
                        let bar = props.data[key] * 100 / props.item.originalSum;
                        bar = Math.floor(bar)
                        return  <ProgressBar.displayProgressBar aValue={props.data[key]} bar={bar}/>
                    }

                    if(key == 'remaining_Estimate_in_days') {
                        let bar = props.data[key] * 100 / props.item.remainingSum;
                        bar = Math.floor(bar)
                        return  <ProgressBar.displayProgressBar aValue={props.data[key]} bar={bar}/>
                    }
                    
                    if(key == 'time_Spent_in_days') {
                        let bar = props.data[key] * 100 / props.item.spentSum;
                        bar = Math.floor(bar)
                        return  <ProgressBar.displayProgressBar aValue={props.data[key]} bar={bar}/>
                    }
                
                
            }
           
            
            })
           },

           hello(){

           }
    }
