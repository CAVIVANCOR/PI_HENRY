import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getCountriesByName } from '../../redux/actions';
import styles from './Search.module.css';

export default function Search(props) {
  const dispatch = useDispatch();
  const [inputName,setInputName] = useState("");

  const handleValorName = (event)=>{
    event.preventDefault();
    setInputName(event.target.value);
  };

  const handleSubmit = (event)=>{
    event.preventDefault();
    dispatch(getCountriesByName(inputName));
    setInputName("");
    //navigate.push("/home?page="+(currentPage)+'&name='+name)
  };
  return (
    <div className={styles.container}>
      <input type="text" id="name" placeholder="Nombre País" value={inputName} onChange={handleValorName} />
      <button type="submit" onClick={handleSubmit} >Buscar</button>
    </div>
  )
};
