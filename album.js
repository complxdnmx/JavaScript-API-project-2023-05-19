import { API_URL } from "./config.js"
import { firstLetterToUpperCase, fetchData, getUrlParams } from "./functions.js"
import createHeader from "./header.js"

async function init() {
    const contentElement = document.querySelector('#content')
    const headerElement = createHeader()
    contentElement.before(headerElement)

    const albumId = getUrlParams('album_id')
    
    const almbumData = await fetchData(`${API_URL}/albums/${albumId}?_expand=user&_embed=photos`)

    console.log(almbumData)
    const albumElement = createAlbumElement(almbumData)

    contentElement.append(albumElement)
}

init()

function createAlbumElement (album) {
    const albumWrapper = document.createElement('div')
    albumWrapper.classList.add('album-wrapper')

    const albumInfo = document.createElement('div')
    albumInfo.classList.add('album-info')

    const albumTitle = document.createElement('h1')
    albumTitle.textContent = firstLetterToUpperCase(album.title)

    const albumAuthor = document.createElement('span')
    albumAuthor.innerHTML = `Album created by: <a href="./user.html?user_id=${album.user.id}">${album.user.name}</a>`

    albumInfo.append(albumTitle, albumAuthor)

    const photosList = document.createElement('div')
    photosList.classList.add('photos-list')

    album.photos.forEach(photo => {

        const photoElement = document.createElement('img');
        photoElement.src = photo.thumbnailUrl
        photoElement.alt

        photosList.append(photoElement)
    });

    albumWrapper.append(albumInfo, photosList)
    // console.log(album)
    return albumWrapper
}