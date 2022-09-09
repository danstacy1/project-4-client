import "../App.css"
import {useState} from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'

function SearchBar({seededPlants, handleSubmit, user}) {
    const [searchTerm, setSearchTerm] = useState('')
    return (
    <div className="App">
        <input 
            type="text" 
            placeholder="search..." 
            onChange={event => 
                {setSearchTerm(event.target.value)}}/>
        {seededPlants.filter((plant) => {
            // {console.log("seeded plant s---------", seededPlants)}
            // console.log("plant names +++++++++", plant.name)
            // console.log("plantCards name xxxxxxxxxx", plantCards.name)
            if (searchTerm === "") {
                return plant
            } else if (plant.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                return plant
            }
            })
            .map((searchedPlants, key) => {
                const plantCopy = {
                    ...searchedPlants, 
                }
                delete plantCopy._id
                delete plantCopy.isSeeded
            return (
                <div className="user" key={key}> 
                <Card style={{backgroundColor: 'rgba(218, 247, 166, 0.6)', width: '800px', height: '300px',  margin: 17, overflowY: 'scroll'}} key={ searchedPlants._id }class="cards" >
            <Card.Body>
                <Card.Text style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Link to={`/greenhome/${searchedPlants._id}`}>
                    <img  src={`${searchedPlants.image}`} style={{display: 'inline-block', padding: "15px"}} width="130px" height="auto"/>
                    </Link>
                    <div>
                    <Link to={`/greenhome/${searchedPlants._id}`}> <h3 style={{color:'black'}}>{ searchedPlants.name }</h3></Link>

                    <Form onSubmit={e => handleSubmit(e, plantCopy)}>     
                {
                    user
                    ?
                    <>
                    <Button type="submit">Add To My Garden</Button>
                    </>
                    :
                    null
                }
                    </Form>
                    <p> <br></br>{`${searchedPlants.description}`}</p>
                    </div>
                </Card.Text>
            </Card.Body>
        </Card>
                </div>
            )
        })}
    </div>
    );
}
export default SearchBar