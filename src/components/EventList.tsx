import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import { Events } from '../models/Events'
import EventDetails from './EventDetails'
import karaoke from '../images/karaoke.jpg'
import food from '../images/food.jpg'
import concert from '../images/concert.jpg'
import gaming from '../images/gaming.jpg'
import painting from '../images/painting.jpg'

const data: Events[] = [
    {
        id: nanoid(),
        image: karaoke,
        eventName: 'Karaoke for coders',
        interests: ['Coding', 'Singing', 'Tech'],
        description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut voluptas velit voluptates dolorum consequatur assumenda.',
        location: 'Gothenburg',
        date: '12/3/2022',
        time: '18:00',
        hostName: 'Daniel_1212'
    },
    {
        id: nanoid(),
        image: concert,
        eventName: 'Awesome concert',
        interests: ['OnLocation', 'Singing', 'Music', 'Theatre'],
        description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut voluptas velit voluptates dolorum consequatur assumenda.',
        location: 'Gothenburg, Pusterviksgatan 3',
        date: '15/3/2022',
        time: '20:00',
        hostName: 'JoJo'
    },
    {
        id: nanoid(),
        image: food,
        eventName: 'Dinner Time',
        interests: ['OnLocation', 'Food'],
        description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut voluptas velit voluptates dolorum consequatur assumenda.',
        location: 'Gothenburg, Andra Lång',
        date: '22/3/2022',
        time: '18:30',
        hostName: 'david1337'
    },
    {
        id: nanoid(),
        image: gaming,
        eventName: 'CS Tournament',
        interests: ['Tech', 'Gaming'],
        description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut voluptas velit voluptates dolorum consequatur assumenda.',
        location: 'Stockholm',
        date: '2/2/2022',
        time: '13:00',
        hostName: 'the_tournament_host'
    },
    {
        id: nanoid(),
        image: painting,
        eventName: 'Painting Meetup',
        interests: ['Art', 'Theatre', 'OnLocation'],
        description: 'Are you intrested in art and love painting? Then this is the event for you!',
        location: 'Gothenburg, Änggårdsgatan 46',
        date: '24/1/2022',
        time: '16:30',
        hostName: 'julie_arts'
    }
]

function EventList() {
    const [events, setEvents] = useState<Events[]>(data)
    const [showDetails, setShowDetails] = useState(false)

    const eventClickHandler = (events: any, eventId: Events['id']) => {
        if(events.key !== eventId){
            setShowDetails(!showDetails)
        } else if(events.key === eventId) {
            setShowDetails(showDetails)
        } else {
            console.log('sorry we cant find your event')
        }
    } 

    return (
            <ul>
                {events.map(event => (   
                    <li key={event.id} data-testid={'event' + event.id} onClick={ () => eventClickHandler(events, event.id)}>
                        <label id="eventname-label">Eventname</label>
                        <h3 aria-labelledby="eventname-label">{event.eventName}</h3>
                        <img src={event.image} alt={event.eventName} height="150px" />
                        <p>{event.date}</p>
                        <p>{event.time}</p>
                        <p>{event.hostName}</p>

                        <label id="interest-label">Interest</label>
                        {event.interests.map(interest => (
                            <p aria-labelledby="interest-label">{interest}</p>
                        ))}
                    </li>                
                ))}

                {showDetails ? 
                events.map(event => (
                    <li id={event.id}>
                        <EventDetails eventDetails={data} id={event.id} />
                    </li>
                ))
                : null}
               
            </ul>
    )
}

export default EventList
