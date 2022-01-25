import React, { useState } from 'react';

interface Props {
    id: string
}

function CommentSection(event: Props) {

    console.log('Event ID for comment section is ' + event.id)

    const submitComment = () => {
        
        let commentInput: HTMLInputElement | HTMLElement | null;
        commentInput = document.getElementById("comment")
        

        console.log('Submitting comment')
    }

    return (
        <section>
            <p>Discuss this meetup</p>
            <section id='commentsection'>
                <form name="commentform" onSubmit={submitComment}>
                    <input type="text" id="comment" name="comment" placeholder="Share your thoughts about this meetup!" 
                    onKeyPress={event => event.key === "Enter" && submitComment()} />
                </form>
            </section>
        </section>
    )

}

export default CommentSection