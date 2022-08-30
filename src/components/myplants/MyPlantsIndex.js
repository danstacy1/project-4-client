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
justifyContent: 'center',
backgroundImage: "url('https://slack-imgs.com/?c=1&o1=ro&url=https%3A%2F%2Fimg.freepik.com%2Ffree-photo%2Fside-border-made-with-fresh-green-leaves-white-background_23-2147893798.jpg%3Fw%3D2000')",
backgroundPosition: 'center',
backgroundSize: 'cover',
width: '100vw',
height: '100vh',
backgroundAttachment: 'fixed',
overflowY: 'scroll'
}

const cards = {
    
}

const MyPlantsIndex = (props) => {
const [plants, setPlants] = useState(null)
const [error, setError] = useState(false)

const { user, msgAlert, plant } = props

// console.log('Props in PlantsIndex', props)
// console.log('MPIndex', plants)

useEffect(() => {
    // console.log(props)
    getAllMyPlants(user)
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
    // console.log('++++++', Plants)
    if (error) {
        return <p>Error!</p>
    }

    // If plants haven't been loaded yet, show a loading message
    if (!plants) {
        return <LoadingScreen />
    } else if (plants.length === 0) {
        return <p>No plants yet. Better add some.</p>
    }
    
    // <>
    let myPlantCards
    console.log('user._id in MPIndex', user._id)
    console.log('++++++', plants)
    if (plants) {
        myPlantCards = plants.map(plant => (
        // console.log('user in MPIndex', user)
        <Card style={{ width: '20%', height:'32%', minHeight: '300px', margin: 10, backgroundColor: 'rgba(218, 247, 166, 0.6)'}} key={ plant._id }>
                {/* console.log('user._id in MPIndex', myPlant.owner._id) */}
                <Card.Header><Link to={`/greenhome/myplants/${plant._id}`}> { plant.name }</Link></Card.Header>
                <Card.Body>
                    <Card.Text>
                        <div>
                        <Link to={`/greenhome/myplants/${plant._id}`}> <img class= 'img-fluid' style={{textAlign: 'center'}} src={`${plant.image}`} maxWidth="100%" maxHeight="auto"  /></Link>
                        </div>
                    </Card.Text>
                </Card.Body>
            </Card>
        ))
    }
        // </>
        
        console.log("====================", user, plants)
    return (
        <div style={ cardContainerStyle }>
            {/* {
            (user && plants)
            ? */}
            { myPlantCards }
            {/* :
            null
            } */}
        </div>
    )
}

export default MyPlantsIndex



///////////////////////////////////////////////////////////////////////

// import { useState,useEffect } from 'react'
// import Card from 'react-bootstrap/Card'
// import { Link } from 'react-router-dom'

// import LoadingScreen from '../shared/LoadingScreen'
// import { getAllMyPlants } from '../../api/myplants'
// import messages from '../shared/AutoDismissAlert/messages'


// // MyPlantsIndex should make a request to the api
// // To get all plants
// // Then display them when it gets them

// // style for our card container
// const cardContainerStyle = {
// display: 'flex',
// flexFlow: 'row wrap',
// flexDirection: 'column row',
// justifyContent: 'center',
// backgroundImage: "url('https://slack-imgs.com/?c=1&o1=ro&url=https%3A%2F%2Fimg.freepik.com%2Ffree-photo%2Fside-border-made-with-fresh-green-leaves-white-background_23-2147893798.jpg%3Fw%3D2000')",
// backgroundPosition: 'center',
// backgroundSize: 'cover',
// width: '100vw',
// height: '100vh',
// backgroundAttachment: 'fixed',
// overflowY: 'scroll',
// textAlign: 'center'
// }

// const cards = {
    
// }

// const MyPlantsIndex = (props) => {
// const [plants, setPlants] = useState(null)
// const [error, setError] = useState(false)

// const { user, msgAlert, plant } = props

// // console.log('Props in PlantsIndex', props)
// // console.log('MPIndex', plants)

// useEffect(() => {
//     // console.log(props)
//     getAllMyPlants(user)
//         .then(res => setPlants(res.data.plants))
//         .catch(err => {
//             msgAlert({
//                 heading: 'Error Getting Plants',
//                 message: messages.getPlantsFailure,
//                 variant: 'danger',
//             })
//             setError(true)
//         })    
//     }, [])
//     // console.log('++++++', Plants)
//     if (error) {
//         return <p>Error!</p>
//     }

//     // If plants haven't been loaded yet, show a loading message
//     if (!plants) {
//         return <LoadingScreen />
//     } else if (plants.length === 0) {
//         return <p>No plants yet. Better add some.</p>
//     }
    
//     // <>
//     let myPlantCards
//     console.log('user._id in MPIndex', user._id)
//     console.log('++++++', plants)
//     if (plants) {
//         myPlantCards = plants.map(plant => (
//         // console.log('user in MPIndex', user)
//         <Card style={{ width: '20%', height: '40%', maxHeight:'300px', margin: 10, backgroundColor: 'rgba(218, 247, 166, 0.6)'}} key={ plant._id}>
//                 {/* console.log('user._id in MPIndex', myPlant.owner._id) */}
//                 <Card.Header><Link to={`/greenhome/myplants/${plant._id}`}> { plant.name }</Link></Card.Header>
//                 <Card.Body>
//                     <Card.Text>
//                         <Link to={`/greenhome/myplants/${plant._id}`}> <img class= 'img-fluid' style={{textAlign: 'center', width: '100%'}} src={`${plant.image}`} /></Link>
//                     </Card.Text>
//                 </Card.Body>
//             </Card>
//         ))
//     }
//         // </>
        
//         // console.log("====================", user, plants)
//     return (
//         <div style={ cardContainerStyle }>
//             { myPlantCards }
//         </div>
//     )
// }

// export default MyPlantsIndex