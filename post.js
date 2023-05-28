import { API_URL } from "./config.js"
import { firstLetterToUpperCase, fetchData, getUrlParams } from "./functions.js"
import createHeader from "./header.js"


async function init() {
    const id = getUrlParams('post_id')
    console.log('cia VVV')
    console.log(id)

    const contentElement = document.querySelector('#content')

    if (!id) {
        contentElement.innerHTML = `<h1>No posts;/</h1>`
        return
    }

    // const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}?_expand=user&_embed=comments`)
    // const postData = await res.json()
    // console.log(postData)

    const postData = await fetchData(`${API_URL}/posts/${id}?_expand=user&_embed=comments`)

    const postWrapperElement = createPostElement(postData)
    contentElement.append(postWrapperElement)

    contentElement.before(createHeader())
}

init()


function createPostElement(post) {

    const postWrapper = document.createElement('div')
    postWrapper.classList.add('post-wrapper')

    const postContent = document.createElement('div')
    postContent.classList.add('post-content')

    const postTitle = document.createElement('h1')
    postTitle.classList.add('post-title')
    postTitle.textContent = firstLetterToUpperCase(post.title)

    const authorLink = document.createElement('a')
    authorLink.href = './user.html?user_id=' + post.user.id
    authorLink.textContent = post.user.name

    const postBody = document.createElement('p')
    postBody.classList.add('post-body')
    postBody.textContent = firstLetterToUpperCase(post.body)

    const otherAuthorPosts = document.createElement('a')
    otherAuthorPosts.href = './posts.html?user_id=' + post.user.id
    otherAuthorPosts.textContent = 'More posts by: ' + post.user.name

    postContent.append(postTitle, authorLink, postBody, otherAuthorPosts)


    const postComments = document.createElement('div')
    postComments.classList.add('post-comments')

    const commentsTitle = document.createElement('h2')

    postComments.append(commentsTitle)


    commentsTitle.textContent = 'No comments found'

    if (post.comments.length > 0) {
        commentsTitle.textContent = 'Comments: '

        const commentsList = document.createElement('div')
        commentsList.classList.add('comments-list')

        post.comments.forEach(comment => {
            const commentItem = document.createElement('div')
            commentItem.classList.add('comment-item')
            
            const commentTitle = document.createElement('h3')
            commentTitle.textContent = firstLetterToUpperCase(comment.name) 

            const commentAuthor = document.createElement('span')
            commentAuthor.textContent = `Comment by: ${comment.email}`

            const commentBody = document.createElement('p')
            commentBody.textContent = firstLetterToUpperCase(comment.body)

            commentItem.append(commentTitle, commentBody, commentAuthor)
            commentsList.append(commentItem)
            
        });

        postComments.append(commentsList)
    } 

    postComments.append(commentsTitle)
 



    postWrapper.append(postContent,postComments)

    return postWrapper
}