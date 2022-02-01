import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent  from '@testing-library/user-event'
import EventList from './components/EventList';
import App from './App';
import Interests from './components/Interests';
import {configure} from "@testing-library/dom"
import { useState } from 'react';

//If you want to use getByTestId be aware that in this testing file I changed the default testing attribute to "data-testingid"
configure({testIdAttribute: "data-testingid"})

const Wrapper = () => {
		const [userInterests, setUserInterests] = useState<string[]>([])
		return <Interests userInterests={userInterests} setUserInterests={setUserInterests}/>
	}

const Wrapper2 = () => {
	const [userInterests, setUserInterests] = useState<string[]>([])
	return <EventList userInterests={userInterests} />
} 


describe('App', () => {

  it('renders without crashing', () => {
      render( <App /> )
    })

	describe('filter and sorting the events', () => {

		it('filters the events according to user interests', () => {
			render(<App/>)
		
			const onlocationButton = screen.getByRole('button', {name: 'OnLocation'})
			const musicButton = screen.getByRole('button', {name: 'Music'})
			const theatreButton = screen.getByRole('button', {name: 'Theatre'})

			userEvent.click(onlocationButton)
			userEvent.click(musicButton)
			userEvent.click(theatreButton)

			const events = screen.getAllByTestId('listitem-events')

			expect(events[0]).toHaveTextContent(/Awesome Concert/i)
			expect(events[1]).toHaveTextContent(/Painting Meetup/i)
			expect(events[2]).toHaveTextContent(/Dinner Time/i)
		})
	})
})
