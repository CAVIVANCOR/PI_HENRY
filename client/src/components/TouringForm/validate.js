export const validateTouringInput=({activity,countries})=>{
    const nombre= /^[a-zA-ZÀ-ÿ\s]{1,40}$/ // Expresion Regular: Letras y espacios, pueden llevar acentos.
    let errors ={};
    if (!activity.name){
      errors.name="Se requiere nombre de Actividad";
    }else{
      if (!nombre.test(activity.name.trim())) errors.name="Se requiere nombre valido de Actividad";
    }
    if (!activity.difficulty) errors.difficulty="Debe seleccionar la dificultad";
    if (!activity.duration || isNaN(activity.duration)) {
      errors.duration="Duración invalida (1 a 365 dias)";
    }else{
      if (Number(activity.duration)<=0 || Number(activity.duration)>365) errors.duration="Duración fuera del rango (1 a 365 dias)";
    }
    if (!activity.season) errors.season="Debe seleccionar una Estacion";
    if (countries.length===0) errors.countries="Debe asignar al menos a un País"
    return errors;
  };