import styles from './Countries.module.css';
import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Country from '../Country/Country';
import { getAllCountries } from '../../redux/actions.js';

export default function Countries() {
  // const [countriesAll,setCountriesAll] = useState([]);
  const [countriesPage,setCountriesPage] = useState(10);
  const [currentPage,setCurrentPage]=useState(1);

  const dispatch = useDispatch();
  const countries = useSelector((state)=>state.countries,()=>false);
  useEffect(()=>{
    dispatch(getAllCountries());
  },[])

  return (
      <div className={styles.countries}>
        {console.log('countries.jsx',countries)}
          {countries.map((country)=>(
          <Country
            id={country.id}
            image={country.image}
            name={country.name}
            continent={country.continent}
          />
          ))}
    </div>
  )
}

