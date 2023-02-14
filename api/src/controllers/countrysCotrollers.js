const {Activities,Countries}=require("../db");
const {Op}=require("sequelize");
const axios = require("axios");

const getCountries = async () => {
    let countries = null;
    countries = await Countries.findAll();
    if (countries.length===0){
        await cargaBDCountries();
        countries = await Countries.findAll();
    }
    return countries;
};

const findCountries = async (name) => {
   if (!name) throw Error("Error: Debe existir un valor en el Atributo name, name=null..!");
    let countries = await Countries.findAll({
        where:{
            name:{
                [Op.iLike]:`%${name}%`,
            }
        }
    });
    //if (countries.length===0) throw Error(`Error: No se encontro ningun Pais con el nombre: ${name} !`);
    return countries;
};

const getCountryById = async (id) => {
    const options ={
        include:{
            model: Activities,
            attributes: ["name", "difficulty","duration","season"],
            through:{
                attributes:[],
            }
        }
    }
    let country = await Countries.findByPk(id, options);
    if (!country) throw Error("Error: No se encontro el ID en la BD de Countries!!")
    return country;
}

const getDataRestCountries = async () =>{
    try {
        let response = await axios.get("https://restcountries.com/v3.1/all");
        let data = await response.data;
        let dataRequerida = await data.map((c) => {
            let capital = !c.capital ? 's/d': c.capital[0];
            let continent = !c.continents ? 's/d': c.continents[0];
            let subregion = !c.subregion ? 's/d': c.subregion;
            let reg = {
                id: c.cca3,
                name: c.name.common,
                flags: c.flags.png,
                continent: continent,
                capital: capital,
                subregion: subregion,
                area: c.area,
                population: c.population
            };
            return reg;
        });
        return dataRequerida;
    } catch (error) {
        console.log(error.message);
    }
};

const cargaBDCountries = async () =>{
    try {
        const dataOK = await getDataRestCountries();
        await Promise.all(
            dataOK.map(async (element)=>{
                await Countries.create(element);
            })
        )
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {findCountries,getCountries,getCountryById};
