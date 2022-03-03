import axios from 'axios';

const BASE_URL = "https://guarded-meadow-11677.herokuapp.com/api";


export default axios.create({
    baseURL: BASE_URL
});