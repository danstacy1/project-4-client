import apiUrl from '../apiConfig'
import axios from 'axios'

// CREATE
export const createNote = (user, plantId, newNote) => {
    console.log('the user in createPlant', user)
    console.log('the newToy in createPlant', newNote)
	return axios({
		url: `${apiUrl}/notes/${plantId}`,
		method: 'POST',
		data: { note: newNote }
	})
}

// UPDATE plant
export const updateNote = (user, plantId, updatedNote) => {
    console.log('this is updatedNote', updatedNote)
	return axios({
		url: `${apiUrl}/notes/${plantId}/${updatedNote._id}`,
		method: 'PATCH',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: { note: updatedNote }
	})
}

// DELETE note
export const deleteNote = (user, plantId, noteId) => {
	return axios({
		url: `${apiUrl}/notes/${plantId}/${noteId}`,
		method: 'DELETE',
		headers: {
			Authorization: `Token token=${user.token}`,
		}
	})
}