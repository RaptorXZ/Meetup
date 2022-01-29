import {render, screen, within} from '@testing-library/react'
import userEvent from "@testing-library/user-event"
import CreateEvent from './CreateEvent'
import EventList from '../EventList'
import { Events } from '../../models/Events'

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
        hostName: 'julie_arts'
    }

    let mockAddEvent: jest.Mock; //(newEvent: Events) => void;

    it('renders without crashing', () => {
        render(<CreateEvent events={[details]} addEvent={mockAddEvent} />)
    })

    it('shows a form to create a new event after user clicks button "create meetup"', () => {
        render(<CreateEvent events={[details]} addEvent={mockAddEvent}/>)

        const createButton = screen.getByRole('button', {name: 'create meetup'})
        userEvent.click(createButton)
        
        const form = screen.getByText('create your new event!')
        expect(form).toBeInTheDocument()
    })

    it('saves the new meetup event after user clicks button "save meetup"', () => {
        render(<CreateEvent events={[details]} addEvent={mockAddEvent}/>)
        render(<EventList/>)

        const createButton = screen.getByRole('button', {name: 'create meetup'})
        userEvent.click(createButton)

        const saveButton = screen.getByRole('button', {name: 'save meetup'})
        const input = screen.getByPlaceholderText('give your meetup a name...')
        userEvent.type(input as HTMLElement, 'example name')
        userEvent.click(saveButton)

        const savedMeetup = screen.getByText('example name')
        expect(savedMeetup).toBeInTheDocument()
    })
})