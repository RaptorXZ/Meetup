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
        // render(<EventList/>)

        const createButton = screen.getByRole('button', {name: 'create meetup'})
        userEvent.click(createButton)
        
        const form = screen.getByText('create your new event!')
        expect(form).toBeInTheDocument()
    })

    it('is not possible to save meetup if input fields are left empty and no checkboxes have been checked', () => {
        render(<EventList/>)

        const createButton = screen.getByRole('button', {name: 'create meetup'})
        userEvent.click(createButton)

        const saveButton = screen.getByRole('button', {name: 'save meetup'})
        const [input] = screen.getAllByPlaceholderText('Type here...')

        userEvent.type(input as HTMLElement, '')
        userEvent.click(saveButton)
        // userEvent.click(saveButton)

        expect(input).toHaveClass('invalidName')

        const [events] = screen.getAllByRole('listitem')
        
        const savedMeetup = within(events).getAllByText('')
        expect(savedMeetup).not.toBe('')
    })

    it('saves the new meetup and it becomes visible in the list after user clicks button "save meetup"', () => {
        render(<EventList/>)

        const createButton = screen.getByRole('button', {name: 'create meetup'})
        userEvent.click(createButton)

        const saveButton = screen.getByRole('button', {name: 'save meetup'})
        
        const [input] = screen.getAllByPlaceholderText('Type here...')
        userEvent.type(input as HTMLElement, 'example')
        userEvent.click(saveButton)

        const events = screen.getAllByRole('listitem')
        expect(events.length).toBeGreaterThan(5)

        // const [events] = screen.getAllByRole('listitem')

        // const savedMeetup = within(events).getByText('example')
        // expect(savedMeetup).toBeInTheDocument()
    })


    // it('closes the form and clears input fields and checkboxes after user clicks "save meetup"', () => {
    //     render(<EventList/>)

    //     const createButton = screen.getByRole('button', {name: 'create meetup'})
    //     userEvent.click(createButton)

    //     const saveButton = screen.getByRole('button', {name: 'save meetup'})
    //     const [input] = screen.getAllByPlaceholderText('Type here...')
    //     userEvent.type(input as HTMLElement, 'example name')
    //     userEvent.click(saveButton)

    //     const events = screen.getAllByRole('listitem')
    //     expect(events.length).toBeGreaterThan(4)

    //     // const savedMeetup = within(events).getByRole('listitem')
    //     // expect(savedMeetup).toBeInTheDocument()

    //     // userEvent.click(createButton)
    //     userEvent.click(saveButton)
    //     expect(input).toHaveValue('')

    //     // const form = screen.getByText('create your new event!')
    //     // expect(form).not.toBeInTheDocument()

    // })

})