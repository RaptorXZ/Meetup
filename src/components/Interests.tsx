import {useState} from 'react'
import './interests.css'


function Interests() {
	const [toggleButton, setToggleButton] = useState(-1) 
	const interests: string[] = ['Art', 'Food', 'Sports', 'Coding', 'Theatre', 'Movies', 'Gaming', 'Literature', 'Singing', 'Photography', 'Online', 'OnLocation', 'Tech']

	//sätt className för en specifik knapp (nu väljs alla knappar smatidigt vid onClick)
	//get index of button find the one that matches in  a loop
	//event.target
	

	function handleClick(index: any) {
		console.log('index: ', index)
		setToggleButton(index) 
	}

	return (
		<div>
			<ul>
				{interests.map( (interest, index) => (
					<li key={index}>
						<button onClick={() => handleClick(index)} key={interest} data-testid='interest-button' 
						className={index === toggleButton ? 'interestButton chosen' : 'interestButton unChosen' }>{interest}</button> 
					</li>
				))}
			</ul>
		</div>
	)
}

export default Interests

