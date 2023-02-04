const {AGREGAR_ACTIVIDAD_TURISTICA, FILTRAR_PAISES, ORDENAR_PAISES} = require('./actions-types');

const agregarActividadTuristica = (activity)=>{
    return {
        type: AGREGAR_ACTIVIDAD_TURISTICA,
        payload: activity
    }
};

const filtrarPaises = (status)=>{
    return {
        type: FILTRAR_PAISES,
        payload: status
    }
};

const ordenarPaises = (orden)=>{
    return {
        type: ORDENAR_PAISES,
        payload: orden
    }
};

module.exports={
    agregarActividadTuristica,
    filtrarPaises,
    ordenarPaises
}