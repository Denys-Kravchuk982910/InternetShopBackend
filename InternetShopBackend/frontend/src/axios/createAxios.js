import axios from "axios";


const createAxios = axios.create({
    baseURL: 'http://localhost:5001'
})

export default createAxios;