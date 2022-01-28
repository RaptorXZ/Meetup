import { render, screen, queryByText, within } from '@testing-library/react'
import userEvent from "@testing-library/user-event"
import CommentSection from './CommentSection'
import EventDetails from './EventDetails'
import EventList from './EventList'
const { createComment } = require('./commentAndStore/createComment')

describe('CommentSection component', () => {

    it('adds a new comment and renders it to screen', () => {
        render(<EventList/>)
        
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