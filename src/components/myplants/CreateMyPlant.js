import { useState } from 'react'
import { createPlant } from '../../api/myplants'
import { useNavigate } from 'react-router-dom'
import { createPlantSuccess, createPlantFailure } from '../shared/AutoDismissAlert/messages'
import PlantForm from '../shared/PlantForm'
const CreatePlant = (props) => {
    // console.log('these are the props in createPlant\n', props)
    const { user, msgAlert } = props
    const navigate = useNavigate()
    const [plant, setPlant] = useState({
        name: '',
        description: '',
        light: '',
        water: '',
        temperature: '',
        poisonous: '',
        image: ''
    })
    // console.log('this is plant in createPlant', plant)
    const handleChange = (e) => {
        setPlant(prevPlant => {
            let updatedValue = e.target.value
            const updatedName = e.target.name
            // console.log('this is the input type', e.target.type)
            const updatedPlant = {
                [updatedName]: updatedValue
            }
            return {
                ...prevPlant,
                ...updatedPlant
            }
        })
    }
    // We'll add a handleSubmit here that makes an api request, then handles the response
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
                    message: createPlantSuccess,
                    variant: 'success'
                })
            })
            // if there is an error, tell the user about it
            .catch(() =>
                msgAlert({
                    heading: 'Oh No!',
                    message: createPlantFailure,
                    variant: 'danger'
                })
            )
    }
    return (
        <PlantForm
            plant={ plant }
            handleChange={ handleChange }
            handleSubmit={ handleSubmit }
            heading="Add a new plant!"
        />
    )
}
export default CreatePlant