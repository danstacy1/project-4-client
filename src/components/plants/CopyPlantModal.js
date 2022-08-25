import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import PlantForm from '../shared/PlantForm'
import { useParams, useNavigate } from 'react-router-dom'
import { createPlant } from '../../api/myplants'
import { copyPlantSuccess, copyPlantFailure } from '../shared/AutoDismissAlert/messages'

const CopyPlantModal = (props) => {
    const { 
        user, show, handleClose, 
        msgAlert, triggerRefresh
    } = props

    const [plant, setPlant] = useState(props.plant)
    const [ copyModalShow, setCopyModalShow ] = useState(false)
    const navigate = useNavigate()

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
        createPlant(user, plant)
            // if we're successful, navigate to the show page for the new plant
            .then(res => { navigate(`/greenhome/myplants/${res.data.plant._id}`)})
            // send a success message to the user
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: copyPlantSuccess,
                    variant: 'success'
                })
            })
            // if there is an error, tell the user about it
            .catch(() =>
                msgAlert({
                    heading: 'Oh No!',
                    message: copyPlantFailure,
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

export default CopyPlantModal