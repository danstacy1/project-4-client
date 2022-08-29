import "../App.css"
import {useState} from 'react'


function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('')
    return (
    <div className="App">
        <input 
            type="text" 
            placeholder="search..." 
            onChange={event => 
                {setSearchTerm(event.target.value)}}/>
        {plants.filter((plant) => {
            if (searchTerm === "") {
                return plant
            } else if (plant.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                return plant
            }
            })
            .map((plant, key) => {
            return (
                <div className="user" key={key}> 
                {plant.name}
                </div>
            )
        })}
    </div>
    );
}

export default SearchBar;