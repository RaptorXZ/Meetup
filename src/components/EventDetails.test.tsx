import {render, screen, within} from '@testing-library/react'
import userEvent from "@testing-library/user-event"
import { useState } from 'react'
import EventDetails from './EventDetails'
import EventList from './EventList'
import { Events } from '../models/Events'

const Wrapper = () => {
	const [userInterests, setUserInterests] = useState<string[]>([])
	return <EventList userInterests={userInterests} />
} 

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
        hostName: 'julie_arts',
		matches: 0
	}

    it('component renders without crashing', () => {
        render( <EventDetails eventDetails={[details]} id={details.id} /> )
    })

    it('the event details is not visible initially', () => {
        render(<Wrapper/>)
        const eventDetails = screen.queryByRole('eventDetails')
        expect(eventDetails).not.toBeInTheDocument()
    })

    it('When the user clicks on a specific event the correct event details become visible', () => {
        render(<Wrapper/>)
        const eventName = 'Karaoke for coders'
        const eventDesc = "Are you unsure whether you are better at singing or programming? Or perhaps you have always wondered what Rick Astley's 'Never Gonna Give You Up' would sound like in binary? Come to Karaoke for Coders and find out!"

        const [event] = screen.getAllByRole('listitem')
        userEvent.click(event)

        const eventDetails = screen.getByRole('eventDetails')
        expect(eventDetails).toBeInTheDocument()
        
        const correctName = within(eventDetails).getByText(eventName)
        expect(correctName).toBeInTheDocument()

        const correctDesc = within(eventDetails).getByText(eventDesc)
        expect(correctDesc).toBeInTheDocument()
    })

    it('renders the signup button after the user clicks on an event', () => {
        render(<Wrapper/>)
        const [event] = screen.getAllByRole('listitem')
        userEvent.click(event)

        const [button] = screen.getAllByText('Attend')
        expect(button).toBeInTheDocument()
    })

    it('signs the user up after clicking on the attend button', () => {
        render(<Wrapper/>)
        const [event] = screen.getAllByRole('listitem')
        userEvent.click(event)

        const [button] = screen.getAllByText('Attend')
        userEvent.click(button)
        userEvent.click(button)

        expect(button).toHaveTextContent('Attend')
    })

    it('withdraws the users signup after clicking on the attend button twice', () => {
        render(<Wrapper/>)
        const [event] = screen.getAllByRole('listitem')
        userEvent.click(event)

        const commentfield = screen.queryByText('Discuss this meetup')

        expect(commentfield).toBeNull()
    })

    it('does not show comments on events initially', () => {
		render(<Wrapper/>)
        const [event] = screen.getAllByRole('listitem')
        userEvent.click(event)

        const [button] = screen.getAllByText('Attend')
        userEvent.click(button)

        expect(button).toHaveTextContent('Signed up!')
        userEvent.click(button)
    })

    it('renders comments on an event after the user clicks on the attend button', () => {
        render(<Wrapper/>)
        const [event] = screen.getAllByRole('listitem')
        userEvent.click(event)

        const [button] = screen.getAllByText('Attend')
        userEvent.click(button)

        const commentfield = screen.queryByText('Discuss this meetup')

        expect(commentfield).toBeInTheDocument()
    })

    it('no longer renders an event after the user clicks on the delete event button', () => {
        render(<Wrapper/>)
        const [event] = screen.getAllByRole('listitem')
        userEvent.click(event)

        const deleteBtn = screen.getByText('Delete event')
        userEvent.click(deleteBtn)

        expect(screen.queryByText('Karaoke for Coders')).toBeNull()
    })
})