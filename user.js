import { API_URL } from "./config.js"
import { fetchData, firstLetterToUpperCase } from "./functions.js"
import createHeader from "./header.js"


async function init() {
    console.log('<<<CIA>>>')
    console.dir(location.search)

    const queryParams = location.search
    const urlParams = new URLSearchParams(queryParams)

    const id = urlParams.get('user_id') //user_id is users.js priskirto id
    //jei parametru yra daugiau, galima ir kitus issitraukt su .get('whatever')

    // console.log(queryParams)
    // console.log(urlParams.get('user_id'))

    const userData = await fetchData (`${API_URL}/users/${id}?_embed=posts&_embed=albums`)
   
    const contentElement = document.querySelector('#content')
    const userInfo = createUserInfoElement(userData)

    const userPosts = createUserPosts(userData.posts, userData.name)
    const userAlbums = createUserAlbums(userData.albums, userData.name)

    // console.log(createUserInfoElement(userData))
    contentElement.append(userInfo, userPosts, userAlbums)
    contentElement.before(createHeader())
    // console.log(userData)
}
 
init()

function createUserInfoElement(user) {

    // console.log(user)
    // console.log(user.name)
    // console.log(user.username)
    // console.log(user.email)
    // console.log(user.phone)
    // console.log(user.website)
    // console.log(user.company.name)
    // console.log(user.address)
    // console.log(user.address.city)
    // console.log(user.address.street)
    // console.log(user.address.suite)
    // console.log(user.address.zipcode)
    // console.log(user.address.geo)
    // console.log(user.address.geo.lat)
    // console.log(user.address.geo.lng)
    
    const {name, username, email, phone, website } = user
    const {city, street, suite, zipcode} = user.address
    const {lat, lng} = user.address.geo
    const companyName = user.company.name
    
    const addressText = `${street} ${suite} ${city} (zipcode: ${zipcode})`
    const addressMapLink = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`

    const userInfoWrapper = document.createElement('div')
    userInfoWrapper.classList.add('user-info-wrapper')

    // kad nesiknist su create elemenetais, cia innerHTML:

    userInfoWrapper.innerHTML = 
    `<h1>${name} ${username}</h1>
    <ul>
        <li>Email: <a href="mailto:${email}">${email}</a></li>
        <li>Phone: <a href="tel:${phone}">${phone}</a></li>
        <li>Web: <a href="https://${website}" target="_blank">${website}</a></li>
        <li>Company: ${companyName}</li>
        <li>Address: <a href="${addressMapLink}" target="_blank">${addressText}</a></li>

    </ul>`

    return userInfoWrapper
}

function createUserPosts(posts, name) {
    const postsWrapper = document.createElement('div')
    postsWrapper.classList.add('posts-wrapper')

    const postsWrapperTitle = document.createElement('h2')
    postsWrapperTitle.textContent = 'No posts ;/'
    
    postsWrapper.append(postsWrapperTitle)

    if (posts.length > 0) { 

        postsWrapperTitle.textContent = `${name} posts:`
    
        const postsList = document.createElement('ul')

        posts.forEach(post => {
            console.log(post)
            console.log(post.title)

            const { title } = post
            const postItem = document.createElement('li')
            const postLink = document.createElement('a')
            postLink.href = './post.html'
            postLink.textContent = firstLetterToUpperCase(title) 

            postsList.append(postItem)
            postItem.append(postLink)

        });

        postsWrapper.append(postsList)

    }

    return postsWrapper

}

function createUserAlbums(albums, name) {
    const albumsWrapper = document.createElement('div')
    albumsWrapper.classList.add('albums-wrapper')

    const albumsWrapperTitle = document.createElement('h2')
    albumsWrapperTitle.textContent = 'No albums ;/'
    
    albumsWrapper.append(albumsWrapperTitle)

    if (albums.length > 0) {

        albumsWrapperTitle.textContent = `${name} albums:`
    
        const albumsList = document.createElement('ul')

        albums.forEach(album => {
            console.log(album)
            // console.log(post.title)

            const { title } = album
            const albumItem = document.createElement('li')
            const albumLink = document.createElement('a')
            albumLink.href = './album.html' 
            albumLink.textContent = firstLetterToUpperCase(title) 

            albumsList.append(albumItem)
            albumItem.append(albumLink)

        });

        albumsWrapper.append(albumsList)

    }

    return albumsWrapper
}
