import React, { useState, useEffect } from 'react';
import './CommentSection.css'
const { createComment, storeComment } = require('./commentAndStore/createComment')

interface Props {
    id: string
}

function CommentSection(event: Props) {

    useEffect(() => {
        // Add comments from localstorage using event.id
        if(localStorage.getItem('comments'+event.id)) {

            // If comments have already been rendered and the component remounts, do not create duplicate comments
            if((document.getElementById("commentsection")?.children.length || 0) > 1) { return }

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
        const newcomment: string = document.forms[0]["comment"].value || '';
        const user: string = 'David1337'

        // Make sure the input field is not empty
        if (newcomment === "") {
            //alert("Type something first!");
            return
        }
        else {
            createComment(newcomment, user)
            // Save comment to localstorage with event.id
            storeComment(user + ': ' + newcomment, event.id)
            // Clear the input field
            document.forms[0]["comment"].value = ''
        }
    }

    return (
        <section className="comment-wrapper">
            <p className="larger-text comments-headline">Discuss this meetup</p>
            <form name="commentform" onSubmit={event => submitComment(event)}>
                <input type="text" id="comment" name="comment" placeholder="Share your thoughts about this meetup..." />
            </form>
            <section className="comment-section" id='commentsection'>
                
            </section>
        </section>
    )

}

export default CommentSection