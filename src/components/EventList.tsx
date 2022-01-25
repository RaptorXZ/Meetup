import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import { Events } from '../models/Events'
import EventDetails from './EventDetails'
import karaoke from '../images/karaoke.jpg'
import food from '../images/food.jpg'
import concert from '../images/concert.jpg'
import gaming from '../images/gaming.jpg'
import painting from '../images/painting.jpg'
import './EventList.css'

const data: Events[] = [
    {
        id: 'sfhdfghdfg',
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
        id: 'rtrhjrghfgh',
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
        id: 'cnfbcvfvfg',
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
        id: 'fghtrhythtg',
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
        id: 'bmhkjjkda',
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
    const [showList, setShowList] = useState(true)
    const [chosenId, setChosenId] = useState('')

    const eventClickHandler = (events: any, eventId: Events['id']) => {
        if(events.key !== eventId){
            setShowDetails(!showDetails)
            setShowList(!showList)
            setChosenId(eventId)
            } else if(events.key === eventId) {
                setShowDetails(showDetails)
                setShowList(showList)
                setChosenId(eventId)
        } else {
            console.log('sorry we cant find your event')
        }
    }

    const closeEventClickHandler = () => {
        setShowList(!showList)
        setShowDetails(!showDetails)
    }

    return (
            <ul>
                {showList ? (
                    <div className='event-list'>
                        {events.map(event => (   
                            <li className='event' key={event.id} data-testid={'event' + event.id} onClick={ () => eventClickHandler(events, event.id)}>

                                <div>
                                <label id="eventname-label">Eventname</label>
                                <h3 aria-labelledby="eventname-label">{event.eventName}</h3>
                                <div>
                                <img src={event.image} alt={event.eventName} height="150px" />
                                </div>
                                </div>


                                <div className='all-paragraph'>
                                <div>
                                <p>{event.date}, {event.time}</p>
                                <p>{event.location}</p>
                                </div>

                                <div className='interest-list'>
                                <label id="interest-label">Interest</label>
                                {event.interests.map(interest => (
                                        <p className='interest-paragraph' aria-labelledby="interest-label">{interest},</p>
                                ))}
                                </div>
                                <p>{event.hostName}</p>
                                </div>

                            </li>                
                        ))}
                    </div>
                    ) : null}

                {showDetails ? 
                <div>
                    <button onClick={closeEventClickHandler}>close</button>
                    <EventDetails eventDetails={data} id={chosenId} />
                </div>
                : null}
               
            </ul>
    )
}

export default EventList
