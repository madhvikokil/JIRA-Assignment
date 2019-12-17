import React from 'react';
import ProgressBar from './progressBar';
export default{
    RenderRow:(props)=>{
        return props.keys.map((key, index)=>{
        return <td key={props.data[key]}><b>{props.data[key]}</b></td>
        })
       },

    Design:(props)=>{

    },

    RenderProgressRow:(props) =>{
        return props.keys.map((key, index)=>{
            if(typeof props.data[key] == 'string'){
                return <td key={props.data[key]}><b>{props.data[key]}</b></td>
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

                    if(key == 'Original_Estimate') {
                        let bar = props.data[key] * 100 / props.item.originalSum;
                        bar = Math.floor(bar)
                        return  <ProgressBar.displayProgressBar aValue={props.data[key]} bar={bar}/>
                    }

                    if(key == 'remaining_Estimate') {
                        let bar = props.data[key] * 100 / props.item.remainingSum;
                        bar = Math.floor(bar)
                        return  <ProgressBar.displayProgressBar aValue={props.data[key]} bar={bar}/>
                    }
                    
                    if(key == 'time_Spent') {
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

{/* <td key={key}><b>{key}</b>
                <div class="progress">
                    <div class="inside"><span style={{display:'inline', width:30+'px' }}></span></div>                  
                </div><b>100%</b>
                   
        </td> */}


{/* <th key={key}>{key.toUpperCase()}</th> */}