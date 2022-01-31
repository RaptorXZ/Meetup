import {useState, useEffect} from 'react'
import './interests.css'

interface Props {
	userInterests: string[]
	setUserInterests: (userInterests: string[]) => void
}

function Interests({userInterests, setUserInterests} : Props) {
	const interests: string[] = ['Art', 'Food', 'Sports', 'Coding', 'Theatre', 'Movies', 'Gaming', 'Literature', 'Singing', 'Photography', 'Online', 'OnLocation', 'Tech', 'Music']
	// const [userInterests, setUserInterests] = useState<string[]>([])
	const [userInterestStorage, setUserInterestsStorage] = useState(JSON.parse(localStorage.getItem('interestArray') || '[]'))

	console.log('userInterests', userInterests)

	useEffect( () => {

		if(userInterests.length > 0) {
			console.log('userInterests global', userInterests)
			localStorage.setItem('interestArray', JSON.stringify(userInterests))
		} else if (userInterests.length === 0 ){
			localStorage.setItem('interestArray', JSON.stringify([]))
		}
	}, [userInterests])

	useEffect( () => {
		setUserInterests(userInterestStorage)
	}, [])


	function handleClick(index: number, userInterest: string) {
		saveInterest(userInterest)
	}

	function saveInterest(userInterest: string) {
		if(!userInterests.includes(userInterest)) {
			setUserInterests([...userInterests, userInterest])
		} else {
			const interestIndex = userInterests.indexOf(userInterest)
			let interestsList = [...userInterests]
			interestsList.splice(interestIndex, 1)
			setUserInterests(interestsList) 
		}
	}

	return (
		<div className='allButtons'>
			<ul className='interestButton-list'>
				{interests.map( (interest, index) => (
					<li key={index}>
						<button onClick={() => handleClick(index, interest)} key={interest} data-testid='interest-button' 
						className={userInterests.includes(interest) ? 'interestButton chosen' : 'interestButton unChosen' }>{interest}</button> 
					</li>
				))}
			</ul>
		</div>
	)
}

export default Interests

