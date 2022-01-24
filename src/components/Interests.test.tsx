import{ render, screen } from '@testing-library/react'
import userEvent  from '@testing-library/user-event'
import Interests from './Interests'

describe('Interests component', () => {

	it('renders without crashing', () => {
		render( <Interests/> ) 
	})

	it('renders the list of interests', () => {
		render( <Interests/> ) 

		const list = screen.getByRole('list')

		expect(list).toBeInTheDocument()
	})
	
	it('shows the button with the text "Tech"', () => {
		render( <Interests/> ) 

		const button = screen.getByRole('button', {name: 'Tech'})

		expect(button).toBeInTheDocument()
	})

	it('tests that all buttons are unChosen before they are clicked', () => {
		render( <Interests/> )

		const buttons = screen.getAllByTestId('interest-button')

		buttons.forEach( button => 
			expect(button).toHaveClass('interestButton unChosen')
		)
	})

	it('tests that a specific button is chosen after being clicked', () => {
		render( <Interests/> )

		const artButton = screen.getByRole('button', {name: 'Art'})	

		userEvent.click(artButton)

		expect(artButton).toHaveClass('interestButton chosen')		
	})

	it('tests that the Tech-button stays unchosen when you click the Art-button', () => {
		render( <Interests/> )

		const artButton = screen.getByRole('button', {name: 'Art'})
		const techButton = screen.getByRole('button', {name: 'Tech'})		

		userEvent.click(artButton)

		expect(techButton).toHaveClass('interestButton unChosen')
	})
})

// Testa att ett intresse blir tillagt om knappen klickas på en gång
// Testa att ett intresse blir borttaget om knappen klickas på två gånger
// Testa att event med ett specifikt intresse renderas först i listan med event om användaren har valt intresset
// Lägg till en uppgift
