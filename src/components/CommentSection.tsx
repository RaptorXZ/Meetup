import React, { useState } from 'react';

function CommentSection() {

    return (
        <section>
            <p>Discuss this meetup</p>
            <section id='commentsection'>
                <input type="text" id="comment" name="comment" placeholder="Share your thoughts about this meetup!" />
            </section>
        </section>
    )

}

export default CommentSection