import { nanoid } from "nanoid"
import { useState } from "react"
import { Events } from '../../models/Events'
import './CreateEvent.css'

interface Props{
    events: Events
}

const CreateEvent = ({events}: Props) => {
    const [showForm, setShowForm] = useState(false)
    const [meetup, setMeetup] = useState([events])

    const [eventName, setEventName] = useState('')
    const [image, setImage] = useState('')
    const [interest, setInterest] = useState([''])
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
    hostName: hostName
    }

    // console.log(newMeetup)

    const showFormClickHandler = () => {
        setShowForm(!showForm)
    }

    const saveMeetupClickHandler = () => {
        const newMeetupArr = [...meetup, newMeetup]
        setMeetup(newMeetupArr)
        console.log(...meetup)
        console.log(newMeetupArr)
    }


    return(
        <div>
            <button onClick={showFormClickHandler}>create meetup</button>

            {showForm ? 
            (<div>
                <form className="newEventForm">
                <h3>create your new event!</h3>

                <label htmlFor="mname">Meetup name:</label>
                <input type="text" placeholder="give your meetup a name..." value={eventName} onChange={(e) => setEventName(e.target.value)}/>

                <label htmlFor="description">Add description:</label>
                <input type="text" placeholder="describe you meetup..." value={description} onChange={(e) => setDescription(e.target.value)}/>

                <label htmlFor="location">Add location:</label>
                <input type="text" placeholder="location..." value={location} onChange={(e) => setLocation(e.target.value)}/>

                <label htmlFor="date">Add a date:</label>
                <input type="text" placeholder="date..." value={date} onChange={(e) => setDate(e.target.value)}/>

                <label htmlFor="time">Add a time:</label>
                <input type="text" placeholder="time..." value={time} onChange={(e) => setTime(e.target.value)}/>

                <label htmlFor="hname">Add your name:</label>
                <input type="text" placeholder="describe you meetup" value={hostName} onChange={(e) => setHostName(e.target.value)}/>

                <label htmlFor="image">Upload a photo:</label>
                <input type="file" placeholder="upload a photo" value={image} onChange={(e) => setImage(e.target.value)}/>             

                </form> 

            <button onClick={() => saveMeetupClickHandler()}>save meetup</button>

            </div>)
            : null}





        </div>
    )
}

export default CreateEvent