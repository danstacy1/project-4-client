import { useState,useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import LoadingScreen from '../shared/LoadingScreen'
import { getAllPlants } from '../../api/plants'
import messages from '../shared/AutoDismissAlert/messages'
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
const { msgAlert } = props
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
        <Card style={{ width: '700px', height: '300px', margin: 30}} key={ plant._id }class="cards" >
            <Card.Body>
                <Card.Text>
                    <Link to={`/greenhome/${plant._id}`}> <h3>{ plant.name }</h3></Link>
                    <img src={`${plant.image}`}  width="25%" height="auto" />
                    <Link to={`/greenhome/${plant._id}`}>
                    </Link>
                    <p> {`${plant.description}`}</p>
                    
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















