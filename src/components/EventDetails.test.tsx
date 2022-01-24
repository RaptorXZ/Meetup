import {render, screen, within} from '@testing-library/react'
import userEvent from "@testing-library/user-event"
import EventDetails from './EventDetails'
import EventList from './EventList'

describe('EventPage component', () => {

    const details: any = []

    it('component renders without crashing', () => {
        render( <EventDetails eventDetails={details} id={details} /> )
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

    it('renders the signup button after the user clicks on an event', () => {
        render(<EventList/>)
        const [event] = screen.getAllByRole('listitem')
        userEvent.click(event)

        const [button] = screen.getAllByText('Attend')
        expect(button).toBeInTheDocument()
    })

    it('signs the user up after clicking on the attend button', () => {
        render(<EventList/>)
        const [event] = screen.getAllByRole('listitem')
        userEvent.click(event)

        const [button] = screen.getAllByText('Attend')
        userEvent.click(button)

        expect(button).toHaveTextContent('Signed up!')
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