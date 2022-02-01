import { render, screen, queryByText, within } from '@testing-library/react'
import {useState} from 'react' 
import Interests from './Interests'
import EventList from './EventList'

const Wrapper = () => {
	const [userInterests, setUserInterests] = useState<string[]>([])
	return <EventList userInterests={userInterests} />
} 


describe('EventList component', () => {

    it('renders without crashing', () => {
        render( <Wrapper/> )
    })

    it('renders initially at least 5 events', () => {
        render( <Wrapper/> )

        const events = screen.getAllByRole('listitem')
        
        expect(events.length).toBeGreaterThan(4)
    })

    it('renders a specific event name', () => {
		render( <Wrapper/> )

		const event = screen.getByText(/Karaoke for coders/)

		expect(event).toBeInTheDocument()
	})

    it('renders a host name for each event', () => {
		render( <Wrapper/> )
		
        const events = screen.getAllByRole('listitem')

        events.forEach((item) => {
            const eventname = within(item).getByLabelText('Eventname')

            expect(eventname).toBeTruthy()
        })
	})

    it('renders a date for a specific event', () => {
		render( <Wrapper/> )
		
        const events = screen.getAllByRole('listitem')

        expect(within(events[4]).getByText('Gothenburg, Änggårdsgatan 46')).toBeInTheDocument()
	})

    it('renders at least one interest for each event', () => {
		render( <Wrapper/> )
		
        const events = screen.getAllByRole('listitem')

        expect(within(events[0]).getAllByLabelText('Interest')).toHaveLength(3)
        events.forEach((item) => {
            const interests = within(item).getAllByLabelText('Interest')

            expect(interests).not.toHaveLength(0)
        })
	})

})