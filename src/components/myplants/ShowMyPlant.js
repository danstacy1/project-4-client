import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
// useParams will allow us to see our parameters
// useNavigate will allow us to navigate to a specific page
import { Container, Card } from 'react-bootstrap'
import LoadingScreen from '../shared/LoadingScreen'
import { getOneMyPlant } from '../../api/myplants'
import messages from '../shared/AutoDismissAlert/messages'
// We need to get the plant's id from the parameters
// Then we need to make a request to the api
// Then we need to display the results in this component
const ShowMyPlant = (props) => {
    const [myplant, setMyPlant] = useState(null)

    const { myplantid } = useParams()
    // console.log("This is the IDDDDDDD", myplantid)
    // console.log("here are the props", props)
    const navigate = useNavigate()
    // useNavigate returns a function
    // we can call that function to redirect the user wherever we want to
    const { msgAlert, user } = props
    // console.log('user in props', user)
    // console.log('the plant in showPlant', plant)
    // destructuring to get the id value from our route parameters
    // console.log("-----------------------", res.data.myplant)
    useEffect(() => {
        getOneMyPlant(myplantid, user)
            .then(res => setMyPlant(res.data.myplant))
            .catch(err => {
                msgAlert({
                    heading: 'Error getting plant',
                    message: messages.getPlantsFailure,
                    variant: 'danger'
                })
                // navigate('/')
                //navigate back to the home page if there's an error fetching
            })
    }, [])
    if (!myplant) {
        return <LoadingScreen />
    }
    return (
        <>
            <Container className="fluid">
                <Card>
                    <Card.Header>{ myplant.name }</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <div><small><img src={`${myplant.image}`}></img></small></div>
                            <div><small>Description: { myplant.description }</small></div>
                            <div><small>Light: { myplant.light }</small></div>
                            <div><small>Water: { myplant.water }</small></div>
                            <div><small>Temperature: { myplant.temperature }</small></div>
                            <div><small>Poisonous: { myplant.poisonous }</small></div>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}
export default ShowMyPlant