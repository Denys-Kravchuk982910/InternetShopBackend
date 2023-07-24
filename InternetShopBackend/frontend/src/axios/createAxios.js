import axios from "axios";


const createAxios = axios.create({
    baseURL: 'https://localhost:5001'
})

export default createAxios;