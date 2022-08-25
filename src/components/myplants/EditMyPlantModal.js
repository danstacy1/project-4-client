import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import PlantForm from '../shared/PlantForm'
import { updatePlantSuccess, updatePlantFailure } from '../shared/AutoDismissAlert/messages'

const EditMyPlantModal = (props) => {
    const { 
        user, show, handleClose, 
        updatePlant, msgAlert, triggerRefresh
    } = props

    const [plant, setPlant] = useState(props.plant)

    console.log('plant in edit modal', plant)

    const handleChange = (e) => {
        setPlant(prevPlant => {
            let updatedValue = e.target.value
            const updatedName = e.target.name

            console.log('this is the input type', e.target.type)

            const updatedPlant = {
                [updatedName]: updatedValue
            }
            return {
                ...prevPlant,
                ...updatedPlant
            }
        })
    }

    const handleSubmit = (e) => {
        // e equals the event
        e.preventDefault()

        updatePlant(user, plant)
            // if we're successful in the modal, we want the modal to close
            .then(() => handleClose())
            // send a success message to the user
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: updatePlantSuccess,
                    variant: 'success'
                })
            })
            // if everything is successful, we need to trigger our refresh for the show page
            .then(() => triggerRefresh())
            // if there is an error, tell the user about it
            .catch(() => 
                msgAlert({
                    heading: 'Oh No!',
                    message: updatePlantFailure,
                    variant: 'danger'
                })
            )
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <PlantForm 
                    plant={plant}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    heading="Update Plant"
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditMyPlantModal