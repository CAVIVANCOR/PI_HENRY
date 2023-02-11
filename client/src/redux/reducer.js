import {GET_ALL_COUNTRIES,
        GET_COUNTRY_BY_ID,
        GET_COUNTRIES_BY_NAME,
        GET_ACTIVITIES_TURISTICS,
        FILTER_COUNTRIES_BY_CONTINENT,
        FILTER_COUNTRIES_BY_ACTIVITY,
        ORDER_COUNTRIES_BY_NAME,
        ORDER_COUNTRIES_BY_POBLATION,
        ADD_ACTIVITY_TURISTIC
    } from './actions-types';

const initialState = {
    countries:[],
    countriesALL:[],
    countryDetail:{},
    activities:[]
}

const rootReducer = (state=initialState,action)=>{
    switch (action.type) {
        case GET_ALL_COUNTRIES:
            return {...state, countries: action.payload, countriesALL:action.payload}
        case GET_COUNTRY_BY_ID:
            return {...state, countryDetail: action.payload};
        case GET_COUNTRIES_BY_NAME:
            return {...state, countries: action.payload};
        case GET_ACTIVITIES_TURISTICS:
            return {...state, activities: action.payload};
        case FILTER_COUNTRIES_BY_CONTINENT:
            let copiaCountriesC = [...state.countries]
            let copiaCountriesAllC = [...state.countriesALL]
            let countriesByContinentC = action.payload === "Todos" ? copiaCountriesAllC : copiaCountriesC.filter((e)=>(e.continent===action.payload))
            return {...state, countries: countriesByContinentC}
        case FILTER_COUNTRIES_BY_ACTIVITY:
            let copiaCountriesA = [...state.countries];
            let copiaCountriesAllA = [...state.countriesALL];
            let copiaActivities = [...state.activities];
            let arrayCountries = copiaActivities.map((e)=>e.countries).flat();
            let arrayCountries2 = arrayCountries.map((e)=>e.name);
            const countriesUnicas = arrayCountries2.filter((item,index)=>{
                return (arrayCountries2.indexOf(item) === index);
            })
            let countriesByContinentA = action.payload === "Todos" ? copiaCountriesAllA : copiaCountriesA.filter((e)=>(countriesUnicas.includes(e.name)))
            return {...state, countries: countriesByContinentA}
        case ORDER_COUNTRIES_BY_NAME:
            let countriesOrdenadaName = action.payload==="ascN" ?
                state.countries.sort((a,b)=>{
                    if (a.name>b.name){
                        return 1;
                    };
                    if (b.name>a.name){
                        return -1;
                    };
                    return 0;
                })
            :
                state.countries.sort((a,b)=>{
                    if (a.name>b.name){
                        return -1;
                    };
                    if (b.name>a.name){
                        return 1;
                    };
                    return 0;
                })
                return {...state, countries: countriesOrdenadaName}
        case ORDER_COUNTRIES_BY_POBLATION:
            let countriesOrdenadaPoblation = action.payload==="ascP" ?
                state.countries.sort((a,b)=>{
                    if (a.population>b.population){
                        return 1;
                        };
                    if (b.population>a.population){
                        return -1;
                            };
                    return 0;
                        })
            :
                state.countries.sort((a,b)=>{
                    if (a.population>b.population){
                        return -1;
                        };
                    if (b.population>a.population){
                        return 1;
                        };
                    return 0;
                        })
            return {...state, countries: countriesOrdenadaPoblation}
        case ADD_ACTIVITY_TURISTIC:
                return state;
        default:
            return state;
    }
};

export default rootReducer;

