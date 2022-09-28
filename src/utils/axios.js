import axios from "axios";

const API = axios.create({
    baseURL: 'http://115.159.200.121:8000',
    // baseURL: 'http://localhost:8000'
})


export default API