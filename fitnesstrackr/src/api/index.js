import axios from 'axios'

const BASE_URL = "https://fitnesstrac-kr.herokuapp.com/api";

//export const getRoutines = await axios.get(`${BASE_URL}/routines`)


//axios will perform a http get request on a particular url
//axios is promise based so we .then
export const getRoutines = axios.get(`${BASE_URL}/routines`)
.then(res => {
    // const persons = res.data;
    // this.setState({ persons });
})