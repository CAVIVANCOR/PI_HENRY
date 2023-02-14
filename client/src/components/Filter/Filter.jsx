import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterCountriesByActivities, filterCountriesByContinent } from '../../redux/actions';
import styles from './Filter.module.css';
import { v4 } from 'uuid';

export default function Filter({ setActividadElegida,setContinenteElegido, actividadElegida,continenteElegido}) {
  const dispatch = useDispatch();

  const countries = useSelector((state)=>state.countries);
  const activities = useSelector((state)=>state.activities);

  const getAllContinentes = (countriesData)=>{
    let arrayContinentes = countriesData.map(c=>c.continent);
    const continentesUnicos = arrayContinentes.filter((item,index)=>{
      return (arrayContinentes.indexOf(item) === index);
    })
    if (continenteElegido==="") continentesUnicos.unshift("");
    return continentesUnicos;
  }

  const getAllActivities = (actividades)=>{
    let actividadesUnicos = [];
    let arrayActivities = [];
    if (actividadElegida===""){
      arrayActivities = actividades.map(c=>c.name);
      actividadesUnicos = arrayActivities.filter((item,index)=>{
      return (arrayActivities.indexOf(item) === index);
      })
      actividadesUnicos.unshift("");
    }else{
      actividadesUnicos.push(actividadElegida);
    }
    return actividadesUnicos;
  }

  let continentes = getAllContinentes(countries);
  let actividades = getAllActivities(activities);

  const handlefilterContinent=(event)=>{
    event.preventDefault();
    const continentSelect = event.target.value;
    if (continentSelect==="Todos"){
      setContinenteElegido("");
    }else{
      setContinenteElegido("Filtrado Continente "+continentSelect);
    }
    dispatch(filterCountriesByContinent(continentSelect));
  };

  const handlefilterActivity=(event)=>{
    event.preventDefault();
    const activitySelect = event.target.value;
    if (activitySelect==="Todos"){
      setActividadElegida("");
    }else{
      setActividadElegida("Filtrado Actividad "+activitySelect);
    }
    dispatch(filterCountriesByActivities(activitySelect))
  };

  return (
    <div className={styles.filter}>
        <div>
        <h2>Filtrar Por</h2>
        </div>
        <div className={styles.countriesSort}>
        <label>Continente:</label>
        <select id="filtroxContinente" name="filterContinent" onChange={handlefilterContinent}>
            {
            continentes.map((c)=>(
                <option  key={v4()} value={c}>{c}</option>
            ))
            }
        </select>
        </div>
        <div className={styles.countriesSort}>
        <label>Actividad:</label>
        <select id="filtroxActividad" name="filtroxActividad" onChange={handlefilterActivity}>
            {
            actividades.map((c)=>(
                <option key={v4()} value={c}>{c}</option>
            ))
            }
        </select>
        </div>
        {continenteElegido!=="" ? <div><p>{continenteElegido}</p></div> : null}
        {actividadElegida!=="" ? <div><p>{actividadElegida}</p></div> : null}
    </div>
  )
};
