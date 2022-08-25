import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
// useParams will allow us to see our parameters
// useNavigate will allow us to navigate to a specific page
import { Container, Card } from 'react-bootstrap'
import LoadingScreen from '../shared/LoadingScreen'
import { getOnePlant } from '../../api/plants'
import messages from '../shared/AutoDismissAlert/messages'
// We need to get the plant's id from the parameters
// Then we need to make a request to the api
// Then we need to display the results in this component
const ShowPlant = (props) => {
    const [plant, setPlant] = useState(null)
    const { id } = useParams()
    // console.log("here are the props", props)
    const navigate = useNavigate()
    // useNavigate returns a function
    // we can call that function to redirect the user wherever we want to
    const { msgAlert } = props
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
                            <div><small><img src={`${plant.image}`}></img></small></div>
                            <div><small>Description: { plant.description }</small></div>
                            <div><small>Light: { plant.light }</small></div>
                            <div><small>Water: { plant.water }</small></div>
                            <div><small>Temperature: { plant.temperature }</small></div>
                            <div><small>Poisonous: { plant.poisonous }</small></div>
                        </Card.Text>
                    </Card.Body>
                </Card>
                {/* button only visible if signed in */}
                {/* set up button to create plant */}
                {/* import createplant function from myplants api */}
                {/* add handleAddPlant above */}
                {/* bring user in as prop */}
                <Button></Button>
            </Container>
        </>
    )
}
export default ShowPlant