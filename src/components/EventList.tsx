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
        location: 'Gothenburg',
        date: '12/3/2022',
        time: '18:00',
        hostName: 'Daniel_1212', 
		matches: 0
    },
    {
        id: 'rtrhjrghfgh',
        image: concert,
        eventName: 'Awesome concert',
        interests: ['OnLocation', 'Singing', 'Music', 'Theatre'],
        description: "You might never have heard of the Thundering Llamas, or our unique rendition of Metallica's 'Nothing Else Matters', but it's not too late to change!",
        location: 'Gothenburg, Pusterviksgatan 3',
        date: '15/3/2022',
        time: '20:00',
		hostName: 'Thundering_Llamas', 
		matches: 0
    },
    {
        id: 'cnfbcvfvfg',
        image: food,
        eventName: 'Dinner Time',
        interests: ['OnLocation', 'Food'],
        description: "A great chance to get to know some new people and try out some great food! No couples!",
        location: 'Gothenburg, Andra Lång',
        date: '22/3/2022',
        time: '18:30',
		hostName: 'hungry_frog', 	
		matches: 0
       
    },
    {
        id: 'fghtrhythtg',
        image: gaming,
        eventName: 'CS Tournament',
        interests: ['Tech', 'Gaming'],
        description: "Noobs and pros welcome. Teams of 5. Viewers also welcome. Participation is free, viewers pay $5 entry. Bring your own tech.",
        location: 'Stockholm',
        date: '15/2/2022',
        time: '13:00',
        hostName: 'the_tournament_host', 
		matches: 0
    },
    {
        id: 'bmhkjjkda',
        image: painting,
        eventName: 'Painting Meetup',
        interests: ['Art', 'Theatre', 'OnLocation'],
        description: 'Are you intrested in art and love painting? Then this is the event for you!',
        location: 'Gothenburg, Änggårdsgatan 46',
        date: '24/4/2022',
        time: '16:30',
        hostName: 'julie_arts', 
		matches: 0
    }
]

interface Props {
	userInterests: string[]
}

function EventList({userInterests} : Props) {
    const [events, setEvents] = useState<Events[]>(data)
    const [showDetails, setShowDetails] = useState(false)
    const [showList, setShowList] = useState(true)
    const [chosenId, setChosenId] = useState('')
	const [filteredEvents, setFilteredEvents] = useState([])

    const addEvent = (newEvent: Events) => {
            const newArr = [...events, newEvent]
            console.log(newArr)
            setEvents(newArr)
    }

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
            console.log("Sorry, we can't find your event")
        }
    }

    const closeEventClickHandler = () => {
        setShowList(!showList)
        setShowDetails(!showDetails)
    }

	const deleteEventClickHandler = () => {
        const eventsArr: Events[] = events;
        let filteredEvents: Events[] = eventsArr.filter(function(e) { return e.id !== chosenId})
        console.log(filteredEvents)
        setEvents(filteredEvents)

        setShowList(!showList)
        setShowDetails(!showDetails)
    }

	function filterByUserInterests () {
		console.log('in filtering function')
		
		const filterEvents: any = data.filter(event => {
			for(let i = 0; i < userInterests.length; i++) {
				if(event.interests.includes(userInterests[i])) {
					console.log(event)
					return true
				}
			}
			return false
		})

		setFilteredEvents(filterEvents) 
		console.log(filteredEvents) 
	}
	
	const eventsToShow = userInterests.length === 0 
	? events 
	: events.filter(event => {
		for(let i = 0; i < userInterests.length; i++) {
			if(event.interests.includes(userInterests[i])) {
				return true
			}
		}
		return false
	})
	
	const matchesCount = eventsToShow.map(event => {
		let matchesCount = event.interests.filter(int => {
			return userInterests.includes(int);
		})
		event.matches = matchesCount.length;
		return event
	})
	
	const sortedByMatches = matchesCount.sort((ev1, ev2) => ev2.matches - ev1.matches)

    return (<div>
            <ul>

                {showList && ( <CreateEvent events={data} addEvent={addEvent}/> ) }
               
                {showList ? (
                    <div id='event' className='event-list'>
                        {sortedByMatches.map(event => (   
                            
                            <li className='event' key={event.id} data-testid={'event' + event.id} data-testingid='listitem-events' onClick={ () => eventClickHandler(events, event.id)}>
                                <div>
                                <label id="eventname-label">Eventname</label>
                                <h3 aria-labelledby="eventname-label">{event.eventName}</h3>
                                <div>
                                    <img src={event.image} alt={event.eventName} height="150px" />
                                </div>
                            </div>

								
							<div className='all-paragraph'>

								<div className='date-location'>
								<p>{event.date}, {event.time}</p>
								<p>{event.location}</p>
								</div>

                                <div className='interest-list'>
                                <label id="interest-label">Interest</label>
                                {event.interests.map(interest => (
                                        <p key={interest} className='interest-paragraph' aria-labelledby="interest-label">{interest}</p>
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
                    <div className="back-del-wrapper">
                        <button className="back-btn larger-text" onClick={closeEventClickHandler}>{'< Back to events'}</button>
                        <button className="delete-btn larger-text" onClick={deleteEventClickHandler}>{'Delete event'}</button>
                    </div>
                    <EventDetails eventDetails={data} id={chosenId} />
                </div>
                : null}
               
            </ul> 
		</div>
		)
	
}

export default EventList