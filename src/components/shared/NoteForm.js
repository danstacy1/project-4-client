import React, { useState } from 'react'
import { Form, Container, Button } from 'react-bootstrap'

const NoteForm = (props) => {
    const {note, handleChange, handleSubmit, heading} = props

    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Label htmlFor="name">Notes</Form.Label>
                <Form.Control
                    placeholder="Enter Note"
                    name="note"
                    id="note"
                    // value={ note.note }
                    onChange={ handleChange }
                />
                <Button type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default NoteForm