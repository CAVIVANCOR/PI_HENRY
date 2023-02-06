import {AGREGAR_ACTIVIDAD_TURISTICA, FILTRAR_PAISES, ORDENAR_PAISES} from './actions-types';

const initialState = {
    countries:[]
}

const rootReducer = (state=initialState,action)=>{
    switch (action.type) {
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