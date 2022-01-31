import{ render, screen } from '@testing-library/react'
import { useState } from 'react'
import userEvent  from '@testing-library/user-event'
import Interests from './Interests'

const Wrapper = () => {
	const [userInterests, setUserInterests] = useState<string[]>([])
	return <Interests userInterests={userInterests} setUserInterests={setUserInterests} />
}

describe('Interests component', () => {

	it('renders without crashing', () => {
		render(<Wrapper/>)
		 
	})

	it('renders the list of interests', () => {

		render(<Wrapper/>)

			const list = screen.getByRole('list')

			expect(list).toBeInTheDocument()

	})
	
	it('shows the button with the text "Tech"', () => {
		render( <Wrapper/> ) 

		const button = screen.getByRole('button', {name: 'Tech'})

		expect(button).toBeInTheDocument()
	})

	it('tests that all buttons are unChosen before they are clicked', () => {
		render( <Wrapper/> )

		const buttons = screen.getAllByTestId('interest-button')

		buttons.forEach( button => 
			expect(button).toHaveClass('interestButton unChosen')
		)
	})

	it('chooses a specific button when the user clicked on it', () => {
		render( <Wrapper/> )

		const artButton = screen.getByRole('button', {name: 'Art'})	

		userEvent.click(artButton)

		expect(artButton).toHaveClass('interestButton chosen')		
	})

	it('does not save Tech as an interest when the user clicks the Art-button', () => {
		render( <Wrapper/> )

		const artButton = screen.getByRole('button', {name: 'Art'})
		const techButton = screen.getByRole('button', {name: 'Tech'})		

		userEvent.click(artButton)

		expect(techButton).toHaveClass('interestButton unChosen')
	})

	it('saves the user interest when the press a specific button', () => {
		render( <Wrapper/> )

		const musicButton = screen.getByRole('button', {name: 'Music'})
		const codingButton = screen.getByRole('button', {name: 'Coding'})

		userEvent.click(musicButton)
		userEvent.click(codingButton)

		expect(musicButton).toHaveClass('interestButton chosen')
		expect(codingButton).toHaveClass('interestButton chosen')
	})

	it('removes an interest when the user clicks on it for the second time', () => {
		render( <Wrapper/> )

		const onLocationButton = screen.getByRole('button', {name: 'OnLocation'})

		userEvent.click(onLocationButton)
		userEvent.click(onLocationButton)

		expect(onLocationButton).toHaveClass('interestButton unChosen')
	})
})


