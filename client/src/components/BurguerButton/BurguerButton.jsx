import Burguer from './BuguerStyle';
import React from 'react'

export default function BurguerButton(props) {
  console.log('props',props);
  console.log(`icon nav-icon-5 ${props.clicked ? 'open' : ''}`)

  return (
    <Burguer>
      <div  onClick={props.handleClick} 
            className={`icon nav-icon-5 ${props.clicked ? 'open' : ''}`}
            >
            <span></span>
            <span></span>
            <span></span>
        </div>
    </Burguer>
  )
}

