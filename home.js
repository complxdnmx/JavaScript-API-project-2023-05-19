import { API_URL } from "./config.js"
import { firstLetterToUpperCase, fetchData, getUrlParams } from "./functions.js"
import createHeader from "./header.js"

async function init() {
    const contentElement = document.querySelector('#content')
    const headerElement = createHeader()
    contentElement.before(headerElement)

}

init()