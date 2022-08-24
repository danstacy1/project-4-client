import apiUrl from '../apiConfig'
import axios from 'axios'

// READ => INDEX
export const getAllMyPlants = () => {
    return axios(`${apiUrl}/greenhome/myplants`)
}

// READ => SHOW
export const getOneMyPlant = (id) => {
    console.log("plant id +++++++++++++", id)
    return axios(`${apiUrl}/greenhome/myplants/${id}`)
}

// CREATE
export const createPlant = (user, newPlant) => {
    // console.log('createPlant in api was hit')
    // in our createplant form, we're building an object
    // when we pass that object into the api createPlant function,
    // it's going to look like the plants in our database
    // we're going to refer to this as newPlant
    console.log('this is user', user)
    console.log('this is newPlant', newPlant)
	return axios({
		url: apiUrl + '/greenhome/myplants',
		method: 'POST',
		headers: {
			Authorization: `Bearer ${user.token}`,
		},
		data: { plant: newPlant }
	})
}

// UPDATE
export const updatePlant = (user, updatedPlant) => {
    // console.log('createPlant in api was hit')
    // in our createplant form, we're building an object
    // when we pass that object into the api createPlant function,
    // it's going to look like the plants in our database
    // we're going to refer to this as newPlant
    // console.log('this is user', user)
    console.log('this is updatedPlant', updatedPlant)
	return axios({
		url: `${apiUrl}/greenhome/myplants/${updatedPlant._id}`,
		method: 'PATCH',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: { plant: updatedPlant }
	})
}

// DELETE
export const removePlant = (user, plantId) => {
    return axios({
        url: `${apiUrl}/greenhome/myplants/${plantId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`,
        }
    })
}