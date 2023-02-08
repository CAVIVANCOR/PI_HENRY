import styles from './Countries.module.css';
import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Country from '../Country/Country';
import { getAllCountries } from '../../redux/actions.js';
import { v4 } from 'uuid';
import Pagination from '../Pagination/Pagination';

export default function Countries() {
  const [countriesPerPage,setCountriesPerPage] = useState(10);
  const [currentPage,setCurrentPage]=useState(1);
  const dispatch = useDispatch();
  const countries = useSelector((state)=>state.countries);
  useEffect(()=>{
    dispatch(getAllCountries());
  },[dispatch]);
  const totalCountries = countries.length;
  let lastIndex = 0;
  let firstIndex = 0;
  if (currentPage===1){
    lastIndex = currentPage * (countriesPerPage-1);
    firstIndex = lastIndex - (countriesPerPage-1);
  }else{
    lastIndex = (currentPage * countriesPerPage);
    firstIndex = (lastIndex - countriesPerPage)-1;
    lastIndex = lastIndex-1
  }

  return (
    <div className={styles.container}>
      <nav className={styles.countriesFilter}>
        <div>
          <h1>Home</h1>
        </div>
        <div className={styles.sort}>
          <div className={styles.countriesSort}>
            <label>Filtrar Por:</label>
            <select>
              <option value="/">Ninguno</option>
            </select>
          </div>
          <div className={styles.countriesSort}>
            <label>Ordenar Por:</label>
            <select>
                <option value="/">Ninguno</option>
              </select>
          </div>
        </div>
      </nav>
      <Pagination 
        countriesPerPage={countriesPerPage} 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        totalCountries={totalCountries}
      />
      <div className={styles.countries}>
        {countries.map((country)=>(
            <Country
                key={v4()}
                id={country.id}
                flags={country.flags}
                name={country.name}
                continent={country.continent}
            />
          )).slice(firstIndex,lastIndex)}
      </div>
    </div>
  )
}