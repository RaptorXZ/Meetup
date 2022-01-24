import React, { useState } from "react"
import { Events } from '../models/Events'

interface Props{
    eventDetails: Events[]
    id: Events['id']
}

const EventPage = ({eventDetails, id}: Props) => {

    // const { title } = useParams();
    // const profile = Data.filter(profile => profile.title === title)

    // let updatedPlaylist = playlists.map((playlist) => {
    //     if(playlist.id == id) {
    //       playlist.ids = playlist.ids.filter((id) => (id.id != playlist.id))
    //     }

    const filterDetails = eventDetails.filter(filterDetails => filterDetails.id === id) // === id
    console.log(filterDetails)

    return(
        <div role="eventDetails">
            {filterDetails.map(details => (
                <section key={details.id}>
                    <h3>{details.eventName}</h3>
                    <p>{details.description}</p>
                </section>
            ))}
        </div>
    )
}

export default EventPage
