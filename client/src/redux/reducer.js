import {GET_ALL_COUNTRIES, GET_COUNTRY_BY_ID, AGREGAR_ACTIVIDAD_TURISTICA, FILTRAR_PAISES, ORDENAR_PAISES} from './actions-types';

const initialState = {
    countries:[],
    countriesALL:[],
    countryDetail:{}
}

const rootReducer = (state=initialState,action)=>{
    switch (action.type) {
        case GET_ALL_COUNTRIES:
            return {...state, countries: action.payload, countriesALL:action.payload}
        case GET_COUNTRY_BY_ID:
            return {...state, countryDetail: action.payload};
        case AGREGAR_ACTIVIDAD_TURISTICA:
            return state;
        case FILTRAR_PAISES:
            return state;
        case ORDENAR_PAISES:
            return state; 
        default:
            return state;
    }
};

export default rootReducer;