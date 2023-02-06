import {NavContainer,BgDiv} from './NavStyle';
import BurguerButton from '../BurguerButton/BurguerButton';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Nav({onSearch, logout}) {
  const [clicked,setClicked] = useState(false);
  console.log(clicked);
  const handleClick = ()=>{
    setClicked(!clicked);
  };
  
  return (
    <>
      <NavContainer>
          <h2>Menu <span>Countries</span></h2>
          <div className={`links ${clicked ? 'active' : ''}`}>
            <NavLink exact to='/home' activeClassName='active'>Home</NavLink>
            <NavLink exact to='/touring' activeClassName='active'>Tourist Activities</NavLink>
          </div>
          <div className='burguer'>
            <BurguerButton clicked={clicked} handleClick={handleClick}/>
          </div>
          <BgDiv className={`initial ${clicked ? ' active' : ''}`}></BgDiv>
      </NavContainer>
    </>
  )
}

