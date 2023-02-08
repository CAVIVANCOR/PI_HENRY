export const armaActivities = (actividades)=>{
  let actividadesResult = "";
  if (Object.entries(actividades).length>0){
    let nroRegistros=Object.entries(actividades).length;
    Object.entries(actividades).forEach(([key,value])=>{
      for (const key2 in value) {
        switch (key2) {
            case "difficulty":
              actividadesResult=actividadesResult+"Dificultad: "+value[key2]+" ";
                break;
            case "duration":
              actividadesResult=actividadesResult+"Duración: "+value[key2]+" ";
                break;
            case "season":
              actividadesResult=actividadesResult+"Estacion: "+value[key2]+" ";
                break;
            default:
              actividadesResult=actividadesResult+value[key2].toUpperCase()+" ";
                break;
        };
      }
      if (key<(nroRegistros-1)) actividadesResult=actividadesResult+", ";
    })
  }else{
    actividadesResult = "Sin Actividades Turisticas Registradas";
  }
return actividadesResult;
}
