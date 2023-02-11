import styles from './ToouringForm.module.css';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom';
import { v4 } from 'uuid';
import { agregarActividadTuristica } from '../../redux/actions';

export default function TouringForm() {
  const countries = useSelector((state)=> state.countries);
  const dispatch = useDispatch();
  const navigation = useHistory();

  const [touringInput,setTouringInput]=useState({
    activity:{
      name: "",
      difficulty: "",
      duration: "",
      season: ""},
    countries: []
  });

  const [errorInput,setErrorInput]=useState({})

  const validateTouringInput=({activity,countries})=>{
    let errors ={};
    if (!activity.name) errors.name="Se requiere un Nombre de Pais";
    if (!activity.difficulty) errors.difficulty="Se requiere una Dificultad valida (1,2,3,4,5)";
    if (!activity.duration) errors.duration="Se requiere una Duracion de la Actividad (ejemplo: 1 semana)";
    if (!activity.season) errors.season="Se requiere un Estacion valida (Primavera, Verano, Otoño, Invierno)";
    if (countries.length===0) errors.countries="Debe asignar la Actividad Turistica al menos a un Pais"
    return errors;
  };

  const handleTouringInput=(event)=>{
    event.preventDefault();
    setTouringInput({
      ...touringInput, 
      activity:{...touringInput.activity,[event.target.name]: event.target.value}}
    );
    setErrorInput(validateTouringInput({
      ...touringInput, 
      activity:{...touringInput.activity,[event.target.name]: event.target.value}}
    ))
  };

  const handleCheckDifficulty =(event)=>{
    event.preventDefault();
    if (event.target.checked){
      setTouringInput({
        ...touringInput, 
        activity:{...touringInput.activity, difficulty : event.target.value}}
      );
      setErrorInput(validateTouringInput({
        ...touringInput, 
        activity:{...touringInput.activity, difficulty : event.target.value}}
      ))
    }
  };

  const handleCheckSeason =(event)=>{
    event.preventDefault();
    if (event.target.checked){
      setTouringInput({
        ...touringInput, 
        activity:{...touringInput.activity, season : event.target.value}}
      );
      setErrorInput(validateTouringInput({
        ...touringInput, 
        activity:{...touringInput.activity, season : event.target.value}}
      ));
    };
  };

  const handleSelectCountry=(event)=>{
    event.preventDefault();
    setTouringInput({
      ...touringInput, 
      countries: [...touringInput.countries, event.target.value]}
    );
    setErrorInput(validateTouringInput({
        ...touringInput, 
        countries: [...touringInput.countries, event.target.value]}
    ));
  };

  let countriesOrdenado = countries.sort((a,b)=>{
    if (a.name>b.name) return 1;
    if (b.name>a.name) return -1;
    return 0;
  });

  const handleSubmit=(event)=>{
    event.preventDefault();
    dispatch(agregarActividadTuristica(touringInput));
    console.log('Personaje Creado',touringInput);
    setTouringInput({
      activity:{
        name: "",
        difficulty: "",
        duration: "",
        season: ""},
      countries: []
    });
    navigation.push('/home');
  };
  console.log('touringInput',touringInput);
  return (
    <div>
      <Link to = '/home'>
        <button>Volver</button>
      </Link>
      <h1>Crear Actividad Turistica</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input 
            type="text"
            value={touringInput.name}
            name="name"
            onChange={handleTouringInput} />
          {errorInput.name && (<p className={styles.error}>{errorInput.name}</p>)}
        </div>
        <div>
          <label>Dificultad:</label>
          <label> <input type="checkbox" value="1" name="1" onChange={handleCheckDifficulty}/>1</label>
          <label> <input type="checkbox" value="2" name="2" onChange={handleCheckDifficulty}/>2</label>
          <label> <input type="checkbox" value="3" name="3" onChange={handleCheckDifficulty}/>3</label>
          <label> <input type="checkbox" value="4" name="4" onChange={handleCheckDifficulty}/>4</label>
          <label> <input type="checkbox" value="5" name="5" onChange={handleCheckDifficulty}/>5</label>
          {errorInput.difficulty && (<p className={styles.error}>{errorInput.difficulty}</p>)}
        </div>
        <div>
          <label>Duración:</label>
          <input 
            type="text"
            value={touringInput.duration}
            name="duration"
            onChange={handleTouringInput} />
            {errorInput.duration && (<p className={styles.error}>{errorInput.duration}</p>)}
        </div>
        <div>
          <label>Estación:</label>
          <label> <input type="checkbox" value="Verano" name="Verano" onChange={handleCheckSeason}/>Verano</label>
          <label> <input type="checkbox" value="Otoño" name="Otoño" onChange={handleCheckSeason}/>Otoño</label>
          <label> <input type="checkbox" value="Invierno" name="Invierno" onChange={handleCheckSeason}/>Invierno</label>
          <label> <input type="checkbox" value="Primavera" name="Primavera" onChange={handleCheckSeason}/>Primavera</label>
          {errorInput.season && (<p className={styles.error}>{errorInput.season}</p>)}
        </div>
        <div>
          <label>Countries:</label>
          <select id="countries" name="countries" onChange={handleSelectCountry}>
                {
                  countriesOrdenado.map((c)=>(
                    <option key={v4()} value={c.id}>{c.name}</option>
                  ))
                }
          </select>
          {errorInput.countries && (<p className={styles.error}>{errorInput.countries}</p>)}
        </div>
        {/* <div>
          <ul><li>{touringInput.countries && touringInput.countries.map(country=>country+", ")}</li></ul>
        </div> */}
        <button type='submit'>Crear</button>
      </form>
      
    </div>
  )
};