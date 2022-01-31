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
			render(<Wrapper/>)
		
			const onlineButton = screen.getByRole('button', {name: 'Online'})
			const techButton = screen.getByRole('button', {name: 'Tech'})
			const gameButton = screen.getByRole('button', {name: 'Gaming'})

			userEvent.click(onlineButton)
			userEvent.click(techButton)
			userEvent.click(gameButton)

			render(<Wrapper2/>)

			const events = screen.getAllByTestId('listitem-events')

			expect(events[0]).toHaveTextContent(/Karaoke for coders/i)
			expect(events[1]).toHaveTextContent(/CS Tournament/i)
		})
	})
})
