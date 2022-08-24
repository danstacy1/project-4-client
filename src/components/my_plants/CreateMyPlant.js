import { useState } from 'react'
import { createPlant } from '../../api/my_plants'
import { useNavigate } from 'react-router-dom'
import { createPlantSuccess, createPlantFailure } from '../shared/AutoDismissAlert/messages'
import PlantForm from '../shared/PlantForm'

const CreatePlant = (props) => {
    console.log('these are the props in createPlant\n', props)
    const { user, msgAlert } = props

    const navigate = useNavigate()

    const [myPlant, setPlant] = useState({
        name: '',
        description: '',
        light: '',
        water: '',
        temperature: '',
        poisonous: '',
        image: ''
    })

    console.log('this is myPlant in createPlant', myPlant)

    const handleChange = (e) => {
        setPlant(prevPlant => {
            let updatedValue = e.target.value
            const updatedName = e.target.name

            console.log('this is the input type', e.target.type)

            // if (e.target.type === 'number') {
            //     // this is looking at the input type, and changing it from the default, which is a string, into an actual number
            //     updatedValue = parseInt(e.target.value)
            // }

            // this handles the checkbox, changing on to true etc
            // if (updatedName === "adoptable" && e.target.checked) {
            //     updatedValue = true
            // } else if (updatedName === "adoptable" && !e.target.checked) {
            //     updatedValue = false
            // }

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

        createPlant(user, myPlant)
            // if we're successful, navigate to the show page for the new plant
            // .then(myPlant.push())
            .then(res => { navigate(`/greenhome/myplants`)})
            // ${res.data.plant._id}`)})
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
            myPlant={ myPlant } 
            handleChange={ handleChange }
            handleSubmit={ handleSubmit }
            heading="Add a new plant!"
        />
    )
}

export default CreatePlant