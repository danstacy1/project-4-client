import { useState,useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'

import LoadingScreen from '../shared/LoadingScreen'
import { getAllPlants } from '../../api/plants'
import messages from '../shared/AutoDismissAlert/messages'
import AddMyPlant from '../my_plants/AddMyPlants'
import RemoveMyPlant from '../my_plants/RemoveMyPlants'

// PlantsIndex should make a request to the api
// To get all plants
// Then display them when it gets them

// style for our card container
const cardContainerStyle = {
display: 'flex',
flexFlow: 'row wrap',
justifyContent: 'center'
}

const PlantsIndex = (props) => {
const [plants, setPlants] = useState(null)
const [error, setError] = useState(false)

const {myPlants} = props
const {user} = props
const { msgAlert } = props

console.log('Props in PlantsIndex', props)

useEffect(() => {
    console.log(props)
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
    console.log('++++++', plants)
    if (error) {
        return <p>Error!</p>
    }

    // If plants haven't been loaded yet, show a loading message
    if (!plants) {
        return <LoadingScreen />
    } else if (plants.length === 0) {
        return <p>No plants yet. Better add some.</p>
    }

    

    const addRemoveMyPlant = (plant) => {
        console.log('plant', plant)
        console.log('MYPLANT =========', myPlants)
        for (let i = 0; i < myPlants.length; i++) {
                console.log('list id', myPlants[i]._id)
                console.log('plant id', plant._id)
                console.log('user id', user._id)
                console.log('plant user id', myPlants[i].userId)
                if(myPlants[i]._id === plant._id && user._id === myPlants[i].userId) {
                    return true
                }
            }
            return false
    }

    const plantCards = plants.map(plant => (
        <Card style={{ width: '30%', margin: 5}} key={ plant._id }>
            <Card.Header><Link to={`/greenhome/${plant._id}`}> { plant.name }</Link></Card.Header>
            <Card.Body>
                <Card.Text>
                    <Link to={`/greenhome/${plant._id}`}> <img src={`${plant.image}`} height="200" width="auto" /></Link>
                </Card.Text>
                { addRemoveMyPlant(plant)
                    ?  
                    <div onClick={() => props.handleRemoveClick(plant)} className='controls'>
                        <RemoveMyPlant /> 
                    </div>  
                    :     
                    <div onClick={() => props.handleMyPlantClick(plant)} className='controls'>
                        <AddMyPlant />
                    </div>        
                }
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