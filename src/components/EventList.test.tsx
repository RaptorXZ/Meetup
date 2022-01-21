import { render, screen, queryByText, within } from '@testing-library/react'
import EventList from './EventList'

describe('EventList component', () => {

    it('renders without crashing', () => {
        render( <EventList /> )
    })

    it('initially there are 5 events', () => {
        render( <EventList/> )

        const events = screen.getAllByRole('listitem')
        
        expect(events.length).toBeGreaterThan(4)
    })

})