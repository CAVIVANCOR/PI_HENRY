import {GET_ALL_COUNTRIES, AGREGAR_ACTIVIDAD_TURISTICA, FILTRAR_PAISES, ORDENAR_PAISES} from './actions-types';

const initialState = {
    countries:[],
    countriesALL:[]
}

const rootReducer = (state=initialState,action)=>{
    console.log('rootreducer - action',action);
    switch (action.type) {
        case GET_ALL_COUNTRIES:
            console.log('reducer',action.payload);
            return {...state, countries: action.payload, countriesALL:action.payload}
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