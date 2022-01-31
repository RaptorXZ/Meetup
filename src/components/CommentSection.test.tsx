import { render, screen, queryByText, within } from '@testing-library/react'
import userEvent from "@testing-library/user-event"
import { useState } from 'react'
import CommentSection from './CommentSection'
import EventDetails from './EventDetails'
import EventList from './EventList'
const { createComment } = require('./commentAndStore/createComment')

const Wrapper = () => {
	const [userInterests, setUserInterests] = useState<string[]>([])
	return <EventList userInterests={userInterests} />
} 

describe('CommentSection component', () => {

    it('adds a new comment and renders it to screen', () => {
        render(<Wrapper/>)
        
        const [event] = screen.getAllByRole('listitem')
        userEvent.click(event)

        const [button] = screen.getAllByText('Attend')
        userEvent.click(button)
        
        const testdata: string = "Great event!"
        const testuser: string = "HappyMike"
        createComment(testdata, testuser)

        const newComment = screen.getByText(testuser + ': ' + testdata)
        expect(newComment).toBeInTheDocument()
    })

})