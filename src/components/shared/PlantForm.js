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
                    placeholder="What is your plant's name?"
                    name="name"
                    id="name"
                    value={ plant.name }
                    onChange={ handleChange }
                />
                <Form.Label htmlFor="type">Type</Form.Label>
                <Form.Control
                    placeholder="What kind of plant is this?"
                    name="type"
                    id="type"
                    value={ plant.type }
                    onChange={ handleChange }
                />
                <Form.Label htmlFor="age">Age</Form.Label>
                <Form.Control
                    placeholder="How old is your plant?"
                    type="number"
                    name="age"
                    id="age"
                    value={ plant.age }
                    onChange={ handleChange }
                />
                <Form.Check
                    label="Is this plant adoptable?"
                    name="adoptable"
                    defaultChecked={ plant.adoptable  }
                    onChange={ handleChange }
                />
                <Button type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default PlantForm
© 2022 GitHub, Inc.
