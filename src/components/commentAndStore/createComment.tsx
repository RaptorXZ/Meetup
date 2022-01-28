

export function createComment(comment: string, user: string) {
    const para = document.createElement("p")
    para.innerHTML = user + ': ' + comment
    document.getElementById("commentsection")?.appendChild(para)
}

export function storeComment(comment: string, eventid: string) {

    let comments: Array<string> | null = []
    const storedComments = localStorage.getItem('comments'+eventid)
    if(storedComments) {
        try {
            comments = JSON.parse(storedComments)
            comments?.push(comment)
            localStorage.setItem('comments'+eventid, JSON.stringify(comments))
        } catch (e) { console.log('Failed to store another comment, overwriting') }
    }
    else {
        localStorage.setItem('comments'+eventid, JSON.stringify([comment]))
    }
}