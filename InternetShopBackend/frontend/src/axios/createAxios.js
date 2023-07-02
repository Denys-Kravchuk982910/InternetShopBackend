import axios from "axios";


const createAxios = axios.create({
    baseURL: 'http://92.119.231.6:5001'
})

export default createAxios;