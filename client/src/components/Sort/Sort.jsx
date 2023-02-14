import React from 'react';
import { useDispatch } from 'react-redux';
import styles from './Sort.module.css';
import { v4 } from 'uuid';
import { OrderByName, OrderByPoblation } from '../../redux/actions';

export default function Sort({ordenado, setOrdenado,setCurrentPage}) {
  const dispatch = useDispatch();

  const handleSortName=(event)=>{
    event.preventDefault();
    dispatch(OrderByName(event.target.value))
    setCurrentPage(1);
    event.target.value==="ascN" ? setOrdenado("Ordenado Ascendentemente por Nombre") : setOrdenado("Ordenado Descendentemente por Nombre")
  };

  const handleSortPoblation = (event)=>{
    event.preventDefault();
    dispatch(OrderByPoblation(event.target.value))
    setCurrentPage(1);
   event.target.value==="ascP" ? setOrdenado("Ordenado Ascendentemente por Poblacion") : setOrdenado("Ordenado Descendentemente por Poblacion")
  };

  return (
    <div className={styles.sort}>
        <div>
        <h2>Ordenamiento</h2>
        </div>
        <div className={styles.countriesSort}>
        <label>Por Nombre: </label>
        <select id="ordenarName" name="ordenarName" onChange={handleSortName}>
            <option key={v4()} value=""></option>
            <option key={v4()} value="ascN">Ascendente</option>
            <option key={v4()} value="descN">Descendente</option>
            </select>
        </div>
        <div className={styles.countriesSort}>
        <label>Por Población: </label>
        <select id="ordenarPoblacion" name="ordenarPoblacion" onChange={handleSortPoblation}>
            <option key={v4()} value=""></option>
            <option key={v4()} value="ascP">Ascendente</option>
            <option key={v4()} value="descP">Descendente</option>
            </select>
        </div>
        {ordenado!=="" ? <div><p>{ordenado}</p></div> : null}
    </div>
    )
};


















