import axios from 'axios';
const apiProvider = axios.create({});
const swapi = 'https://swapi.co/api/';

export const loginUser = async (username, password) =>{
    let isSuccess = false;
    try{
        const searchResult = await apiProvider.get(
            swapi + 'people',
            {
                params: {
                    search: username,
                },
            },
        );
        const {data} = searchResult;
        if (data.count === 1 && data.results[0].birth_year === password){
            isSuccess = true;
        }
        return isSuccess;
    }catch(error){
        return isSuccess;
    }
}
export const searchPlanets = async (searchText) =>{
    try{
        const searchResult = await apiProvider.get(
            swapi + 'planets',
            {
                params: {
                    search: searchText,
                },
            },
        );
        const {data} = searchResult;
        return data.results;
    }catch(error){
        throw error
    }
}

export const getPlanetInfo = async(uri) => {
    try{
        const planetInfo = await apiProvider.get(
            uri
        );
        console.log(planetInfo);
    }catch(error){
        throw error;
    }
}