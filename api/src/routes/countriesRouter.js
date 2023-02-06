const { Router } = require('express');

const {findCountries,getCountries,getCountryById}=require("../controllers/countrysCotrollers");

const countriesRouter = Router();

// - [ ] __GET /countries__:
//   - En una primera instancia deberán traer todos los países desde restcountries y guardarlos en su propia base de datos y luego ya utilizarlos desde allí (Debe retonar sólo los datos necesarios para la ruta principal)
//   - Obtener un listado de los paises.
// - [ ] __GET /countries?name="..."__:
//   - Obtener los países que coincidan con el nombre pasado como query parameter (No necesariamente tiene que ser una matcheo exacto)
//   - Si no existe ningún país mostrar un mensaje adecuado

countriesRouter.get("/", async (req,res)=>{
    const {name}=req.query;
    let countries = {};
    try {
        if (name){
            countries = await findCountries(name);
        }else{
            countries = await getCountries();
        };
        //console.log('countries router',countries);
        res.status(200).json(countries);
    } catch (error) {
        res.status(400).json({error:error.message});
    }
})

// - [ ] __GET /countries/{idPais}__:
//   - Obtener el detalle de un país en particular
//   - Debe traer solo los datos pedidos en la ruta de detalle de país
//   - Incluir los datos de las actividades turísticas correspondientes
countriesRouter.get("/:id", async (req,res)=>{
    const {id}=req.params;
    try {
        const country = await getCountryById(id);
        res.status(200).json(country);
    } catch (error) {
        res.status(400).json({error:error.message});
    }
    
})

module.exports = countriesRouter;
