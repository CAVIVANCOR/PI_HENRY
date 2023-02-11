import styles from './Countries.module.css';
import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Country from '../Country/Country';
import { filtrarCountriesPorContinent, getActivitiesTuristic, getAllCountries, getCountriesByName } from '../../redux/actions.js';
import { v4 } from 'uuid';
import Pagination from '../Pagination/Pagination';
import Search from '../Search/Search';
import { useHistory, useLocation } from 'react-router-dom';

export default function Countries() {
  const [countriesPerPage,setCountriesPerPage] = useState(10);
  const [currentPage,setCurrentPage]=useState(1);

  const dispatch = useDispatch();
  const countries = useSelector((state)=>state.countries);
  const activities = useSelector((state)=>state.activities);
  const navigate = useHistory();
  const location= useLocation();

  let {search} =location;
  let query = new URLSearchParams(search);
  let paginaMostrar = Number(query.get('page'));
  let nombreMostrar = query.get('name');

  if (!paginaMostrar) paginaMostrar=1;
  //console.log("paginaMostrar",paginaMostrar, 'currentPage',currentPage);

  if (currentPage!==paginaMostrar) {
    setCurrentPage(paginaMostrar);
  } 

  //console.log("paginaMostrar",paginaMostrar, 'currentPage',currentPage);


  useEffect(()=>{
    dispatch(getAllCountries());
    dispatch(getActivitiesTuristic());
  },[dispatch]);
  
  const onSearch = (name) =>{
    dispatch(getCountriesByName(name));
    navigate.push("/home?page="+(currentPage)+'&name='+name)
  };

  const getAllContinentes = (countriesData)=>{
    let arrayContinentes = countriesData.map(c=>c.continent);
    const continentesUnicos = arrayContinentes.filter((item,index)=>{
      return (arrayContinentes.indexOf(item) === index);
    })
    return continentesUnicos;
  }

  const getAllActivities = (countriesData)=>{
    let arrayActivities = countriesData.map(c=>c.name);
    const actividadesUnicos = arrayActivities.filter((item,index)=>{
      return (arrayActivities.indexOf(item) === index);
    })
    return actividadesUnicos;
  }

  let continentes = getAllContinentes(countries);
  let actividades = getAllActivities(activities);

  if (nombreMostrar){
    console.log('nombreMostrar',nombreMostrar);
    dispatch(getCountriesByName(nombreMostrar));
  }

  const totalCountries = countries.length;
  let lastIndex = 0;
  let firstIndex = 0;
  //console.log('currentPage',currentPage,'firstIndex',firstIndex,'lastIndex',lastIndex);

  if (currentPage===1){
    lastIndex = currentPage * (countriesPerPage-1);
    firstIndex = lastIndex - (countriesPerPage-1);
  }else{
    lastIndex = (currentPage * countriesPerPage);
    firstIndex = (lastIndex - countriesPerPage)-1;
    lastIndex = lastIndex-1
  };

  const countriesMostrar = countries.slice(firstIndex,lastIndex);


  const handlefilterContinent=(event)=>{
    const continentSelect = event.target.value;
    dispatch(filtrarCountriesPorContinent(continentSelect));
    navigate.push("/home?page="+(currentPage)+"&")

  };

  const handlefilterActivity=(event)=>{
    console.log('handlefilterActivity',event.target.value);
  };


  return (
    <div className={styles.container}>
        <div>
          <h1>Home</h1>
        </div>
        <div>
          <Search onSearch={onSearch}/>
        </div>
        <div className={styles.sort}>
          <div className={styles.countriesSort}>
            <div>
              <label>Filtrar Por Continente:</label>
              <select id="filtroxContinente" name="filterContinent" onChange={handlefilterContinent}>
                {
                  continentes.map((c)=>(
                    <option  key={v4()} value={c}>{c}</option>
                  ))
                }
              </select>
            </div>
            <div>
              <label>Filtrar Por Actividad Turistica:</label>
              <select id="filtroxActividad" name="filterActivities" onChange={handlefilterActivity}>
                {
                  actividades.map((c)=>(
                    <option key={v4()} value={c}>{c}</option>
                  ))
                }
              </select>
            </div>
          </div>
          <div className={styles.countriesSort}>
            <label>Ordenar:</label>
            <select>
                <option value="asc">Ascendente</option>
                <option value="desc">Descendente</option>
              </select>
          </div>
        </div>
      <Pagination 
        countriesPerPage={countriesPerPage} 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        totalCountries={totalCountries}
      />
      <div className={styles.countries}>
        {countriesMostrar && countriesMostrar.map((country)=>(
            <Country
                key={v4()}
                id={country.id}
                flags={country.flags}
                name={country.name}
                continent={country.continent}
            />
          ))}
      </div>
    </div>
  )
};