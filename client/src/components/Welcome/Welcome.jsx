import React from 'react'
import '../../styles/Welcome.css';
import imgCountries from '../../images/countries.png';


export default function Welcome({login}) {
  return (
    <div className='contenedor-welcome'>
      <img 
        className='contenedor-imagen'
        src={imgCountries}
        alt='Foto Countries'
        />
      <h1>Individual Project</h1>
      <h1>Henry Countries</h1>
      <h2>Programador FullStack</h2>
      <h2>Carlos Alberto Vivanco Rodriguez</h2>
      <p>Febrero 2023</p>
      <div className="box-2">
        <div className="btn btn-two">
          <span onClick={login}>I N G R E S A R</span>
        </div>
      </div>
    </div>
  )
}
