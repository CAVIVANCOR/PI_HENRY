import styles from './Detail.module.css';
import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCuntryById } from '../../redux/actions';
import { armaActivities } from './actividades.js';

export default function Detail() {
  const parametros = useParams();
  const dispatch = useDispatch();
  const country = useSelector((state)=>state.countryDetail);
  const navigate = useHistory();

  //console.log('Detail country',country);

  useEffect(()=>{
    dispatch(getCuntryById(parametros.id));
  },[dispatch, parametros]);
  
  let cloneCountriesActivities = {...country.activities};
  //console.log('country',country);
  return (
      <div className={styles.container}>
        <div className={styles.elemento}>
          <h1>{country.name}</h1>
        </div>
        <div className={styles.elemento}>
          <img className={styles.countryImage} src={country.flags} alt={country.name} />
        </div>
        <div className={styles.elemento}>
          <h1>Codigo: {country.id}</h1>
          <p>Continente: {country.continent}</p>
          <p>Capital: {country.capital}</p>
          <p>SubRegion: {country.subregion}</p>
          <p>Area: {country.area}</p>
          <p>Poblacion: {country.population}</p>
          <h2>Actividades Turisticas:</h2>
          {armaActivities(cloneCountriesActivities).map(activity=>(
              <div>
                <p>{activity}</p>
              </div>
            )
          )}
        </div>
        <div className={styles.elemento}>
          <button onClick={()=>navigate.goBack()}>Volver</button>
        </div>
     </div>
  )
}
