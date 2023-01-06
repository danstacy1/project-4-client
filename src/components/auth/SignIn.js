import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { signIn } from '../../api/auth'
import messages from '../shared/AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const signInStyle = {
    color: "white",
    textAlign: 'center'
}
const cardContainerStyle = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center',
    // backgroundImage: "url('https://wallpaperaccess.com/full/4048337.jpg')",
    backgroundImage: "url('https://gardenerspath.com/wp-content/uploads/2022/02/Best-Low-Light-Houseplants-FB.jpg)",
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    width: '100vw',
    height: '100vh',
    backgroundAttachment: 'fixed',
    overflowY: 'scroll'
    }

const SignIn = (props) => {
	// constructor(props) {
	// 	super(props)

	// 	this.state = {
	// 		email: '',
	// 		password: '',
	// 	}
	// }
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

	// handleChange = (event) =>
	// 	this.setState({
	// 		[event.target.name]: event.target.value,
	// 	})

	const onSignIn = (event) => {
		event.preventDefault()
        console.log('the props', props)
		const { msgAlert, setUser } = props

        const credentials = {email, password}

		signIn(credentials)
			.then((res) => setUser(res.data.user))
			.then(() =>
				msgAlert({
					heading: 'Sign In Success',
					message: messages.signInSuccess,
					variant: 'success',
				})
			)
			.then(() => navigate('/greenhome/myplants'))
			.catch((error) => {
                setEmail('')
                setPassword('')
				msgAlert({
					heading: 'Sign In Failed with error: ' + error.message,
					message: messages.signInFailure,
					variant: 'danger',
				})
			})
	}

    return (
        <div style={ cardContainerStyle }>

        <div className='row'id='sign-in'>
            <div className='col-sm-10 col-md-12 mx-auto mt-5' >
                <center><h3 style={{color: 'white'}}>Sign In</h3></center>
                <Form onSubmit={onSignIn} style={signInStyle}>
                    <Form.Group controlId='email'>
                        <Form.Control
                            required
                            type='email'
                            name='email'
                            value={email}
                            placeholder='Enter email'
                            onChange={e => setEmail(e.target.value)}
                            className="mt-3"
                            style={{textAlign: 'center'}}
                        />
                    </Form.Group>
                    <Form.Group controlId='password'>
                        <Form.Control
                            required
                            name='password'
                            value={password}
                            type='password'
                            placeholder='Password'
                            onChange={e => setPassword(e.target.value)}
                            className="mt-3"
                            style={{textAlign: 'center'}}
                        />
                    </Form.Group>
                    <Button variant="info" type='submit'className="mt-3" size="sm">
                        Submit
                    </Button>
                </Form>
            <center style={{color: 'white'}}>Don't have an account? <Link onClick={navigate('/sign-up')}>sign-up</Link></center>
            </div>
        </div>
        </div>
    )
}

export default SignIn
