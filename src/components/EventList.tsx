import React, { useState, useEffect } from 'react';
import { Events } from '../models/Events'
import EventDetails from './EventDetails'
import karaoke from '../images/karaoke.jpg'
import food from '../images/food.jpg'
import concert from '../images/concert.jpg'
import gaming from '../images/gaming.jpg'
import painting from '../images/painting.jpg'
import './EventList.css'
import CreateEvent from './createAndEdit/CreateEvent'

const data: Events[] = [
    {
        id: 'sfhdfghdfg',
        image: karaoke,
        eventName: 'Karaoke for coders',
        interests: ['Coding', 'Singing', 'Tech'],
        description: "Are you unsure whether you are better at singing or programming? Or perhaps you have always wondered what Rick Astley's 'Never Gonna Give You Up' would sound like in binary? Come to Karaoke for Coders and find out!",
        location: 'Gothenburg, Blåsvädergatan 21',
        date: 'Friday, February 25, 2022',
        time: '18:00',
        hostName: 'Daniel_1212'
    },
    {
        id: 'rtrhjrghfgh',
        image: concert,
        eventName: 'Awesome concert',
        interests: ['OnLocation', 'Singing', 'Music', 'Theatre'],
        description: "You might never have heard of the Thundering Llamas, or our unique rendition of Metallica's 'Nothing Else Matters', but it's not too late to change!",
        location: 'Gothenburg, Pusterviksgatan 3',
        date: 'Tuesday, March 15, 2022',
        time: '20:00',
        hostName: 'Thundering_Llamas'
    },
    {
        id: 'cnfbcvfvfg',
        image: food,
        eventName: 'Dinner Time',
        interests: ['OnLocation', 'Food'],
        description: "A great chance to get to know some new people and try out some great food! No couples!",
        location: 'Gothenburg, Andra Lång',
        date: 'Tuesday, March 22, 2022',
        time: '18:30',
        hostName: 'hungry_frog'
    },
    {
        id: 'fghtrhythtg',
        image: gaming,
        eventName: 'CS Tournament',
        interests: ['Tech', 'Gaming'],
        description: "Noobs and pros welcome. Teams of 5. Viewers also welcome. Participation is free, viewers pay $5 entry. Bring your own tech.",
        location: 'Stockholm',
        date: 'Wednesday, February 2, 2022',
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
        date: 'Thursday, May 12, 2022',
        time: '16:30',
        hostName: 'julie_arts'
    }
]


function EventList() {
    const [events, setEvents] = useState<Events[]>(data)
    const [showDetails, setShowDetails] = useState(false)
    const [showList, setShowList] = useState(true)
    const [chosenId, setChosenId] = useState('')


    const addEvent = (newEvent: Events) => {
            const newArr = [...events, newEvent]
            console.log(newArr)
            setEvents(newArr)
        // console.log('amount of events', events.length)
    }

//    console.log(events)

    useEffect( () => {
        let storage: any //Array<string> | null = []
        const stored = localStorage.getItem('meetup-storage')
        if (stored !== null) {
        try {
        storage = JSON.parse(stored)
        console.log(storage)
        setEvents(storage)
        } catch (e) { console.log('error') } 
        }
	
	}, [])


    useEffect( () => {
        localStorage.setItem('meetup-storage', JSON.stringify(events))
    }, [events])

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

                {showList && ( <CreateEvent events={data} addEvent={addEvent}/> ) }
                
               
                {showList ? (
                    <div id='event' className='event-list'>
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
                                        <p className='interest-paragraph' aria-labelledby="interest-label">{interest}</p>
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
                    <button className="back-btn" onClick={closeEventClickHandler}>{'< Back to events'}</button>
                    <EventDetails eventDetails={data} id={chosenId} />
                </div>
                : null}
               
            </ul>
    )
}

export default EventList
