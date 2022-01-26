import React, { useState, useEffect } from 'react';

interface Props {
    id: string
}

function CommentSection(event: Props) {

    console.log('Event ID for comment section is ' + event.id)

    useEffect(() => {
        // Add comments from localstorage using event.id
        if(localStorage.getItem('comments'+event.id)) {
            console.log()
            const para: HTMLParagraphElement = document.createElement("p")
            para.innerHTML = localStorage.getItem('comments'+event.id) as string
            document.getElementById("commentsection")?.appendChild(para)
        }
    })

    const submitComment = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newcomment: string = document.forms[0]["comment"].value;
        const user: string = 'David1337'

        // Make sure the input field is not empty
        if (newcomment == "") {
            //alert("Type something first!");
            return
        }
        else {
            const para = document.createElement("p")
            para.innerHTML = user + ': ' + newcomment
            document.getElementById("commentsection")?.appendChild(para)
            document.forms[0]["comment"].value = ''

            // Save comment to localstorage with event.id
            localStorage.setItem('comments'+event.id, para.innerHTML)
        }
    }

    return (
        <section>
            <p>Discuss this meetup</p>
            <section id='commentsection'>
                <form name="commentform" onSubmit={event => submitComment(event)}>
                    <input type="text" id="comment" name="comment" placeholder="Share your thoughts about this meetup!" />
                </form>
            </section>
        </section>
    )

}

export default CommentSection