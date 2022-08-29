import { useState,useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import LoadingScreen from '../shared/LoadingScreen'
import { getAllPlants } from '../../api/plants'
import messages from '../shared/AutoDismissAlert/messages'

import { Button, Form } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'
import { createPlant } from '../../api/myplants'
import { copyPlantSuccess, copyPlantFailure } from '../shared/AutoDismissAlert/messages'
// PlantsIndex should make a request to the api
// To get all plants
// Then display them when it gets them
// style for our card container
const cardContainerStyle = {
display: 'flex',
flexFlow: 'row wrap',
justifyContent: 'center',
backgroundImage: "url('https://slack-imgs.com/?c=1&o1=ro&url=https%3A%2F%2Fimg.freepik.com%2Ffree-photo%2Fside-border-made-with-fresh-green-leaves-white-background_23-2147893798.jpg%3Fw%3D2000')",
backgroundPosition: 'center',
backgroundSize: 'cover',
width: '100vw',
height: '100vh',
backgroundAttachment: 'fixed',
overflowY: 'scroll'
}



const PlantsIndex = (props) => {
    const [plants, setPlants] = useState(null)
    const [error, setError] = useState(false)

    const [plant, setPlant] = useState(null)
    const { msgAlert, user } = props
    const navigate = useNavigate()
// console.log('Props in PlantsIndex', props)
useEffect(() => {
    console.log('owner in useefect', plants)
    // console.log(props)
    getAllPlants()
        .then(res => setPlants(res.data.plants))
        .catch(err => {
            msgAlert({
                heading: 'Error Getting Plants',
                message: messages.getPlantsFailure,
                variant: 'danger',
            })
            setError(true)
        })
    }, [])

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

    // console.log('++++++', plants)
    if (error) {
        return <p>Error!</p>
    }
    // If plants haven't been loaded yet, show a loading message
    if (!plants) {
        return <LoadingScreen />
    } else if (plants.length === 0) {
        return <p>No plants yet. Better add some.</p>
    }

    const seededPlants = plants.filter(plants => plants.isSeeded === true)
 
    const plantCards = seededPlants.map(plant => (
        <Card style={{backgroundColor: 'rgba(218, 247, 166, 0.6)', width: '800px', height: '300px',  margin: 17, overflowY: 'scroll'}} key={ plant._id }class="cards" >
            <Card.Body>
                <Card.Text style={{display: 'flex', justifyContent: 'flex-end'}}>


                    <Link to={`/greenhome/${plant._id}`}>
                    <img  src={`${plant.image}`} style={{display: 'inline-block'}} width="130px" height="auto"/>
                    </Link>
                    <div>
                    <Link to={`/greenhome/${plant._id}`}> <h3 style={{color:'black'}}>{ plant.name }</h3></Link>
                    <Form onSubmit={handleSubmit}>
                {/* <Form.Label htmlFor="name">Name</Form.Label> */}
                <Form.Control
                    placeholder="Type of plant"
                    name="name"
                    id="name"
                    defaultValue={ plant.name }
                    hidden
                />
                {/* <Form.Label htmlFor="description">Description</Form.Label> */}
                <Form.Control
                    placeholder="Description of the plant"
                    name="description"
                    id="description"
                    defaultValue={ plant.description }
                    hidden
                />
                {/* <Form.Label htmlFor="light">Light</Form.Label> */}
                <Form.Control
                    placeholder="Light requirement"
                    type="text"
                    name="light"
                    id="light"
                    defaultValue={ plant.light }
                    hidden
                />
                {/* <Form.Label htmlFor="water">Water</Form.Label> */}
                <Form.Control
                    placeholder="Water requirement"
                    type="text"
                    name="water"
                    id="water"
                    defaultValue={ plant.water }
                    hidden
                />
                {/* <Form.Label htmlFor="temperature">Temperature</Form.Label> */}
                <Form.Control
                    placeholder="Temperature requirement"
                    type="text"
                    name="temperature"
                    id="temperature"
                    defaultValue={ plant.temperature }
                    hidden
                />
                {/* <Form.Label htmlFor="poisonous">Poisonous</Form.Label> */}
                <Form.Control
                    placeholder="Is the plant poisonous?"
                    type="text"
                    name="poisonous"
                    id="poisonous"
                    defaultValue={ plant.poisonous }
                    hidden
                />
                {/* <Form.Label htmlFor="image">Image</Form.Label> */}
                <Form.Control
                    placeholder="Image URL"
                    type="text"
                    name="image"
                    id="image"
                    defaultValue={ plant.image }
                    hidden
                />
                {
                    user
                    ?
                    <>
                    <Button type="submit">Add To My Garden</Button>
                    </>
                    :
                    null
                }
                    </Form>
                    <p > <br></br>{`${plant.description}`}</p>
                    </div>
                </Card.Text>
            </Card.Body>
        </Card>
    ))
    
    return (
        <div style={ cardContainerStyle }>
            { plantCards }
        </div>
    )

}
export default PlantsIndex