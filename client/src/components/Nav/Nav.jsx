import {NavContainer,BgDiv} from './NavStyle';
import BurguerButton from '../BurguerButton/BurguerButton';
import React, { useState } from 'react';
import { useHistory} from 'react-router-dom';

export default function Nav({onSearch, logout}) {
  const [clicked,setClicked] = useState(false);
  const navigate = useHistory();

  const handleClick = ()=>{
    setClicked(!clicked);
  };
  
  const handleCerrareIr =(ruta)=>{
    navigate.push(ruta);
    if (clicked) setClicked(!clicked);
  };

  return (
    <>
      <NavContainer>
          <h1>Henry's PI Countries</h1>
          <div className={`links ${clicked ? 'active' : ''}`}>
            <div className="cursor" onClick={()=>handleCerrareIr('/home')}><h2><span>Inicio</span></h2></div>
            <div className="cursor" onClick={()=>handleCerrareIr('/touring')}><h2><span>Agregar Actividad</span></h2></div>
          </div>
          <div className='burguer'>
            <BurguerButton clicked={clicked} handleClick={handleClick}/>
          </div>
          <BgDiv className={`initial ${clicked ? ' active' : ''}`}></BgDiv>
      </NavContainer>
    </>
  )
}

