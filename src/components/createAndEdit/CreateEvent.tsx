import { nanoid } from "nanoid"
import { useState } from "react"
import { Events } from '../../models/Events'
import karaoke from '../../images/karaoke.jpg'
import food from '../../images/food.jpg'
import concert from '../../images/concert.jpg'
import gaming from '../../images/gaming.jpg'
import painting from '../../images/painting.jpg'
import coding from '../../images/coding.jpg'
import literature from '../../images/literature.jpg'
import movies from '../../images/movies.jpg'
import photography from '../../images/photography.jpg'
import sports from '../../images/sports.jpg'
import './CreateEvent.css'

interface Props{
    events: Events[]
    addEvent: (newEvent: Events) => void
}

const CreateEvent = ({events, addEvent}: Props) => {
    const [showForm, setShowForm] = useState(false)
    const [meetup, setMeetup] = useState(events)
    const cehckInterest: string[] = ['Art', 'Food', 'Sports', 'Coding', 'Theatre', 'Movies', 'Gaming', 'Literature', 'Singing', 'Photography', 'Online', 'OnLocation', 'Tech', 'Music']
    const photoArray: string[] = [literature, movies, photography, sports, karaoke, food, concert, gaming, painting, coding]
    const [eventName, setEventName] = useState('')
    const [image, setImage] = useState<string>('')
    const [interest, setInterest] = useState<string[]>([]) //add check boxes for interests
    const [description, setDescription] = useState('')
    const [location, setLocation] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [hostName, setHostName] = useState('')

    
    const newMeetup = {
    id: nanoid(),
    image: image,
    eventName: eventName,
    interests: interest,
    description: description,
    location: location,
    date: date,
    time: time,
    hostName: hostName, 
	matches: 0
    }

    const showFormClickHandler = () => {
        setShowForm(!showForm)
    }

    const submitMeetup = () => {
        // const newMeetupArr = [...meetup, newMeetup]
        // setMeetup(newMeetupArr)
        addEvent(newMeetup)
        storeNewMeetup(newMeetup)
        console.log(newMeetup)
    }

    
    const storeNewMeetup = (newMeetup: object) => {
        let allNewMeetups: Array<object> | null = []
        let meetupStorage = localStorage.getItem('meetup-storage')

        if(meetupStorage) {
            try {
                allNewMeetups = JSON.parse(meetupStorage)
                allNewMeetups?.push(newMeetup)
                localStorage.setItem('meetup-storage', JSON.stringify(allNewMeetups))
            } catch(e) {
                console.log('Failed to store new meetup')
            }
        } else {
            localStorage.setItem('meetup-storage', JSON.stringify(newMeetup))
        }
    }

    // Add/Remove checked interests
    const handleCheck = (event: any) => {
        let updatedList = [...interest]
        if (event.target.checked) {
        updatedList = [...interest, event.target.value]
        } else {
        updatedList.splice(interest.indexOf(event.target.value), 1)
        }
        setInterest(updatedList)
    }


    return(
        <div>
            <button onClick={showFormClickHandler}>create meetup</button>

            {showForm ? 
            (<div>
                <form className="newEventForm">
                <h3>create your new event!</h3>

                <label htmlFor="hname">Your name:
                <input type="text" placeholder="describe you meetup" value={hostName} onChange={(e) => setHostName(e.target.value)}/>
                </label>

                <label htmlFor="mname">Meetup name:
                <input type="text" placeholder="give your meetup a name..." value={eventName} onChange={(e) => setEventName(e.target.value)}/>
                </label>

                <label htmlFor="description">Description:
                <textarea placeholder="describe you meetup..." value={description} onChange={(e) => setDescription(e.target.value)}/>
                </label>

                <label htmlFor="location">Location:
                <input type="text" placeholder="location..." value={location} onChange={(e) => setLocation(e.target.value)}/>
                </label>

                <label htmlFor="date">Date:
                <input type="text" placeholder="date..." value={date} onChange={(e) => setDate(e.target.value)}/>
                </label>

                <label htmlFor="time">Time:
                <input type="text" placeholder="time..." value={time} onChange={(e) => setTime(e.target.value)}/>
                </label>

                {cehckInterest.map((interest) => (
                    <label htmlFor="interests">{interest}
                    <input type="checkbox" value={interest} onChange={handleCheck}/>
                    </label>
                ))}

                {photoArray.map((photo) => (
                    <div>
                        <img src={photo} alt='' height="50px" />
                            <input type="radio" name="meetup" value={photo} onChange={(e) => setImage(e.target.value)} />
                    </div>
                    
                ))}

                {/* <label htmlFor="image">Upload a photo:
                <input type="file" accept="image/*"  onChange={(e) => setImage(e.target.value)} />             
                </label> */}

                </form> 

                <button onClick={() => submitMeetup()}>save meetup</button>

            </div>)
            : null}
        </div>
    )
}

export default CreateEvent