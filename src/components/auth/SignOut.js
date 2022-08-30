import { useNavigate } from 'react-router-dom'

import {Button, ButtonGroup} from 'react-bootstrap'

import { signOut } from '../../api/auth'
import messages from '../shared/AutoDismissAlert/messages'

const SignOut = (props) => {
	const { msgAlert, clearUser, user } = props
    console.log(props)

    const navigate = useNavigate()

    const onSignOut = () => {
		signOut(user)
			.finally(() =>
				msgAlert({
					heading: 'Signed Out Successfully',
					message: messages.signOutSuccess,
					variant: 'success',
				})
			)
			.finally(() => navigate('/'))
			.finally(() => clearUser())
    }

    const cardContainerStyle = {
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'center',
        backgroundImage: "url('https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gettyimages-1138552930.jpg')",
        opacity: "",
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        width: '100vw',
        height: '100vh',
        backgroundAttachment: 'fixed',
        overflowY: 'scroll',
        }



    const onCancel = () => {
        navigate('/')
    }

	return (
		<>
        <div style={ cardContainerStyle }>
            <div className='row'>
                <div className='col-sm-10 col-md-8 mx-auto mt-5' style={{position: 'relative', top: '30px'}}>
                    <h2 style={{color: 'yellow'}}><b>Are you sure you want to sign out?</b></h2>
                    <h5 style={{color: 'yellow'}}><b>We hate to see you go...</b></h5><br/>
                    <ButtonGroup>
                        <Button variant='danger' onClick={onSignOut}>
                            Sign Out
                        </Button>
                        <Button variant='warning' onClick={onCancel}>
                            Cancel
                        </Button>
                    </ButtonGroup>
                </div>
            </div>
        </div>
		</>
	)
}

export default SignOut