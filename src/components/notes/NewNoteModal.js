import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import NoteForm from '../shared/NoteForm'
import { createNote } from '../../api/notes'


const NewNoteModal = (props) => {
    const { 
        user, plant, show, handleClose, msgAlert, triggerRefresh
    } = props

    const [note, setNote] = useState({})

    console.log('plant in edit modal', plant)

    const handleChange = (e) => {
        setNote(prevNote => {
            let value = e.target.value
            const name = e.target.name

            console.log('this is the input type', e.target.type)

/////////////check this... name might be note///////////////
            const updatedNote = {
                [name]: value
            }
            return {
                ...prevNote,
                ...updatedNote
            }
        })
    }

    const handleSubmit = (e) => {
        // e equals the event
        e.preventDefault()

        createNote(user, plant._id, note)
            // if we're successful in the modal, we want the modal to close
            .then(() => handleClose())
            // send a success message to the user
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: 'Great! Note Added!',
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            // if there is an error, tell the user about it
            .catch(() => 
                msgAlert({
                    heading: 'Oh No!',
                    message: 'Something went wrong, please try again',
                    variant: 'danger'
                })
            )
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <NoteForm 
                    note={note}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    heading="Leave A Note"
                />
            </Modal.Body>
        </Modal>
    )
}

export default NewNoteModal