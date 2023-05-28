import { API_URL, ALBUMS_PER_PAGE } from "./config.js"
import { firstLetterToUpperCase, fetchData } from "./functions.js"
import createHeader from "./header.js"



async function init() {
    const albumsData = await fetchData(`${API_URL}/albums?_limit=${ALBUMS_PER_PAGE}&_expand=user&_embed=photos`)

    const contentElement = document.querySelector('#content')
    const albumsListElement = createAlbumsList(albumsData)

    console.log(albumsListElement)

    contentElement.append(albumsListElement)
    contentElement.before(createHeader())

}

init()

function createAlbumsList(albums) {

    const albumsList = document.createElement('div')
    albumsList.classList.add('albums-list')

    console.log(albums)

    albums.forEach(album => {
        const title = album.title
        const author = album.user.name
        const photosCount = album.photos.length
        const randomIndex = Math.floor(Math.random() * photosCount)
        const randomImage = album.photos[randomIndex]
        const randomImageUrl = randomImage.url
        const randomImageTitle = randomImage.title

        const albumItem = document.createElement('div')
        albumItem.classList.add('album-item')

        const albumLink = document.createElement('a')
        albumLink.href = './album.html?album_id=' + album.id
        albumLink.classList.add('album-link')

        const albumTitle = document.createElement('h2')
        albumTitle.textContent = firstLetterToUpperCase(title)

        const albumAuthor = document.createElement('span')
        albumAuthor.textContent = `Author: ${author}`

        const albumImage = document.createElement('img')
        albumImage.src = randomImageUrl
        albumImage.alt = randomImageTitle

        albumItem.append(albumTitle, albumAuthor, albumImage)
        albumLink.append(albumItem)
        albumsList.append(albumLink)

        
    });

    return albumsList

}