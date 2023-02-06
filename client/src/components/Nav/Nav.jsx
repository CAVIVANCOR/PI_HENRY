import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import BurguerButton from '../BurguerButton/BurguerButton';

export default function Nav({onSearch, logout}) {
  const [clicked,setClicked] = useState(false);
  console.log(clicked);
  const handleClick = ()=>{
    setClicked(!clicked);
  };
  
  return (
    <>
      <NavContainer>
          <h2>NavBar <span>Responsive</span></h2>
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

const NavContainer = styled.nav`
  h2{
    color: white;
    font-weight: 400;
    span{
      font-weight: bold;
    }
  }
  padding: .4rem;
  background-color: #333;
  display:flex;
  align-items:center;
  justify-content: space-between;
  a{
    color: white;
    text-decoration: none;
    margin-right: 1rem;
  }


  .links{
    position: -1000px;
    top: -1400px;
    left: -2000px;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    a{
      color: black;
      font-size: 2rem;
      display:block;
    }
    @media(min-width: 768px){
      position:initial;
      margin:0;
      a{
        font-size: 1rem;
        color: white;
        display: inline;
      }
    }
  }
  .links.active{
    width:100%;
    display:block;
    position:absolute;
    margin-left: auto;
    margin-right: auto;
    top:30%;
    left:0;
    right:0;
    text-align: center;
    a{
      color:#333;
    }
  }

  .burguer{
    @media(min-width: 768px){
      display:none;
    }
  }
`

const BgDiv = styled.div`
  background-color: #222;
  position: absolute;
  top: -1000px;
  left: -1000px;
  width: 100%;
  height: 100%;
  z-index: -1;
  transition: all .6s ease ;
  
  &.active{
    border-radius: 0 0 80% 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`