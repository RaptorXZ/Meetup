import { render, screen, queryByText, within } from '@testing-library/react'
import EventList from './EventList'

describe('EventList component', () => {

    it('renders without crashing', () => {
        render( <EventList /> )
    })

})