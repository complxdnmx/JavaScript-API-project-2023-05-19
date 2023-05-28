import { API_URL } from "./config.js"
import { firstLetterToUpperCase, fetchData, getUrlParams } from "./functions.js"
import createHeader from "./header.js"

async function init() {
    const contentElement = document.querySelector('#content')

    const searchPhrase = getUrlParams('search')
    console.log(searchPhrase)

    const searchData = await fetchData(`${API_URL}/posts?q=${searchPhrase}`)
    console.log(searchData)

    const searchResultWrapperElement = createSearchElement(searchData)
    contentElement.append(searchResultWrapperElement)

    const headerElement = createHeader()
    contentElement.before(headerElement)

}

init()

function createSearchElement(searchData) {
    const searchContent = document.createElement('div')
    searchContent.classList.add('search-content')

    if (searchData.length <= 0) {
        searchContent.innerHTML = `<h3>${searchData.length} search results found ;/</h3>`

        return searchContent
    }

    const searchContentTitle = document.createElement('h3')
    searchContentTitle.textContent = `${searchData.length} search results found:`
    console.log(searchData.length)

    const searchResultsWrapper= document.createElement('div')
    searchResultsWrapper.classList.add('search-results-wrapper')
    
    const searchResults = document.createElement('ul')
    searchResults.classList.add('search-results')

    searchResultsWrapper.append(searchResults)
    
    searchData.forEach(result => {
        
        const searchResult = document.createElement('li')
        searchResult.classList.add('search-result')

        const searchResultTitle = document.createElement('a')
        searchResultTitle.href = './post.html?post_id=' + result.id
        searchResultTitle.textContent = firstLetterToUpperCase(result.title)

        searchResult.append(searchResultTitle)
        searchResults.append(searchResult)
    });


    searchContent.append(searchContentTitle, searchResultsWrapper)

    return searchContent
}