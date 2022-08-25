import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
// useParams will allow us to see our parameters
// useNavigate will allow us to navigate to a specific page
import { Container, Card, Button } from 'react-bootstrap'
import LoadingScreen from '../shared/LoadingScreen'
import { getOneMyPlant, updateMyPlant } from '../../api/myplants'
import messages from '../shared/AutoDismissAlert/messages'
import EditMyPlantModal from './EditMyPlantModal'



// We need to get the plant's id from the parameters
// Then we need to make a request to the api
// Then we need to display the results in this component
const ShowMyPlant = (props) => {
    const [myplant, setMyPlant] = useState(null)
    const [ editModalShow, setEditModalShow ] = useState(false)
    const { myplantid } = useParams()
    const [ updated, setUpdated ] = useState(false)
    
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
    }, [updated])
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
                    <Card.Footer>                      
                        {
                            myplant.owner && user && myplant.owner._id === user._id 
                            ?
                            <>
                                <Button onClick={() => setEditModalShow(true)} 
                                    className="m-2" 
                                    variant="warning"
                                >
                                    Edit Plant
                                </Button>
                                {/* <Button onClick={() => removeThePlant()}
                                    className="m-2"
                                    variant="danger"
                                >
                                    Set {plant.name} Free
                                </Button> */}
                            </>
                            :
                            null
                        }
                    </Card.Footer>
                </Card>
            </Container>
            <EditMyPlantModal 
                user={user}
                myplant={myplant} 
                show={editModalShow} 
                updateMyPlant={updateMyPlant}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                handleClose={() => setEditModalShow(false)} 
            />
        </>
    )
}
export default ShowMyPlant