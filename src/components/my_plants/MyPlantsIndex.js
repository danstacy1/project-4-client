import { useEffect } from 'react';
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import AddMyPlant from '../my_plants/AddMyPlants'
import RemoveMyPlant from '../my_plants/RemoveMyPlants'
import LoadingScreen from '../shared/LoadingScreen'

const MyPlantsIndex = (props) => {
    const { myPlants } = props
    const { user } = props
    
    const cardContainerStyle = {
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'center'
    }

    // const { showModal, setShowModal } = props

    if (!myPlants) {
        return <LoadingScreen />
    } else if (myPlants.length === 0) {
        return <p>No plants yet. Better add some.</p>
    }

    const addRemoveMyPlant = (plant) => {
        // console.log('plant',  plant)
            for (let i = 0; i <myPlants.length; i++) {
                // console.log('list id', favorites[i]._id)
                // console.log('book id', book._id)
                // console.log('user id', user._id)
                // console.log('book user id', favorites[i].userId)
                if(myPlants[i]._id === plant._id && user._id === myPlants[i].userId) {
                    return true
                }
            }
            return false
    }
// change myPlants to myPlantCards and myPlants to myPlants
    const myPlantCards = myPlants.map(plant => {
        console.log('my plant map ========', plant)
        console.log('my plant props ========', props)
        if (plant.userId === user._id) {
            return (
                <Card style={{ width: '30%', margin: 5}} key={ plant._id }>
                    <Card.Header>
                        <Link to={`/greenhome/myplants/${plant._id}`}> { plant.name }</Link>
                    </Card.Header>
                    <Card.Body>
                        <img src={`${plant.image}`} />
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
            )
        }    
    })
                
	return (
        <>  
            <div style={ cardContainerStyle }>             
                { myPlants }
            </div>

        </>
        
	);
};

export default MyPlantsIndex;