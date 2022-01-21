import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import { Events } from '../models/Events'

const data: Events[] = [
    {
        id: nanoid(),
        eventName: 'Karaoke for coders',
        interests: ['Coding', 'Singing'],
        description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut voluptas velit voluptates dolorum consequatur assumenda.',
        location: 'Gothenburg',
        date: '12/3/2022',
        time: '18:00',
        hostName: 'Daniel_1212'
    },
    {
        id: nanoid(),
        eventName: 'Karaoke for coders',
        interests: ['Coding', 'Singing'],
        description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut voluptas velit voluptates dolorum consequatur assumenda.',
        location: 'Gothenburg',
        date: '12/3/2022',
        time: '18:00',
        hostName: 'Daniel_1212'
    },
    {
        id: nanoid(),
        eventName: 'Karaoke for coders',
        interests: ['Coding', 'Singing'],
        description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut voluptas velit voluptates dolorum consequatur assumenda.',
        location: 'Gothenburg',
        date: '12/3/2022',
        time: '18:00',
        hostName: 'Daniel_1212'
    },
    {
        id: nanoid(),
        eventName: 'Karaoke for coders',
        interests: ['Coding', 'Singing'],
        description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut voluptas velit voluptates dolorum consequatur assumenda.',
        location: 'Gothenburg',
        date: '12/3/2022',
        time: '18:00',
        hostName: 'Daniel_1212'
    },
    {
        id: nanoid(),
        eventName: 'Karaoke for coders',
        interests: ['Coding', 'Singing'],
        description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut voluptas velit voluptates dolorum consequatur assumenda.',
        location: 'Gothenburg',
        date: '12/3/2022',
        time: '18:00',
        hostName: 'Daniel_1212'
    }
]

function EventList() {
    const [eventList, setEventList] = useState<Events[]>(data)

    return (
            <ul>
                {eventList.map(event => (   
                    <li key={event.id}>

                        <h3>{event.eventName}</h3>
                        <p>{event.date}</p>
                        <p>{event.time}</p>
                        <p>{event.hostName}</p>

                        {event.interests.map(interest => (
                            <p>{interest}</p>
                        ))}

                    </li>
                ))}
            </ul>
    )
}

export default EventList