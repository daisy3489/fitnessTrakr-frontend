import axios from 'axios'

const BASE_URL = "https://guarded-meadow-11677.herokuapp.com/api";

export const getRoutines = await axios.get(`${BASE_URL}/routines`)
