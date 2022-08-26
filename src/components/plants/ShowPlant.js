import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
// useParams will allow us to see our parameters
// useNavigate will allow us to navigate to a specific page
import { Container, Card, Button, Form } from 'react-bootstrap'
import LoadingScreen from '../shared/LoadingScreen'
import { getOnePlant } from '../../api/plants'
import messages from '../shared/AutoDismissAlert/messages'
// import CopyPlantModal from './CopyPlantModal'
import { copyPlantSuccess, copyPlantFailure } from '../shared/AutoDismissAlert/messages'
import { createPlant } from '../../api/myplants'


// We need to get the plant's id from the parameters
// Then we need to make a request to the api
// Then we need to display the results in this component
const ShowPlant = (props) => {
    const [plant, setPlant] = useState(null)
    const { id } = useParams()
    const [ copyModalShow, setCopyModalShow ] = useState(false)
    const navigate = useNavigate()

    // console.log("here are the props", props)
    // useNavigate returns a function
    // we can call that function to redirect the user wherever we want to
    const { msgAlert, user } = props
    // console.log('user in props', user)
    // console.log('the plant in showPlant', plant)
    // destructuring to get the id value from our route parameters
    useEffect(() => {
        getOnePlant(id)
            .then(res => setPlant(res.data.plant))
            .catch(err => {
                msgAlert({
                    heading: 'Error getting plant',
                    message: messages.getPlantsFailure,
                    variant: 'danger'
                })
                navigate('/')
                //navigate back to the home page if there's an error fetching
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

    if (!plant) {
        return <LoadingScreen />
    }
    return (
        <>
            <Container className="fluid">
                <Card>
                    <Card.Header>{ plant.name }</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            {/* <Button onClick={() => setCopyModalShow(true)} 
                                    className="m-2" 
                                    variant="success"
                                    >
                                    Add { plant.name } To My Garden
                                </Button> */}
                                    {/* button only visible if signed in */}
                                    {/* set up button to create plant */}
                                    {/* import createplant function from myplants api */}
                                    {/* add handleAddPlant above */}
                                    {/* bring user in as prop */}
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
                                    <Button type="submit">Add {plant.name} To My Garden</Button>
                                </Form>
                            <div><small><img src={`${plant.image}`}></img></small></div>
                            <div><small>Description: { plant.description }</small></div>
                            <div><small>Light: { plant.light }</small></div>
                            <div><small>Water: { plant.water }</small></div>
                            <div><small>Temperature: { plant.temperature }</small></div>
                            <div><small>Poisonous: { plant.poisonous }</small></div>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Container>
            {/* <CopyPlantModal 
                user={user}
                plant={plant} 
                show={copyModalShow} 
                // updatePlant={updatePlant}
                msgAlert={msgAlert}
                // triggerRefresh={() => setUpdated(prev => !prev)}
                handleClose={() => setCopyModalShow(false)} 
            /> */}
        </>
    )
}
export default ShowPlant