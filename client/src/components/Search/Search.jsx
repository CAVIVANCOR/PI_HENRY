import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCountriesByName } from '../../redux/actions';
import styles from './Search.module.css';

export default function Search({errorName,setErrorName}) {
  const dispatch = useDispatch();
  const countries = useSelector((state)=>state.countries);
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
      setErrorName("Debe Ingresar algun Valor")
    }

  };
  return (
    <div className={styles.container}>
      <h2>Buscar por: </h2>
      <input type="text" id="name" placeholder="Nombre País" value={inputName} onChange={handleValorName} />
      {errorName!=="" ? <div><p>{errorName}</p></div> : null}
      <button className={styles.button} type="submit" onClick={handleSubmit} >Buscar</button>
    </div>
  )
};
