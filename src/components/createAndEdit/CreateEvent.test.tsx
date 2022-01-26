import {render, screen, within} from '@testing-library/react'
import userEvent from "@testing-library/user-event"
import CreateEvent from './CreateEvent'

describe('crete event component', () => {
    it('renders without crashing', () => {
        render(<CreateEvent/>)
    })
})