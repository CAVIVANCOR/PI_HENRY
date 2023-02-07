import Burguer from './BurguerStyle';
import React from 'react'

export default function BurguerButton(props) {
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

