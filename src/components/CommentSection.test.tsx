import { render, screen, queryByText, within } from '@testing-library/react'
import userEvent from "@testing-library/user-event"
import CommentSection from './CommentSection'
import EventDetails from './EventDetails'
import EventList from './EventList'

describe('CommentSection component', () => {

    it('adds a new comment when user inputs something into the comment field and presses enter', () => {
        render(<EventList/>)
        const [event] = screen.getAllByRole('listitem')
        userEvent.click(event)

        const [button] = screen.getAllByText('Attend')
        userEvent.click(button)

        // Get the comment input field
        const input = screen.getByRole('textbox')
        // Simulate keyboard event to input a comment and simulate enter
        userEvent.type(input, 'Great event!' + '{enter}')
        // Query an element with the text we inputted
        const newComment = screen.getByText('Great event!')
        expect(newComment).toBeInTheDocument()
    })

})