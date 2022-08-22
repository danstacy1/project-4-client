import { 
    Form,
    Button,
    Container 
} from 'react-bootstrap'

const PlantForm = (props) => {
    const { plant, handleChange, heading, handleSubmit } = props

    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Label htmlFor="name">Name</Form.Label>
                <Form.Control
                    placeholder="Type of plant"
                    name="name"
                    id="name"
                    value={ plant.name }
                    onChange={ handleChange }
                />
                <Form.Label htmlFor="description">Description</Form.Label>
                <Form.Control
                    placeholder="Description of the plant"
                    name="description"
                    id="description"
                    value={ plant.description }
                    onChange={ handleChange }
                />
                <Form.Label htmlFor="light">Light</Form.Label>
                <Form.Control
                    placeholder="Light requirement"
                    type="text"
                    name="light"
                    id="light"
                    value={ plant.light }
                    onChange={ handleChange }
                />
                <Form.Label htmlFor="water">Water</Form.Label>
                <Form.Control
                    placeholder="Water requirement"
                    type="text"
                    name="water"
                    id="water"
                    value={ plant.water }
                    onChange={ handleChange }
                />
                <Form.Label htmlFor="temperature">Temperature</Form.Label>
                <Form.Control
                    placeholder="Temperature requirement"
                    type="text"
                    name="temperature"
                    id="temperature"
                    value={ plant.temperature }
                    onChange={ handleChange }
                />
                <Form.Label htmlFor="poisonous">Poisonous</Form.Label>
                <Form.Control
                    placeholder="Is the plant poisonous?"
                    type="text"
                    name="poisonous"
                    id="poisonous"
                    value={ plant.poisonous }
                    onChange={ handleChange }
                />
                <Form.Label htmlFor="image">Image</Form.Label>
                <Form.Control
                    placeholder="Image URL"
                    type="text"
                    name="image"
                    id="image"
                    value={ plant.image }
                    onChange={ handleChange }
                />
                <Button type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default PlantForm
