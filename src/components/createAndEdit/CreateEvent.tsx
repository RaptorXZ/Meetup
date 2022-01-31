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
    const [interest, setInterest] = useState<string[]>([])
    const [description, setDescription] = useState('')
    const [location, setLocation] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [hostName, setHostName] = useState('')
    const [alertName, setAlertName] = useState('')
    const [alertDesc, setAlertDesc] = useState('')
    const [alertLocation, setAlertLocation] = useState('')
    const [alertHost, setAlertHost] = useState('')
    const [alertDate, setAlertDate] = useState('')
    const [alertTime, setAlertTime] = useState('')
    const [alertInterest, setAlertInterest] = useState('')
    const [alertPhoto, setAlertPhoto] = useState('')

    
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

    const afterSubmit = () => {
        setEventName('')
        setDescription('')
        setLocation('')
        setDate('')
        setTime('')
        setHostName('')
        setImage('')
        setInterest([])
    }

    const submitMeetup = () => {
        addEvent(newMeetup)
        storeNewMeetup(newMeetup)
        afterSubmit()
        setShowForm(!showForm)
        // console.log(newMeetup)
    }

    const handleSubmit = () => {
        if(eventName === ''){
            console.log('Please give your meetup a name')
            setAlertName('invalidName')
        } 
        else if(description === ''){
            console.log('Please describe your meetup')
            setAlertDesc('invalidDesc')
        }
        else if(location === ''){
            console.log('Please describe your meetup')
            setAlertLocation('invalidLocation')
        }
        else if(date === ''){
            console.log('Please pick a date')
            setAlertDate('invalidDate')
        }
        else if(time === ''){
            console.log('Please pick a time')
            setAlertTime('invalidTime')
        }
        else if(hostName === ''){
            console.log('Please type in your name')
            setAlertHost('invalidHost')
        }
        else if(interest.length === 0){
            console.log('please choose atleast 1 interest')
            setAlertInterest('invalidInterest')
        } 
        else if(image.length === 0){
            console.log('please choose a photo')
            setAlertPhoto('invalidPhoto')
        }
        else {
            submitMeetup()
            setAlertName('')
            setAlertDesc('')
            setAlertLocation('')
            setAlertDate('')
            setAlertTime('')
            setAlertHost('')
            setAlertInterest('')
            setAlertPhoto('')
        }
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
        } 
        else {
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

                <label htmlFor="mname">Meetup name:
                <input type="text" placeholder="Type here..." className={alertName} value={eventName} onChange={(e) => setEventName(e.target.value)}/>
                </label>

                <label htmlFor="description">Description:
                <textarea placeholder="Type here..." className={alertDesc} value={description} onChange={(e) => setDescription(e.target.value)}/>
                </label>

                <label htmlFor="location">Location:
                <input type="text" placeholder="Type here..." className={alertLocation} value={location} onChange={(e) => setLocation(e.target.value)}/>
                </label>

                <label htmlFor="date">Date:
                <input type="date" placeholder="Type here..." className={alertDate} value={date} onChange={(e) => setDate(e.target.value)}/>
                </label>

                <label htmlFor="time">Time:
                <input type="time" placeholder="Type here..." className={alertTime} value={time} onChange={(e) => setTime(e.target.value)}/>
                </label>

                <label htmlFor="hname">Your name:
                <input type="text" placeholder="Type here..." className={alertHost} value={hostName} onChange={(e) => setHostName(e.target.value)}/>
                </label>

                {cehckInterest.map((interest) => (
                    <label htmlFor={interest}>{interest}
                    <span className={alertInterest}>
                    <input type="checkbox" placeholder="checkboxes" value={interest}  onChange={handleCheck}/>
                    </span>
                    </label>
                ))}

                {photoArray.map((photo) => (
                    <div>
                        <img src={photo} alt='' height="80px" />
                        <span className={alertPhoto}>
                            <input data-testid="photoInput" placeholder="photo" type="radio" name="meetupPhoto" value={photo} onChange={(e) => setImage(e.target.value)} />
                        </span>
                    </div>
                    
                ))}

                </form> 

                <button onClick={() => handleSubmit()}>save meetup</button>

            </div>)
            : null}
        </div>
    )
}

export default CreateEvent