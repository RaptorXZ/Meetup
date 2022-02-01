import {render, screen, within} from '@testing-library/react'
import userEvent from "@testing-library/user-event"
import { useState } from 'react'
import CreateEvent from './CreateEvent'
import EventList from '../EventList'
import { Events } from '../../models/Events'

const Wrapper = () => {
	const [userInterests, setUserInterests] = useState<string[]>([])
	return <EventList userInterests={userInterests} />
} 

describe('create event component', () => {

    const details: Events = { 
        id: 'bmhkjjkda',
        image: 'image',
        eventName: 'Painting Meetup',
        interests: ['Art', 'Theatre', 'OnLocation'],
        description: 'Are you intrested in art and love painting? Then this is the event for you!',
        location: 'Gothenburg, Änggårdsgatan 46',
        date: '24/1/2022',
        time: '16:30',
        hostName: 'julie_arts', 
		matches: 0
    }

    let mockAddEvent: jest.Mock; //(newEvent: Events) => void;

    it('initially input fields are empty and has no css classes', () => {
        render(<CreateEvent events={[details]} addEvent={mockAddEvent} />)

        const createButton = screen.getByRole('button', {name: 'New Meetup'})
        userEvent.click(createButton)
        
        const [input] = screen.getAllByPlaceholderText('Type here...')
        expect(input).toHaveValue('')
        expect(input).not.toHaveClass('invalidName')
    })

    it('shows a form to create a new event after user clicks button "New Meetup"', () => {
        render(<CreateEvent events={[details]} addEvent={mockAddEvent}/>)

        const createButton = screen.getByRole('button', {name: 'New Meetup'})
        userEvent.click(createButton)
        
        const form = screen.getByText('create your new event!')
        expect(form).toBeInTheDocument()
    })

    it('hides form after user clicks again on button "New Meetup"', () => {
        render(<CreateEvent events={[details]} addEvent={mockAddEvent}/>)

        const createButton = screen.getByRole('button', {name: 'New Meetup'})
        userEvent.click(createButton)
        userEvent.click(createButton)
        
        const form = screen.queryByText('create your new event!')
        expect(form).not.toBeInTheDocument()
    })

    it('gives an input fields css class invalid if left empty when trying to submit event', () => {
        render(<Wrapper/>)

        const createButton = screen.getByRole('button', {name: 'New Meetup'})
        userEvent.click(createButton)

        const saveButton = screen.getByRole('button', {name: 'save meetup'})
        const input = screen.getAllByPlaceholderText('Type here...')

        userEvent.type(input[0] as HTMLElement, '')
        userEvent.click(saveButton)
        
        expect(input[0]).toHaveClass('invalidName')
    })

   
    it('becomes visible in the list after user clicks button "save meetup" and input fields are not invalid', () => {
        render(<Wrapper/>)
        
        const createButton = screen.getByRole('button', {name: 'New Meetup'})
        userEvent.click(createButton)
        
        const saveButton = screen.getByRole('button', {name: 'save meetup'})
        const input = screen.getAllByPlaceholderText('Type here...')

        userEvent.type(input[0] as HTMLElement, 'example')
        userEvent.type(input[1] as HTMLElement, 'example')
        userEvent.click(saveButton)

        expect(input[0]).not.toHaveClass('invalidName')
        expect(input[1]).not.toHaveClass('invalidDesc')

        const saved = screen.getByText('example')
        expect(saved).toBeInTheDocument()
    })


    it('clears input fields and checkboxes after user clicks "save meetup"', () => {
        render(<Wrapper/>)
        
        const createButton = screen.getByRole('button', {name: 'New Meetup'})
        userEvent.click(createButton)
        
        const saveButton = screen.getByRole('button', {name: 'save meetup'})
        const input = screen.getAllByPlaceholderText('Type here...')
        const checkboxes = screen.getAllByPlaceholderText('checkboxes')
        const imageRadio = screen.getAllByPlaceholderText('photo')

        userEvent.click(saveButton)
        
        input.forEach( input => 
			expect(input).toHaveValue('')
		)
        checkboxes.forEach( checkboxes => 
			expect(checkboxes).not.toBeChecked()
		)
        imageRadio.forEach( imageRadio => 
			expect(imageRadio).not.toBeChecked()
		)
    })
})
