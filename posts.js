import { API_URL, POSTS_PER_PAGE } from "./config.js"
import { firstLetterToUpperCase, getUrlParams } from "./functions.js"
// import { init as header } from "./navigation.js" //init as header - tiesiog persivadiname cia init i header
import createHeader from "./header.js"

async function init() {
    const id = getUrlParams('user_id')

    console.log(id)

    let fetchUrl = `${API_URL}/posts?_limit=${POSTS_PER_PAGE}&_expand=user&_embed=comments`
    //API_URL is config.js api adresas

    if (id) {
        fetchUrl = `${API_URL}/posts?_limit=${POSTS_PER_PAGE}&_expand=user&_embed=comments&userId=${id}`
    }

    const res = await fetch(fetchUrl)
    const postsData = await res.json()
    console.log(postsData)
    
    const contentElement = document.querySelector('#content')

    const postsListElement = createPostsList(postsData)

    contentElement.append(postsListElement)

    contentElement.before(createHeader())
    //cia asigninam createHeader() navigacijos funkcija prie contentElement div'o, nepamirst issikviest! ()
}

init()

function createPostsList(posts) {
    const postsList = document.createElement('ul')
    postsList.classList.add('posts-list')

    posts.forEach(post => {
        console.log(post)
        console.log(post.user.name)
        console.log(post.comments.length)

        const postTitle = post.title 
        const postAuthorName= post.user.name
        const postAuthorId = post.userId
        const postCommentsNumber = post.comments.length

        const postElement = document.createElement('li')
        const postlLinkElement = document.createElement('a')
        
        postlLinkElement.href = './post.html?post_id=' + post.id
        postlLinkElement.textContent = `${firstLetterToUpperCase(postTitle)} (${postCommentsNumber})`

        const userLinkElement = document.createElement('a')
        userLinkElement.href = './user.html?user_id=' + postAuthorId
        userLinkElement.textContent = postAuthorName
  
        postElement.append(postlLinkElement, ' - ', userLinkElement)
        postsList.append(postElement)

    });

    return postsList
} 