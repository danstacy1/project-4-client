import React, { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import EditNoteModal from './EditNoteModal'
import { deleteNote } from '../../api/notes'

const ShowNote = (props) => {
    // destructure some props
    const { note, plant, user, msgAlert, triggerRefresh } = props

    // here's where we'll put a hook to open the edit note modal when we get there
    const [editModalShow, setEditModalShow] = useState(false)


    // calls this to destroy a toy
    const destroyNote = () => {
        delete(user, plant._id, note._id)
            .then(() => 
                msgAlert({
                    heading: 'Note Deleted',
                    message: 'Bye bye Note!',
                    variant: 'success'
                }))
            .then(() => triggerRefresh())
            .catch(() => 
                msgAlert({
                    heading: 'Oh no!',
                    message: 'Something went wrong!',
                    variant: 'danger'
                }))
    }

    return (
        <>
            <Card>
                <Card.Header>{note.note}</Card.Header>
                {/* <Card.Body>
                    <small>{toy.description}</small><br/>
                    <small>
                        {toy.isSqueaky ? 'squeak squeak' : 'stoic silence'}
                    </small>
                </Card.Body> */}
                <Card.Footer>
                    {/* <small>Condition: {toy.condition}</small><br/>
                    {
                        user && user._id === pet.owner._id
                        ? */}
                        <>
                            <Button 
                                variant="warning"
                                onClick={() => setEditModalShow(true)}
                            >
                                Edit Note
                            </Button>
                            <Button 
                                onClick={() => destroyNote()} 
                                variant="danger"
                            >
                                Delete Note
                            </Button>
                        </>
                        :
                        null
                    {/* } */}
                </Card.Footer>
            </Card>
            <EditNoteModal
                user={user}
                plant={plant}
                note={note}
                show={editModalShow}
                handleClose={() => setEditModalShow(false)}
                msgAlert={msgAlert}
                triggerRefresh={triggerRefresh}
            />
        </>
    )
}

export default ShowNote