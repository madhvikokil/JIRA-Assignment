import React from 'react';

export default{

    displayProgressBar: (props) => {
        return (<td key={props.aValue}>{props.aValue}&nbsp;&nbsp;
              <div class="progress">
                     <div class="inside" style={{width:`${props.bar}` + 'px',backgroundColor:`${props.colors}`}}>_</div>  &nbsp;&nbsp;                
                      </div>&nbsp;&nbsp;{props.bar+'%'}
                    </td>)


    },
   
}
