import { useState,useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'

import LoadingScreen from '../shared/LoadingScreen'
import { getAllMyPlants } from '../../api/myplants'
import messages from '../shared/AutoDismissAlert/messages'


// MyPlantsIndex should make a request to the api
// To get all plants
// Then display them when it gets them

// style for our card container
const cardContainerStyle = {
display: 'flex',
flexFlow: 'row wrap',
justifyContent: 'center'
}

const MyPlantsIndex = (props) => {
const [myplants, setMyPlants] = useState(null)
const [error, setError] = useState(false)

const { user, msgAlert, myplant } = props

console.log('Props in PlantsIndex', props)
console.log('MPIndex', myplants)

useEffect(() => {
    // console.log(props)
    getAllMyPlants(user)
        .then(res => setMyPlants(res.data.myplants))
        .catch(err => {
            msgAlert({
                heading: 'Error Getting Plants',
                message: messages.getPlantsFailure,
                variant: 'danger',
            })
            setError(true)
        })    
    }, [])
    // console.log('++++++', myPlants)
    if (error) {
        return <p>Error!</p>
    }

    // If plants haven't been loaded yet, show a loading message
    if (!myplants) {
        return <LoadingScreen />
    } else if (myplants.length === 0) {
        return <p>No plants yet. Better add some.</p>
    }
    
    // <>
    let myPlantCards
    console.log('user._id in MPIndex', user._id)
    console.log('++++++', myplants)
    if (myplants) {
        myPlantCards = myplants.map(myplant => (
        // console.log('user in MPIndex', user)
        <Card style={{ width: '30%', margin: 5}} key={ myplant._id }>
                {/* console.log('user._id in MPIndex', myPlant.owner._id) */}
                <Card.Header><Link to={`/greenhome/myplants/${myplant._id}`}> { myplant.name }</Link></Card.Header>
                <Card.Body>
                    <Card.Text>
                        <Link to={`/greenhome/myplants/${myplant._id}`}> <img src={`${myplant.image}`} height="200" width="auto" /></Link>
                    </Card.Text>
                </Card.Body>
            </Card>
        ))
    }
        // </>
        
        console.log("====================", user, myplants)
    return (
        <div style={ cardContainerStyle }>
            {/* {
            (user && myplants)
            ? */}
            { myPlantCards }
            {/* :
            null
            } */}
        </div>
    )
}

export default MyPlantsIndex