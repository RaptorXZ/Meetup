import{ render, screen } from '@testing-library/react'
import userEvent  from '@testing-library/user-event'
import Interests from './Interests'

describe('Interests component', () => {

	// it('renders without crashing', () => {
	// 	render( <Interests/> ) 
	// })

	// it('renders the list of interests', () => {
	// 	render( <Interests/> ) 

	// 	const list = screen.getByRole('list')

	// 	expect(list).toBeInTheDocument()
	// })
	
	// it('shows the button with the text "Tech"', () => {
	// 	render( <Interests/> ) 

	// 	const button = screen.getByRole('button', {name: 'Tech'})

	// 	expect(button).toBeInTheDocument()
	// })

	// it('tests that all buttons are unChosen before they are clicked', () => {
	// 	render( <Interests/> )

	// 	const buttons = screen.getAllByTestId('interest-button')

	// 	buttons.forEach( button => 
	// 		expect(button).toHaveClass('interestButton unChosen')
	// 	)
	// })

	// it('chooses a specific button when the user clicked on it', () => {
	// 	render( <Interests/> )

	// 	const artButton = screen.getByRole('button', {name: 'Art'})	

	// 	userEvent.click(artButton)

	// 	expect(artButton).toHaveClass('interestButton chosen')		
	// })

	// it('does not save Tech as an interest when the user clicks the Art-button', () => {
	// 	render( <Interests/> )

	// 	const artButton = screen.getByRole('button', {name: 'Art'})
	// 	const techButton = screen.getByRole('button', {name: 'Tech'})		

	// 	userEvent.click(artButton)

	// 	expect(techButton).toHaveClass('interestButton unChosen')
	// })

	// it('saves the user interest when the press a specific button', () => {
	// 	render( <Interests/> )

	// 	const musicButton = screen.getByRole('button', {name: 'Music'})
	// 	const codingButton = screen.getByRole('button', {name: 'Coding'})

	// 	userEvent.click(musicButton)
	// 	userEvent.click(codingButton)

	// 	expect(musicButton).toHaveClass('interestButton chosen')
	// 	expect(codingButton).toHaveClass('interestButton chosen')
	// })

	// it('removes an interest when the user clicks on it for the second time', () => {
	// 	render( <Interests/> )

	// 	const onLocationButton = screen.getByRole('button', {name: 'OnLocation'})

	// 	userEvent.click(onLocationButton)
	// 	userEvent.click(onLocationButton)

	// 	expect(onLocationButton).toHaveClass('interestButton unChosen')
	// })
})

// Testa att event med ett specifikt intresse renderas först i listan med event om användaren har valt intresset

