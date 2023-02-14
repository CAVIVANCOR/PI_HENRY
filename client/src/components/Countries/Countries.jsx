import styles from './Countries.module.css';
import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Country from '../Country/Country';
import { agregarErrorSearch, filterCountriesByActivities, filterCountriesByContinent, getActivitiesTuristic, getAllCountries, getCountriesByName, OrderByName, OrderByPoblation } from '../../redux/actions.js';
import { v4 } from 'uuid';
import Pagination from '../Pagination/Pagination';
import Search from '../Search/Search';
import { useHistory, useLocation } from 'react-router-dom';

export default function Countries() {
  const [countriesPerPage,setCountriesPerPage] = useState(10);
  const [currentPage,setCurrentPage]=useState(1);
  const [actividadElegida,setActividadElegida]=useState("");
  const [continenteElegido,setContinenteElegido]=useState("");
  const [ordenado, setOrdenado]=useState("");

  const dispatch = useDispatch();
  const countries = useSelector((state)=>state.countries);
  const activities = useSelector((state)=>state.activities);
  const errorSearch = useSelector((state)=>state.errorSearch);

  const navigate = useHistory();
  const location= useLocation();

  let {search} =location;
  let query = new URLSearchParams(search);
  let paginaMostrar = Number(query.get('page'));
  let nombreMostrar = query.get('name');

  if (!paginaMostrar) paginaMostrar=1;

  if (currentPage!==paginaMostrar) {
    setCurrentPage(paginaMostrar);
  } 

  useEffect(()=>{
    dispatch(getAllCountries());
    dispatch(getActivitiesTuristic());
    console.log("entro al useEffect");
  },[dispatch,navigate]);
  
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

  if (nombreMostrar){
    console.log('nombreMostrar',nombreMostrar);
    dispatch(getCountriesByName(nombreMostrar));
  }



  const handlefilterContinent=(event)=>{
    event.preventDefault();
    const continentSelect = event.target.value;
    if (continentSelect==="Todos"){
      setContinenteElegido("");
    }else{
      setContinenteElegido("Filtrado Continente "+continentSelect);
    }
    dispatch(filterCountriesByContinent(continentSelect));
    navigate.push("/home?page="+(currentPage)+"&")

  };

  const handlefilterActivity=(event)=>{
    event.preventDefault();
    //console.log('handlefilterActivity',event.target.value);
    const activitySelect = event.target.value;
    if (activitySelect==="Todos"){
      setActividadElegida("");
    }else{
      setActividadElegida("Filtrado Actividad "+activitySelect);
    }
    dispatch(filterCountriesByActivities(activitySelect))
  };

  const handleSortName=(event)=>{
    //console.log('Entro a handleSortName');
    event.preventDefault();
    dispatch(OrderByName(event.target.value))
    setCurrentPage(1);
    event.target.value==="ascN" ? setOrdenado("Ordenado Ascendentemente por Nombre") : setOrdenado("Ordenado Descendentemente por Nombre")
  };

  const handleSortPoblation = (event)=>{
    //console.log('Entro a handleSortPoblation');
    event.preventDefault();
    dispatch(OrderByPoblation(event.target.value))
    setCurrentPage(1);
   event.target.value==="ascP" ? setOrdenado("Ordenado Ascendentemente por Poblacion") : setOrdenado("Ordenado Descendentemente por Poblacion")
  };

  const handleMostrarTodos=()=>{
  //console.log('hola entre');
  setActividadElegida("");
  setContinenteElegido("");
  setOrdenado("");
  setCurrentPage(1);
  navigate.push('/home');
  dispatch(getAllCountries());
  dispatch(getActivitiesTuristic());
  dispatch(agregarErrorSearch(""))
  }
  
  let totalCountries = 0;
  let lastIndex = 0;
  let firstIndex = 0;
  let countriesMostrar = [];

  if (currentPage===1){
    totalCountries = countries.length;
    lastIndex = currentPage * 9;
    firstIndex = lastIndex - 9;
    countriesMostrar = countries.slice(firstIndex,lastIndex);
  }else{
    if (currentPage===(countries.length/countriesPerPage)){
      totalCountries = countries.length;
      lastIndex = currentPage * countriesPerPage;
      firstIndex = (lastIndex - countriesPerPage)-1;
      countriesMostrar = countries.slice(firstIndex,lastIndex);
    }else{
      totalCountries = countries.length;
      lastIndex = (currentPage * countriesPerPage)-1;
      firstIndex = lastIndex - countriesPerPage;
      countriesMostrar = countries.slice(firstIndex,lastIndex);
    }

  }


  return (
    <div className={styles.container}>
        <div>
          <h1>Inicio</h1>
        </div>
        <div>
          <button className={styles.button} onClick={handleMostrarTodos} >Todos</button>
        </div>
        <div className={styles.search}>
          <Search/>
        </div>
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
        <div className={styles.sort}>
          <div>
            <h2>Ordenamiento</h2>
          </div>
          <div className={styles.countriesSort}>
            <label>Por Nombre: </label>
            <select id="ordenarName" name="ordenarName" onChange={handleSortName}>
                <option value=""></option>
                <option value="ascN">Ascendente</option>
                <option value="descN">Descendente</option>
              </select>
          </div>
          <div className={styles.countriesSort}>
            <label>Por Población: </label>
            <select id="ordenarPoblacion" name="ordenarPoblacion" onChange={handleSortPoblation}>
                <option value=""></option>
                <option value="ascP">Ascendente</option>
                <option value="descP">Descendente</option>
              </select>
          </div>
          {ordenado!=="" ? <div><p>{ordenado}</p></div> : null}
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