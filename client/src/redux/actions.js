import axios from 'axios';
const {GET_ALL_COUNTRIES, AGREGAR_ACTIVIDAD_TURISTICA, FILTRAR_PAISES, ORDENAR_PAISES} = require('./actions-types');

export const getAllCountries=()=>{
    return async function(dispatch){
        let countriesAll = await axios.get('http://localhost:3001/countries');
        return dispatch({
            type:GET_ALL_COUNTRIES,
            payload: countriesAll.data
        });
    };
};

export const agregarActividadTuristica = (activity)=>{
    return {
        type: AGREGAR_ACTIVIDAD_TURISTICA,
        payload: activity
    }
};

export const filtrarPaises = (status)=>{
    return {
        type: FILTRAR_PAISES,
        payload: status
    }
};

export const ordenarPaises = (orden)=>{
    return {
        type: ORDENAR_PAISES,
        payload: orden
    }
};

