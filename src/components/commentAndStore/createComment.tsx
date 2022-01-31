

export function createComment(comment: string, user: string) {
    const para = document.createElement("p")
    para.innerHTML = user + ': ' + comment

    const commentsection = document.getElementById("commentsection")
    if(commentsection) {
        try {
            if(commentsection.childNodes[0]) {
                commentsection.insertBefore(para, commentsection.childNodes[0])
            }
            else {
                commentsection.appendChild(para)
            }
        }
        catch(e) {}
    }
}

export function storeComment(comment: string, eventid: string) {

    let comments: Array<string> | null = []
    const storedComments = localStorage.getItem('comments'+eventid)
    if(storedComments) {
        try {
            comments = JSON.parse(storedComments)
            comments?.unshift(comment)
            localStorage.setItem('comments'+eventid, JSON.stringify(comments))
        } catch (e) { console.log('Failed to store another comment, overwriting') }
    }
    else {
        localStorage.setItem('comments'+eventid, JSON.stringify([comment]))
    }
}