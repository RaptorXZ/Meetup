import {render, screen, within} from '@testing-library/react'
import userEvent from "@testing-library/user-event"
import EventDetails from './EventDetails'
import EventList from './EventList'

describe('EventPage component', () => {

    const details: any = []

    it('component renders without crashing', () => {
        render( <EventDetails eventDetails={details} id={''} /> )
    })

    it('the event details is not visible initially', () => {
        render(<EventList/>)
        const eventDetails = screen.queryByRole('eventDetails')
        expect(eventDetails).not.toBeInTheDocument()
    })

    it('When the user clicks on an event the correct event details become visible', () => {
        render(<EventList/>)
        const eventName = 'Painting Meetup'
        const eventDesc = 'Are you intrested in art and love painting? Then this is the event for you!'

        const [event] = screen.getAllByRole('listitem')
        userEvent.click(event)

        const eventDetails = screen.getByRole('eventDetails')
        expect(eventDetails).toBeInTheDocument()
        
        const correctName = within(eventDetails).getByText(eventName)
        expect(correctName).toBeInTheDocument()

        const correctDesc = within(eventDetails).getByText(eventDesc)
        expect(correctDesc).toBeInTheDocument()

        const incorrectName = within(eventDetails).getByText('Dinner Time')
        expect(incorrectName).not.toBeInTheDocument()

    })

    // it('When the user clicks on an event the correct information is shown about the event', () => {
    //     render(<EventList/>)

    // })
})