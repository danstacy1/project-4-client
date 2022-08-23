import { useEffect } from 'react';
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import AddMyPlant from '../my_plants/AddMyPlant'
import RemoveMyPlant from '../my_plants/RemoveMyPlant'

const MyPlantsIndex = (props) => {
    const { my_plants } = props
    const { user } = props

    const cardContainerStyle = {
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'center'
    }

    const { showModal, setShowModal } = props

    const addRemoveMyPlant = (plant) => {
        // console.log('plant',  plant)
            for (let i = 0; i<my_plants.length; i++) {
                // console.log('list id', favorites[i]._id)
                // console.log('book id', book._id)
                // console.log('user id', user._id)
                // console.log('book user id', favorites[i].userId)
                if(my_plants[i]._id === plant._id && user._id === my_plants[i].userId) {
                    return true
                }
            }
            return false
    }

    const myPlants = my_plants.map(plant => {
        if (plant.userId === user._id) {
            return (
                <Card style={{ width: '30%', margin: 5}} key={ plant._id }>
                    <Card.Header>
                        <Link to={`/greenhome/myplants/${plant._id}`}>View { plant.name }</Link>
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