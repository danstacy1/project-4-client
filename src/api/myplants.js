import apiUrl from '../apiConfig'
import axios from 'axios'

// READ => INDEX
export const getAllMyPlants = (user) => {
    console.log('this is user', user)
    return axios({
		url: apiUrl + '/greenhome/myplants',
		method: 'GET',
		headers: {
			Authorization: `Bearer ${user.token}`,
		},
    })
}

// READ => SHOW
export const getOneMyPlant = (myplantId, user) => {
    // console.log("plant id +++++++++++++", id)
    console.log("===============+++++", myplantId)
    return axios({
		url: apiUrl + `/greenhome/myplants/${myplantId}`,
		method: 'GET',
		headers: {
			Authorization: `Bearer ${user.token}`,
		},
    })
}

// CREATE
export const createPlant = (user, newPlant) => {
    // console.log('createPlant in api was hit')
    // in our createplant form, we're building an object
    // when we pass that object into the api createPlant function,
    // it's going to look like the plants in our database
    // we're going to refer to this as newPlant
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