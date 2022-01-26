import {render, screen, within} from '@testing-library/react'
import userEvent from "@testing-library/user-event"
import EventDetails from './EventDetails'
import EventList from './EventList'
import { Events } from '../models/Events'

describe('EventPage component', () => {

    const details: Events = { 
        id: 'bmhkjjkda',
        image: 'image',
        eventName: 'Painting Meetup',
        interests: ['Art', 'Theatre', 'OnLocation'],
        description: 'Are you intrested in art and love painting? Then this is the event for you!',
        location: 'Gothenburg, Änggårdsgatan 46',
        date: '24/1/2022',
        time: '16:30',
        hostName: 'julie_arts'}

    it('component renders without crashing', () => {
        render( <EventDetails eventDetails={[details]} id={details.id} /> )
    })

    it('the event details is not visible initially', () => {
        render(<EventList/>)
        const eventDetails = screen.queryByRole('eventDetails')
        expect(eventDetails).not.toBeInTheDocument()
    })

    it('When the user clicks on a specific event the correct event details become visible', () => {
        render(<EventList/>)
        const eventName = 'Karaoke for coders'
        const eventDesc = 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut voluptas velit voluptates dolorum consequatur assumenda.'

        const [event] = screen.getAllByRole('listitem')
        userEvent.click(event)

        const eventDetails = screen.getByRole('eventDetails')
        expect(eventDetails).toBeInTheDocument()
        
        const correctName = within(eventDetails).getByText(eventName)
        expect(correctName).toBeInTheDocument()

        const correctDesc = within(eventDetails).getByText(eventDesc)
        expect(correctDesc).toBeInTheDocument()
    })

    // it('When the user clicks on an event the correct information is shown about the event', () => {
    //     render(<EventList/>)

    // })

    it('renders the signup button after the user clicks on an event', () => {
        render(<EventList/>)
        const [event] = screen.getAllByRole('listitem')
        userEvent.click(event)

        const [button] = screen.getAllByText('Attend')
        expect(button).toBeInTheDocument()
    })

    it('withdraws the users signup after clicking on the attend button twice', () => {
        render(<EventList/>)
        const [event] = screen.getAllByRole('listitem')
        userEvent.click(event)

        const [button] = screen.getAllByText('Attend')
        userEvent.click(button)
        userEvent.click(button)

        expect(button).toHaveTextContent('Attend')
    })

    it('does not show comments on events initially', () => {
        render(<EventList/>)
        const [event] = screen.getAllByRole('listitem')
        userEvent.click(event)

        const commentfield = screen.queryByText('Discuss this meetup')

        expect(commentfield).toBeNull()
    })

    it('signs the user up after clicking on the attend button', () => {
        render(<EventList/>)
        const [event] = screen.getAllByRole('listitem')
        userEvent.click(event)

        const [button] = screen.getAllByText('Attend')
        userEvent.click(button)

        expect(button).toHaveTextContent('Signed up!')
        userEvent.click(button)
    })

    it('renders comments on an event after the user clicks on the attend button', () => {
        render(<EventList/>)
        const [event] = screen.getAllByRole('listitem')
        userEvent.click(event)

        const [button] = screen.getAllByText('Attend')
        userEvent.click(button)

        const commentfield = screen.queryByText('Discuss this meetup')

        expect(commentfield).toBeInTheDocument()
    })
})