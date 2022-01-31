import React, { useEffect, useState } from "react"
import { Events } from '../models/Events'
import Commentsection from './CommentSection'
import './EventDetails.css'

interface Props{
    eventDetails: Events[]
    id: Events['id']
}

const EventPage = ({eventDetails, id}: Props) => {

    const [attending, setAttending] = useState(false)
    const [events, setEvents] = useState(eventDetails)

    useEffect(() => {
        if(localStorage.getItem(id)) {
            setAttending(true)
        }
    })

    useEffect( () => {
        let storage: [] = []
        const stored = localStorage.getItem('meetup-storage')
        if (stored !== null) {
            try {
                storage = JSON.parse(stored)
                setEvents(storage)
            } catch (e) { console.log('error') }
        }
	
	}, [])
            
    const filterDetails = events.filter(filterDetails => filterDetails.id === id) // === id
    console.log(id)

    const attendClickHandler = () => {
        if(attending) {
            setAttending(false)
            localStorage.removeItem(id)
        }
        else {
            setAttending(true)
            localStorage.setItem(id, id)
        }
    }

    return(
        <div role="eventDetails" className="eventDetails">
            {filterDetails.map(details => (
                <section className="grid-horizontal-2" key={details.id}>
                    <section className="flexbox-vertical width-50 align-left left-column">
                        <h2 className="event-name">{details.eventName}</h2>
                            <p className="larger-text">Host: {details.hostName}</p>
                        <img className="detail-image" src={details.image} alt={details.eventName} height="150px" />
                        <section className="flexbox-horizontal details-interests">
                        {details.interests.map(interest => (
                            <p aria-labelledby="interest-label">{interest}</p>
                        ))}
                        </section>
                        { attending ?
                            < Commentsection id={id} />
                        : null }
                    </section>
                    <section className="flexbox-vertical width-50 align-left right-column larger-text">
                        <p className="event-date">{details.date}</p>
                        <p>{details.time}</p>
                        <p>{details.location}</p>
                        <p>{details.description}</p>
                        <button className="attend-btn" onClick={ () => attendClickHandler()}>{attending?'Signed up!':'Attend'}</button>
                    </section>
                </section>
            ))}
        </div>
    )
}

export default EventPage
