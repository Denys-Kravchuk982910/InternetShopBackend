import axios from "axios";


const createAxios = axios.create({
    baseURL: 'https://backend.crosshoprv.live'
})

export default createAxios;