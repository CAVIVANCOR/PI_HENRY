import styles from './Countries.module.css';
import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Country from '../Country/Country';
import { agregarErrorSearch, getActivitiesTuristic, getAllCountries } from '../../redux/actions.js';
import { v4 } from 'uuid';
import Pagination from '../Pagination/Pagination';
import Search from '../Search/Search';
import { useHistory, useLocation } from 'react-router-dom';
import Filter from '../Filter/Filter';
import Sort from '../Sort/Sort';

export default function Countries() {
  const [countriesPerPage,setCountriesPerPage] = useState(10);
  const [currentPage,setCurrentPage]=useState(1);
  const [actividadElegida,setActividadElegida]=useState("");
  const [continenteElegido,setContinenteElegido]=useState("");
  const [ordenado, setOrdenado]=useState("");
 
  const dispatch = useDispatch();
  const countries = useSelector((state)=>state.countries);

  const navigate = useHistory();
  const location= useLocation();

  let {search} =location;
  let query = new URLSearchParams(search);
  let paginaMostrar = Number(query.get('page'));

  if (!paginaMostrar) paginaMostrar=1;

  if (currentPage!==paginaMostrar) {
    setCurrentPage(paginaMostrar);
  } 

  useEffect(()=>{
    dispatch(getAllCountries());
    dispatch(getActivitiesTuristic());
  },[dispatch,navigate]);
  



  const handleMostrarTodos=()=>{
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
    };
  };


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
      <Filter setActividadElegida={setActividadElegida} actividadElegida={actividadElegida} setContinenteElegido={setContinenteElegido} continenteElegido={continenteElegido}/>
      <Sort ordenado={ordenado} setOrdenado={setOrdenado} setCurrentPage={setCurrentPage}/>
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