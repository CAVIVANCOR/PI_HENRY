import styles from './Countries.module.css';
import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Country from '../Country/Country';
import { filterCountriesByActivities, filterCountriesByContinent, getActivitiesTuristic, getAllCountries, getCountriesByName, OrderByName, OrderByPoblation } from '../../redux/actions.js';
import { v4 } from 'uuid';
import Pagination from '../Pagination/Pagination';
import Search from '../Search/Search';
import { useHistory, useLocation } from 'react-router-dom';

export default function Countries() {
  const [countriesPerPage,setCountriesPerPage] = useState(10);
  const [currentPage,setCurrentPage]=useState(1);
  const [actividadElegida,setActividadElegida]=useState("");
  const [continenteElegido,setContinenteElegido]=useState("");
  const [ordenadoName, setOrdenadoName]=useState("");
  const [ordenadoPoblation, setOrdenadoPoblation]=useState("");

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

  if (currentPage!==paginaMostrar) {
    setCurrentPage(paginaMostrar);
  } 

  useEffect(()=>{
    dispatch(getAllCountries());
    dispatch(getActivitiesTuristic());
  },[dispatch]);
  
  const getAllContinentes = (countriesData)=>{
    let arrayContinentes = countriesData.map(c=>c.continent);
    const continentesUnicos = arrayContinentes.filter((item,index)=>{
      return (arrayContinentes.indexOf(item) === index);
    })
    continentesUnicos.push("Todos");
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
    }else{
      actividadesUnicos.push(actividadElegida);
    }
    actividadesUnicos.push("Todos");
    return actividadesUnicos;
  }

  let continentes = getAllContinentes(countries);
  let actividades = getAllActivities(activities);

  if (nombreMostrar){
    console.log('nombreMostrar',nombreMostrar);
    dispatch(getCountriesByName(nombreMostrar));
  }

  let totalCountries = countries.length;
  let lastIndex = currentPage * countriesPerPage;
  let firstIndex = lastIndex - countriesPerPage;
  let countriesMostrar = countries.slice(firstIndex,lastIndex);

  const handlefilterContinent=(event)=>{
    event.preventDefault();
    const continentSelect = event.target.value;
    if (continentSelect==="Todos"){
      setContinenteElegido("");
    }else{
      setContinenteElegido(continentSelect);
    }
    dispatch(filterCountriesByContinent(continentSelect));
    navigate.push("/home?page="+(currentPage)+"&")

  };

  const handlefilterActivity=(event)=>{
    event.preventDefault();
    const activitySelect = event.target.value;
    if (activitySelect==="Todos"){
      setActividadElegida("");
    }else{
      setActividadElegida(activitySelect);
    }
    dispatch(filterCountriesByActivities(activitySelect))
  };

  const handleSortName=(event)=>{
    console.log('Entro a handleSortName');
    event.preventDefault();
    dispatch(OrderByName(event.target.value))
    setCurrentPage(1);
    event.target.value==="ascN" ? setOrdenadoName("Ordenado Ascendentemente por Nombre") : setOrdenadoName("Ordenado Descendentemente por Nombre")
  };

  const handleSortPoblation = (event)=>{
    console.log('Entro a handleSortPoblation');
    event.preventDefault();
    dispatch(OrderByPoblation(event.target.value))
    setCurrentPage(1);
   event.target.value==="ascP" ? setOrdenadoName("Ordenado Ascendentemente por Poblacion") : setOrdenadoName("Ordenado Descendentemente por Poblacion")
  }

  return (
    <div className={styles.container}>
        <div>
          <h1>Home</h1>
        </div>
        <div>
          <Search />
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
            <label>Ordenar por Nombre:</label>
            <select id="ordenarName" name="ordenarName" onChange={handleSortName}>
                <option value="ascN">Ascendente</option>
                <option value="descN">Descendente</option>
              </select>
          </div>
          <div className={styles.countriesSort}>
            <label>Ordenar por Poblacion:</label>
            <select id="ordenarPoblacion" name="ordenarPoblacion" onChange={handleSortPoblation}>
                <option value="ascP">Ascendente</option>
                <option value="descP">Descendente</option>
              </select>
          </div>
        </div>
      <Pagination 
        countriesPerPage={countriesPerPage} 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        totalCountries={totalCountries}
        actividadElegida={actividadElegida}
        continenteElegido={continenteElegido}
        ordenadoName={ordenadoName}
        ordenadoPoblation={ordenadoPoblation}
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