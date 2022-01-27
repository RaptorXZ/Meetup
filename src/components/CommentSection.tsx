import React, { useState, useEffect } from 'react';

interface Props {
    id: string
}

function CommentSection(event: Props) {

    //console.log('Event ID for comment section is ' + event.id)

    useEffect(() => {
        // Add comments from localstorage using event.id
        if(localStorage.getItem('comments'+event.id)) {

            let comments: Array<string>
            const storedComments = localStorage.getItem('comments'+event.id)
            if(storedComments) {
                try {
                    comments = JSON.parse(storedComments)
                    comments.forEach(element => {
                        const para: HTMLParagraphElement = document.createElement("p")
                        para.innerHTML = element
                        document.getElementById("commentsection")?.appendChild(para)
                    })
                } catch (e) {}
            }
        }
    })

    const submitComment = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newcomment: string = document.forms[0]["comment"].value;
        const user: string = 'David1337'

        // Make sure the input field is not empty
        if (newcomment === "") {
            //alert("Type something first!");
            return
        }
        else {
            const para = document.createElement("p")
            para.innerHTML = user + ': ' + newcomment
            document.getElementById("commentsection")?.appendChild(para)
            document.forms[0]["comment"].value = ''
            // Save comment to localstorage with event.id
            storeComment(user + ': ' + newcomment)
        }
    }

    function storeComment(comment: string) {

        let comments: Array<string> | null = []
        const storedComments = localStorage.getItem('comments'+event.id)
        if(storedComments) {
            try {
                comments = JSON.parse(storedComments)
                comments?.push(comment)
                localStorage.setItem('comments'+event.id, JSON.stringify(comments))
            } catch (e) { console.log('Failed to store another comment, overwriting') }
        }
        else {
            localStorage.setItem('comments'+event.id, JSON.stringify([comment]))
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