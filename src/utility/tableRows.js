/* eslint-disable array-callback-return */
import React from 'react';
import ProgressBar from './progressBar';
import '../Assets/tableEdit.css';

export default{
    RenderRow:(props) => {
        return props.keys.map((key, index)=>{
        return <td class="editRow" style={{backgroundColor:index === '7' ? 'rgb(244,245,247)' : null,fontWeight:index === '7' ? '800' : null}} key={props.data[key]}>{props.data[key]}</td>
        })
       },

    RenderProgressRow:(props) =>{
        return props.keys.map((key) => {
            if(typeof props.data[key] == 'string'){
                return <td  key={props.data[key]}>{props.data[key]}</td>
            }
            if(typeof props.data[key] != 'string'){
                if(key === 'issue_count') {
                    let colors = '#42526e';
                    let bar = props.data[key] * 100 / props.item.issueCountSum;
                    bar = Math.floor(bar);
                   return  <ProgressBar.displayProgressBar aValue={props.data[key]} bar={bar} colors={colors}/>
            
                }
                if(key === 'story_Point') {
                    let colors = '#42526e';
                    let bar = props.data[key] * 100 / props.item.storyPointSum;
                    bar = Math.floor(bar);
                        
                    return  <ProgressBar.displayProgressBar aValue={props.data[key]} bar={bar} colors={colors}/>
                }

                if(key === 'Original_Estimate_in_days') {
                    let colors='#654982';
                    let bar = props.data[key] * 100 / props.item.originalSum;
                    bar = Math.floor(bar)
                    return  <ProgressBar.displayProgressBar aValue={props.data[key]} bar={bar} colors={colors}/>
                }

                if(key === 'remaining_Estimate_in_days') {
                    let colors = '#f15c75';
                    let bar = props.data[key] * 100 / props.item.remainingSum;
                    bar = Math.floor(bar)
                    return  <ProgressBar.displayProgressBar aValue={props.data[key]} bar={bar} colors={colors}/>
                }
                    
                if(key === 'time_Spent_in_days') {
                    let colors ="#14892c";
                    let bar = props.data[key] * 100 / props.item.spentSum;
                    bar = Math.floor(bar)
                    return  <ProgressBar.displayProgressBar aValue={props.data[key]} bar={bar} colors={colors}/>
                    }
               }
           })
        }
    }
