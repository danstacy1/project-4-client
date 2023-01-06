import { Link } from 'react-router-dom'
import PlantsIndex from './plants/PlantsIndex'

const Home = (props) => {
	// const { msgAlert, user } = props
	console.log('props in home', props)

	const homeListStyle =
		{
			textAlign: 'center',
			listStylePosition: 'inside',
			listStyleType: 'none',
			fontWeight: 'bold',
		}

	const backgroundImg = {
		backgroundImage: "url('https://wallpaperaccess.com/full/4048337.jpg')",
		backgroundPosition: 'center',
		backgroundSize: 'cover',
		width: '100vw',
		height: '100vh',
		backgroundAttachment: 'fixed',
		backgroundColor: 'rgba(0, 0, 0, 1);'
		
	}

	const { msgAlert } = props
	
	return (
		// <h1>hello world!</h1>
	<div style={backgroundImg}>
				<div>
				<center>
			<h1><u>Welcome To Green Home</u></h1>

			<h3>Helping you care for your house plants</h3><br></br>

			<h4>Learn more from our <Link to="/greenhome">popular plants</Link> or <Link to='/sign-up'>sign up</Link> to create and keep track of your own garden.</h4><br></br>

					<h5>If you're still on the fence about getting house plants, here are some benefits.</h5>
						<ul style={homeListStyle}>
						<li>Improve air quality</li>
						<li>Reduce stress</li>
						<li>Improve your sense of well-being</li>
						<li>Support cognitive health</li>
						<li>Improve environmental wellness</li>
						<li><a href= "https://www.piedmont.org/living-better/health-benefits-of-indoor-plants" target="_blank">For more information</a></li>
				
					</ul>
				</center>
					</div>
		</div> 
			
	)
}

export default Home