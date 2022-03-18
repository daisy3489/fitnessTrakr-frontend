import axios from 'axios';

const BASE_URL = "https://fitnesstrac-kr.herokuapp.com/api";

export default axios.create({
    baseURL: BASE_URL
});