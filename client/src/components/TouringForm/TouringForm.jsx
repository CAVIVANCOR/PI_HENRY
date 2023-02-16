import styles from './ToouringForm.module.css';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom';
import { v4 } from 'uuid';
import { agregarActividadTuristica, getActivitiesTuristic, getAllCountries } from '../../redux/actions';
import { validateTouringInput } from './validate';

export default function TouringForm() {
  const countries = useSelector((state)=> state.countries);
  const dispatch = useDispatch();
  const navigation = useHistory();
  const errorSearch = useSelector((state)=>state.errorSearch);
  let actividadCreadaOK="";

  const [touringInput,setTouringInput]=useState({
    activity:{
      name: "",
      difficulty: "",
      duration: "",
      season: ""},
    countries: []
  });

  const [errorInput,setErrorInput]=useState({
    name:"",
    difficulty: "",
    duration: "",
    season: "",
    countries:""
  })
  const [valorSeleccionado,setValorSeleccionado]=useState({
    dificultad:"",
    estacion:""
  })
 

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
    if (event.target.value!=="0"){
      switch (event.target.value) {
        case "1":
          setValorSeleccionado({...valorSeleccionado,dificultad:"Principiante"});
          break;
        case "2":
          setValorSeleccionado({...valorSeleccionado,dificultad:"Aficionado"});
          break;
        case "3":
          setValorSeleccionado({...valorSeleccionado,dificultad:"Normal"});
          break;
        case "4":
          setValorSeleccionado({...valorSeleccionado,dificultad:"Profesional"});
          break;
        case "5":
          setValorSeleccionado({...valorSeleccionado,dificultad:"Experto"});
          break;
        default:
          setValorSeleccionado("");
      };
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
    if (event.target.value!==""){
      setValorSeleccionado({...valorSeleccionado, estacion:event.target.value});
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
    let countrieRepetido = touringInput.countries.find(element=>element === event.target.value)
    if (!countrieRepetido){
      setTouringInput({
        ...touringInput, 
        countries: [...touringInput.countries, event.target.value]}
      );
      setErrorInput(validateTouringInput({
          ...touringInput, 
          countries: [...touringInput.countries, event.target.value]}
      ));
    }
  };

  let countriesOrdenado = countries.sort((a,b)=>{
    if (a.name>b.name) return 1;
    if (b.name>a.name) return -1;
    return 0;
  });
  if (countriesOrdenado[0]!=="") countriesOrdenado.unshift("");

  const handleSubmit=(event)=>{
    event.preventDefault();
    if (Object.entries(errorInput).length === 0){
      dispatch(agregarActividadTuristica(touringInput));
      if (errorSearch===""){
        actividadCreadaOK="Actividad Creada Con Exito";
        setTouringInput({
          activity:{
            name: "",
            difficulty: "",
            duration: "",
            season: ""},
          countries: []
        });
        navigation.push('/home');
        dispatch(getAllCountries());
        dispatch(getActivitiesTuristic());
      };
    };
  };

  const handleDeleteCountrySelect = (countryEliminar)=>{
    const arrayCountriesOK = touringInput.countries.filter(country=>country!==countryEliminar);
    setTouringInput({
      ...touringInput, 
      countries: arrayCountriesOK}
    );
    setErrorInput(validateTouringInput({
        ...touringInput, 
        countries: arrayCountriesOK}
    ));
  };

  return (
    <div className={styles.container} >
      <h1>Agregar Actividad Turistica</h1>
      <div className={styles.activities}>
        <Link to = '/home'>
          <button className={styles.button}>Volver</button>
        </Link>
      </div>
      <div className={styles.activities}>
        <form className={styles.formulario} onSubmit={handleSubmit}>
          <div  className={styles.activities}>
            <label>Nombre:</label>
            <input 
              type="text"
              value={touringInput.name}
              name="name"
              onChange={handleTouringInput} />
            {errorInput.name && (<h4 className={styles.error}>{errorInput.name}</h4>)}
          </div>
          <div  className={styles.activities}>
            <label>Dificultad:</label>
            <p className={styles.seleccionado}>{valorSeleccionado.dificultad}</p>
            <select id="elegirDificultad" name="elegirDificultad" onChange={handleCheckDifficulty}>
              <option  key={v4()} value="0" name="0"></option>
              <option  key={v4()} value="1" name="1">Principiante</option>
              <option  key={v4()} value="2" name="2">Aficionado</option>
              <option  key={v4()} value="3" name="3">Normal</option>
              <option  key={v4()} value="4" name="4">Profesional</option>
              <option  key={v4()} value="5" name="5">Experto</option>
            </select>
            {errorInput.difficulty && (<h4 className={styles.error}>{errorInput.difficulty}</h4>)}
          </div>
          <div  className={styles.activities}>
            <label>Duración (en dias):</label>
            <input 
              type="text"
              value={touringInput.duration}
              name="duration"
              onChange={handleTouringInput} />
              {errorInput.duration && (<h4 className={styles.error}>{errorInput.duration}</h4>)}
          </div>
          <div  className={styles.activities}>
            <label>Estación:</label>
            <p className={styles.seleccionado}>{valorSeleccionado.estacion}</p>
            <select id="elegirEstacion" name="elegirEstacion" onChange={handleCheckSeason}>
              <option  key={v4()} value="" name=""></option>
              <option  key={v4()} value="Verano" name="Verano">Verano</option>
              <option  key={v4()} value="Otoño" name="Otoño">Otoño</option>
              <option  key={v4()} value="Invierno" name="Invierno">Invierno</option>
              <option  key={v4()} value="Primavera" name="Primavera">Primavera</option>
            </select>
            {errorInput.season && (<h4 className={styles.error}>{errorInput.season}</h4>)}
          </div>
          <div  className={styles.activities}>
            <label>Countries:</label>
            <select id="countries" name="countries" onChange={handleSelectCountry}>
                  {
                    countriesOrdenado.map((c)=>(
                      <option key={v4()} value={c.id} name={c.name}>{c.name}</option>
                    ))
                  }
            </select>
            {errorInput.countries && (<h4 className={styles.error}>{errorInput.countries}</h4>)}
            <div className={styles.countriesSelect}>
              {touringInput.countries.map(countrySelect=>(
                <div key={v4()}>
                  <p key={v4()}>{countrySelect}</p>
                  <button key={v4()} className={styles.buttonChico} onClick={()=>handleDeleteCountrySelect(countrySelect)}>X</button>
                </div>
                )
              )}
            </div>
          </div>
          <div>
            {(Object.entries(errorInput).length === 0) && (<button  className={styles.button} type='submit'>Crear Actividad</button>)}
            {errorSearch!=="" ? <div><p>{errorSearch}</p></div> : <div><p>{actividadCreadaOK}</p></div>}
          </div>
        </form>
      </div>
      
    </div>
  )
};