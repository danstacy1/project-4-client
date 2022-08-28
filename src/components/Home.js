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

		
	
	const { msgAlert } = props
	
	return (
		<div style={{ backgroundImage: "url('https://slack-imgs.com/?c=1&o1=ro&url=https%3A%2F%2Fwww.pennington.com%2F%2F-%2Fmedia%2FProject%2FOneWeb%2FPennington%2FImages%2Fblog%2Ffertilizer%2F8-Steps-to-Growing-a-Healthy-Indoor-Garden-Anytime%2Fhow-to-grow-a-healthy-indoor-garden-h.jpg')"}}>
		<center>
			<h2><u>Welcome To Green Home</u></h2>

			<h3>Helping you care for your house plants since today</h3><br></br>

			<h4>Browse through our popular plants, or sign up to create your own garden.</h4><br></br>

			<p>If you're still on the fence about getting house plants here are some benefits to having them.</p><br></br>
			<ul style={homeListStyle}>
				<li>Improve air quality</li>
				<li>Reduce stress</li>
				<li>Improve your sense of well-being</li>
				<li>Support cognitive health</li>
				<li>Improve environmental wellness</li>
				<li>For more information on these benefits <a href= "https://www.piedmont.org/living-better/health-benefits-of-indoor-plants" target="_blank">click here</a></li>
				
			</ul>

		</center>
		</div>
			
	)
}

export default Home