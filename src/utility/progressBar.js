import React from 'react';

export default{
    displayProgressBar: (props) => {
        return (<td key={props.aValue}><b>{props.aValue}</b>&nbsp;&nbsp;
              <div class="progress">
                     <div class="inside" style={{width:`${props.bar}`+'px'}}>_</div>  &nbsp;&nbsp;                
                      </div>&nbsp;&nbsp;<b>{props.bar+'%'}</b>
                    </td>)


    }
}
