import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { agregarErrorSearch, getCountriesByName } from '../../redux/actions';
import styles from './Search.module.css';

export default function Search({errorName,setErrorName}) {
  const dispatch = useDispatch();
  const errorSearch = useSelector((state)=>state.errorSearch);
  const [inputName,setInputName] = useState("");

  const handleValorName = (event)=>{
    event.preventDefault();
    setInputName(event.target.value);
  };

  const handleSubmit = (event)=>{
    event.preventDefault();
    console.log("trim",inputName.trim())
    if (inputName.trim()!==""){
      dispatch(getCountriesByName(inputName));
      setInputName("");
    }else{
      dispatch(agregarErrorSearch("Debe Ingresar algun Valor"))
    }
  };
  
  return (
    <div className={styles.container}>
      <h2>Buscar por: </h2>
      <input type="text" id="name" placeholder="Nombre País" value={inputName} onChange={handleValorName} />
      {errorSearch!=="" ? <div><p>{errorSearch}</p></div> : null}
      <button className={styles.button} type="submit" onClick={handleSubmit} >Buscar</button>
    </div>
  )
};
