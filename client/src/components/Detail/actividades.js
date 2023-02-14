export const armaActivities = (actividades)=>{
  const arrayDifficulty= ["Principiante","Aficionado","Normal","Profesional","Experto"];
  let arrayResult=[];
  let actividadesResult = "";
  if (Object.entries(actividades).length>0){
    Object.entries(actividades).forEach(([key,value])=>{
      actividadesResult = "";
      for (const key2 in value) {
        switch (key2) {
            case "difficulty":
              actividadesResult=actividadesResult+"Dificultad: "+arrayDifficulty[value[key2]]+" ";
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
      arrayResult.push(actividadesResult);
    })
  }else{
    actividadesResult = "Sin Actividades Turisticas Registradas";
    arrayResult.push(actividadesResult);
  }
return arrayResult;
}
