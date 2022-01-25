import React, { useEffect, useState } from "react"
import { Events } from '../models/Events'

interface Props{
    eventDetails: Events[]
    id: Events['id']
}

const EventPage = ({eventDetails, id}: Props) => {
    console.log(eventDetails, id) // eventDetails, id
    // const { title } = useParams();
    // const profile = Data.filter(profile => profile.title === title)
    
    // let updatedPlaylist = playlists.map((playlist) => {
    //     if(playlist.id == id) {
    //       playlist.ids = playlist.ids.filter((id) => (id.id != playlist.id))
    //     }

    const [attending, setAttending] = useState(false)

    useEffect(() => {
        if(localStorage.getItem(id)) {
            setAttending(true)
        }
    })
            
            const filterDetails = eventDetails.filter(filterDetails => filterDetails.id === id) // === id
/*             console.log(filterDetails) */
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
        <div role="eventDetails">
            {filterDetails.map(details => (
                <section key={details.id}>
                    <h3>{details.eventName}</h3>
                        <p>{details.date}</p>
                        <p>{details.time}</p>
                        <p>{details.location}</p>
                        <p>{details.hostName}</p>
                    <img src={details.image} alt={details.eventName} height="150px" />
                    <p>{details.description}</p>
                    <button onClick={ () => attendClickHandler()}> {attending ? 'Signed up!' : 'Attend'}</button>
                    { attending ?
                        <section>
                            <p>Discuss this meetup</p>
                        </section>
                    : null }
                    {details.interests.map(interest => (
                            <p aria-labelledby="interest-label">{interest}</p>
                        ))}
                </section>
            ))}
        </div>
    )
}

export default EventPage
