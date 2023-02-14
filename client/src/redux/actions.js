import axios from 'axios';
const { GET_ALL_COUNTRIES, 
        GET_COUNTRY_BY_ID, 
        GET_COUNTRIES_BY_NAME, 
        GET_ACTIVITIES_TURISTICS, 
        FILTER_COUNTRIES_BY_CONTINENT, 
        FILTER_COUNTRIES_BY_ACTIVITY,
        ORDER_COUNTRIES_BY_NAME,
        ORDER_COUNTRIES_BY_POBLATION,
        ADD_ACTIVITY_TURISTIC,
        ADD_ERROR_SEARCH
    } = require('./actions-types');

export const getAllCountries=()=>{
    return async function(dispatch){
        try {
            let countriesAll = await axios.get('http://localhost:3001/countries');
            return dispatch({
                type:GET_ALL_COUNTRIES,
                payload: countriesAll.data
            });
        } catch (error) {
            console.log(error);
        }
 
    };
};

export const getCuntryById=(id)=>{
    return async function(dispatch){
        try {
            let country = await axios.get('http://localhost:3001/countries/'+id);
            return dispatch({
                type:GET_COUNTRY_BY_ID,
                payload:country.data
             });
        } catch (error) {
            console.log(error);
        }  
    };
};

export const getCountriesByName=(name)=>{
    return async function(dispatch){
        try {
            let countries = await axios.get('http://localhost:3001/countries?name='+name);
            return dispatch({
                type:GET_COUNTRIES_BY_NAME,
                payload:countries.data
            });
        } catch (error) {
            console.log('getCountriesByName',error.response.data.error);
            return dispatch({
                type:GET_COUNTRIES_BY_NAME,
                payload:[],
                error:error.response.data.error
            });
        };
    };
};

export const getActivitiesTuristic=()=>{
    return async function(dispatch){
        try {
            let activitiesTuristic = await axios.get('http://localhost:3001/activities');
            return dispatch({
                type:GET_ACTIVITIES_TURISTICS,
                payload: activitiesTuristic.data
            });
        } catch (error) {
            console.log(error);
        }
    }
}


export const filterCountriesByContinent = (continente)=>{
    return {
        type: FILTER_COUNTRIES_BY_CONTINENT,
        payload: continente
    }
};

export const filterCountriesByActivities = (activity)=>{
   // console.log('filterCountriesByActivities',activity);
    return {
        type: FILTER_COUNTRIES_BY_ACTIVITY,
        payload: activity
    }
};

export const OrderByName = (orden)=>{
    return {
        type: ORDER_COUNTRIES_BY_NAME,
        payload: orden
    }
};

export const OrderByPoblation = (orden)=>{
    return {
        type: ORDER_COUNTRIES_BY_POBLATION,
        payload: orden
    }
};

export const agregarActividadTuristica = (activity)=>{
    //console.log('activity',activity);
    return async function(dispatch){
        try {
            let activityTuristic = await axios.post('http://localhost:3001/activities', activity);
            return dispatch({
                type:ADD_ACTIVITY_TURISTIC,
                payload: activityTuristic.data
            });  
        } catch (error) {
            console.log(error);
        }

    }
};

export const agregarErrorSearch =(error)=>{
    return {
        type: ADD_ERROR_SEARCH,
        payload: error
    }
}
