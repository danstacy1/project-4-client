import apiUrl from '../apiConfig'
import axios from 'axios'

// READ => INDEX
export const getAllPlants = () => {
    return axios(`${apiUrl}/greenhome`)
}

// READ => SHOW
export const getOnePlant = (id) => {
    return axios(`${apiUrl}/greenhome/${id}`)
}